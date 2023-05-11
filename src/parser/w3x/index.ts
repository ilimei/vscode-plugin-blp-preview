import fs from 'fs';
import path from 'path';
import MpqArchive from '../../mpq-manager/archive';
import txt from 'raw-loader!./file-list.txt';
import War3MapW3i from '../w3i';
import War3MapW3u from '../w3u';
import War3MapW3d from '../w3d';
import { IniFile } from '../ini';
import SlkFile from '../slk';
import Task from '../../common/task';
import { makeFileSync } from '../../common/fs-helper';

/**
 * Warcraft 3 map (W3X and W3M).
 */
export default class War3Map {
    u1 = 0;
    name = '';
    flags = 0;
    maxPlayers = 0;

    private _mpq: MpqArchive;
    private _readTask: Task<string[]>;

    static cache: Map<string, War3Map> = new Map();

    static getByPath(mpqFilePath: string): War3Map {
        if (this.cache[mpqFilePath]) {
            return this.cache[mpqFilePath];
        }
        const archive = new War3Map(mpqFilePath);
        this.cache[mpqFilePath] = archive;
        return archive;
    }

    constructor(fsPath: string) {
        this._mpq = MpqArchive.getByPath(fsPath);
    }

    private async _getList() {
        await this._mpq.promise;
        let ret: string[] = [];
        let files = new Set(txt.split(/\r\n/));
        const mpq = this._mpq;
        if (mpq.has('(listfile)')) {
            const data = await mpq.get('(listfile)');
            files = new Set([...Buffer.from(data).toString().split(/\r\n/), ...files]);
        }
        const promises: Promise<any>[] = [];

        const addFile = (file: string) => {
            if (files.has(file)) {
                return;
            }
            files.add(file);
            ret.push(file);
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
            ret.push(name);
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
        return ret;
    }

    async getList() {
        if (!this._readTask) {
            this._readTask = Task.createTask(() => this._getList());
        }
        return await this._readTask;
    }

    has(name: string) {
        return this._mpq.has(name);
    }

    async get(name: string) {
        await this._mpq.promise;
        return this._mpq.get(name);
    }

    async extractTo(fsPath: string) {
        const list = await this.getList();
        for (let file of list) {
            const buf = await this._mpq.get(file);
            if (buf) {
                const dist = path.join(fsPath, file);
                makeFileSync(dist);
                fs.writeFileSync(dist, buf);
            }
        }
    }
}
