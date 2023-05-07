import {
    window, Uri, TreeItem, TreeItemCollapsibleState, Command,
} from 'vscode';
import MpqArchive from '../../mpq-manager/archive';
import MpqTreeHelperNode from '../mpq/mpq-tree-helper-node';
import txt from 'raw-loader!./file-list.txt';
import { IniFile } from '../../parser/ini';
import SlkFile from '../../parser/slk';

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
            this._mpq = new MpqArchive(this._uri.fsPath);
            this._promise = this._mpq.load(this._uri.fsPath, true);
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
            if ((name.toLowerCase().startsWith('units\\') || name.toLowerCase().startsWith('doodads\\')) && (name.endsWith('.txt') || name.endsWith('.slk'))) {
                promises.push(mpq.get(name).then((data) => {
                    const content = Buffer.from(data).toString();
                    if (name.endsWith('.txt')) {
                        const ini = new IniFile();
                        ini.load(content);
                        ini.sections.forEach((section) => {
                            for (const [key, value] of section) {
                                if (value.endsWith('.blp')) {
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

    contextValue = 'w3x';
}