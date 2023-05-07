import {
    window, Uri, TreeItem, TreeItemCollapsibleState, Command,
} from 'vscode';
import { parseMDX, generateMDX } from 'war3-model';
import MpqArchive from '../../mpq-manager/archive';
import MpqTreeHelperNode from '../mpq/mpq-tree-helper-node';
import txt from 'raw-loader!./file-list.txt';
import { IniFile } from '../../parser/ini';
import SlkFile from '../../parser/slk';
import War3MapW3d from '../../parser/w3d';
import War3MapW3u from '../../parser/w3u';
import War3MapW3i from '../../parser/w3i';

export class W3XRoot extends TreeItem {
    private _mpq: MpqArchive;
    private _promise: Thenable<any>;

    constructor(
        public _uri: Uri,
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly command?: Command) {
        super(label, collapsibleState);
        try {
            this._mpq = MpqArchive.getByPath(this._uri.fsPath);
            this._promise = this._mpq.promise;
        } catch (e) {
            window.showErrorMessage(e.toString());
        }
    }

    async buildTree() {
        let files = new Set(txt.split(/\r\n/));
        const mpq = this._mpq;
        if (mpq.has('(listfile)')) {
            const data = await mpq.get('(listfile)');
            files = new Set([...Buffer.from(data).toString().split(/\r\n/), ...files]);
        }
        const root = new MpqTreeHelperNode(this.label, this._uri);
        const promises: Promise<any>[] = [];

        const addFile = (file: string) => {
            if (files.has(file)) return;
            files.add(file);
            root.addFile(file);
        };
        const addMdl = (file: string) => {
            if (file.endsWith('.mdl')) {
                if (mpq.has(file)) {
                    addFile(file);
                    return;
                }
                const mdx = file.replace(/l$/, 'x');
                if (mpq.has(mdx)) {
                    addFile(mdx);
                    return;
                }
            } else if (file.endsWith('.mdx')) {
                if (mpq.has(file)) {
                    addFile(file);
                    return;
                }
            } else {
                const mdx = file + '.mdx';
                if (mpq.has(mdx)) {
                    addFile(mdx);
                    return;
                }
            }
        };
        for (const name of files) {
            if (!this._mpq.has(name)) {
                continue;
            }
            root.addFile(name);
            if ('war3map.w3i' === name) {
                promises.push(mpq.get(name).then((data) => {
                    const w3i = new War3MapW3i();
                    w3i.load(data);
                    if (w3i.loadingScreenModel) {
                        addMdl(w3i.loadingScreenModel);
                    }
                }));
            } else if (['war3map.w3d', 'war3map.w3b', 'war3map.w3u'].includes(name)) {
                promises.push(mpq.get(name).then((data) => {
                    const w3d = ['war3map.w3b', 'war3map.w3u'].includes(name) ? new War3MapW3u() : new War3MapW3d();
                    w3d.load(data);
                    w3d.originalTable.objects.forEach(obj => {
                        obj.modifications.forEach(mod => {
                            if (typeof mod.value === 'string' && (mod.value.endsWith('.mdl') || mod.value.endsWith('.mdx'))) {
                                addMdl(mod.value);
                            }
                        });
                    });
                    w3d.customTable.objects.forEach(obj => {
                        obj.modifications.forEach(mod => {
                            if (typeof mod.value === 'string' && (mod.value.endsWith('.mdl') || mod.value.endsWith('.mdx'))) {
                                addMdl(mod.value);
                            }
                        });
                    });
                }));
            } else if (name.endsWith('.txt') || name.endsWith('.slk')) {
                promises.push(mpq.get(name).then((data) => {
                    const content = Buffer.from(data).toString();
                    if (name.endsWith('.txt')) {
                        const ini = new IniFile();
                        ini.load(content);
                        ini.sections.forEach((section) => {
                            for (const [key, value] of section) {
                                if (value.endsWith('.blp') || value.endsWith('.tga')) {
                                    if (!mpq.has(value)) {
                                        continue;
                                    }
                                    addFile(value);
                                } else if (value.endsWith('.mdl')) {
                                    addMdl(value);
                                }
                            }
                        });
                    } else if (name.endsWith('.slk')) {
                        const slk = new SlkFile();
                        slk.load(content);
                        const index = slk.rows[0].indexOf('file');
                        if (index === -1) {
                            return;
                        }
                        for (let i = 1; i < slk.rows.length; i++) {
                            const row = slk.rows[i];
                            const value = row[index];
                            if (!value) continue;
                            addMdl(value);
                        }
                    }
                }));
            }
        }
        await Promise.all(promises);
        return root;
    }

    public get sourceUri(): Uri {
        return this._uri;
    }

    async getTextContent(uri: string) {
        const name = uri.slice(this._uri.path.length);
        await this._promise;
        const data = await this._mpq.get(name);
        return Buffer.from(data).toString();
    }

    async getBufferContent(uri: string) {
        const name = uri.slice(this._uri.path.length);
        await this._promise;
        return await this._mpq.get(name);
    }

    async extractMdxWithTextures(uri: string) {
        const name = uri.slice(this._uri.path.length);
        await this._promise;
        const data = await this._mpq.get(name);
        const model = parseMDX(data.buffer);
        const names: string[] = [];
        const pms = model.Textures.filter(tex => {
            return this._mpq.has(tex.Image);
        }).map(tex => {
            const orign = tex.Image;
            tex.Image = 'textures\\' + orign.split(/\\/g).pop();
            names.push(tex.Image);
            return this._mpq.get(orign);
        });

        const blps = await Promise.all(pms);
        return { model: generateMDX(model), blps, names };
    }

    contextValue = 'w3x';
}