/**
 * vscode 服务端的message处理
 */
import * as vscode from 'vscode';
import * as http from "https";
import ArchiveManager from '../mpq-manager/manager';
import { BlpPreviewContext } from '../extension';
import MpqArchive from '../mpq-manager/archive';

function request(url: string): Promise<{ buf: Buffer, ext: string }> {
    return new Promise((resolve) => {
        http.request(url, async res => {
            const chunks = [];
            if (res.statusCode === 303) {
                resolve(await request(res.headers['location']));
            }
            if (res.statusCode !== 200) {
                resolve(null);
                return;
            }
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            //the whole response has been received, so we just print it out here
            res.on('end', function () {
                resolve({
                    buf: Buffer.concat(chunks),
                    ext: url.split(/\./).pop(),
                });
            });
        }).end();
    });
}

export default class Message {

    maxDeep = 0;
    size = 0;
    rootFolder: vscode.Uri;
    private _onSizeChange: vscode.EventEmitter<number> = new vscode.EventEmitter<number>();
    readonly onSizeChange: vscode.Event<number> = this._onSizeChange.event;

    constructor(private webview: vscode.Webview,
        private mpqManager: ArchiveManager,
        private resource: vscode.Uri,
        private resourceRoot: vscode.Uri,
        private ctx: BlpPreviewContext) {
        const rootFolder = vscode.workspace.workspaceFolders?.find(v => {
            return this.resourceRoot.path.startsWith(v.uri.path);
        });
        this.rootFolder = rootFolder?.uri;
        this.maxDeep = this.resourceRoot.path.split('/').length - 1;
    }

    async load() {
        if (this.resource.scheme === 'w3x') {
            const [fsPath, resourcePath] = this.resource.fsPath.split(/\.w3x/);
            const mpq = MpqArchive.getByPath(fsPath + '.w3x');
            await mpq.promise;
            const data = await mpq.get(resourcePath.slice(1));
            if (data) {
                const extName = this.resource.path.split(/\./g).pop();
                this.size = data.length;
                this._onSizeChange.fire(this.size);
                return { ext: extName, buf: new Uint8Array(data).buffer };
            }
            throw new Error('no data found');
        } else if (this.resource.scheme === 'mpq') {
            const [first, ...rest] = this.resource.path.split(/\\/);
            const data = await this.mpqManager.get(rest.join('\\'));
            const extName = this.resource.path.split(/\./g).pop();
            this.size = data.length;
            this._onSizeChange.fire(this.size);
            return { ext: extName, buf: new Uint8Array(data).buffer };
        } else {
            const buf = await vscode.workspace.fs.readFile(this.resource);
            const imgPath = this.resource.fsPath;
            const extName = imgPath.split(/\./g).pop();
            this.size = buf.length;
            this._onSizeChange.fire(this.size);
            return { ext: extName, buf: new Uint8Array(buf).buffer };
        }
    }

    async _loadSource(path: string, deep: number = -1) {
        if (this.resource.scheme === 'w3x') {
            const [fsPath] = this.resource.fsPath.split(/\.w3x/);
            const mpq = MpqArchive.getByPath(fsPath + '.w3x');
            const data = await mpq.get(path);
            if (!data) {
                if (this.mpqManager) {
                    const buf = await this.mpqManager.get(path.replace(/\//g, '\\'));
                    if (buf) {
                        return new Uint8Array(buf).buffer;
                    }
                }
            }
            return new Uint8Array(data).buffer;
        }
        const blpURI = vscode.Uri.joinPath(this.resourceRoot, path);
        return vscode.workspace.fs.stat(blpURI).then(async () => {
            const buf = await vscode.workspace.fs.readFile(blpURI);
            return new Uint8Array(buf).buffer;
        }, async () => {
            if (deep === -1) {
                if (this.mpqManager) {
                    const buf = await this.mpqManager.get(path.replace(/\//g, '\\'));
                    if (buf) {
                        return new Uint8Array(buf).buffer;
                    }
                }
            }
            if (deep === -1 || deep > 0) {
                return await this._loadSource('../' + path, deep === -1 ? this.maxDeep : deep - 1);
            } else if (deep === 0) {
                console.info("request", `https://www.hiveworkshop.com/casc-contents?path=${encodeURIComponent(path)}`);
                const { buf } = await request(`https://www.hiveworkshop.com/casc-contents?path=${encodeURIComponent(path)}`);
                if (buf) {
                    return new Uint8Array(buf).buffer;
                }
            }
        });
    }

    async _loadSourceArray(path: string, deep: number = -1) {
        const blpURI = vscode.Uri.joinPath(this.resourceRoot, path);
        return vscode.workspace.fs.stat(blpURI).then(async () => {
            const buf = await vscode.workspace.fs.readFile(blpURI);
            return [new Uint8Array(buf).buffer];
        }, async () => {
            if (deep === -1) {
                if (this.mpqManager) {
                    const buf = await this.mpqManager.getAll(path.replace(/\//g, '\\'));
                    if (buf.length > 0) {
                        return buf.map(v => new Uint8Array(v).buffer);
                    }
                }
            }
            if (deep === -1 || deep > 0) {
                return await this._loadSourceArray('../' + path, deep === -1 ? this.maxDeep : deep - 1);
            } else if (deep === 0) {
                console.info("request", `https://www.hiveworkshop.com/casc-contents?path=${encodeURIComponent(path)}`);
                const { buf } = await request(`https://www.hiveworkshop.com/casc-contents?path=${encodeURIComponent(path)}`);
                if (buf) {
                    return [new Uint8Array(buf).buffer];
                }
            }
        });
    }

    /**
     * w3x2lni工作模式
     */
    async loadResource(path: string) {
        if (this.rootFolder) {
            const blpURI = vscode.Uri.joinPath(this.rootFolder, 'resource', path);
            return vscode.workspace.fs.stat(blpURI).then(async () => {
                const buf = await vscode.workspace.fs.readFile(blpURI);
                return new Uint8Array(buf).buffer;
            }, () => {
                /**
                 * 尝试找imported下面的文件
                 */
                const blpURI = vscode.Uri.joinPath(this.rootFolder, 'resource/war3mapImported', path);
                return vscode.workspace.fs.stat(blpURI).then(async () => {
                    const buf = await vscode.workspace.fs.readFile(blpURI);
                    return new Uint8Array(buf).buffer;
                }, () => null);
            });
        }
        return null;
    }

    async loadBlp(path: string) {
        return await this._loadSource(path);
    }

    async loadText(path: string) {
        const buf: ArrayBufferLike = await this._loadSource(path);
        return Buffer.from(buf).toString('utf-8');
    }

    async loadTextArray(path: string) {
        const buf: ArrayBufferLike[] = await this._loadSourceArray(path);
        return buf.map(v => Buffer.from(v).toString('utf-8'));
    }

    async onMessage(message: { type: string, requestId: number, data: any }) {
        if (!this[message.type] || typeof this[message.type] !== 'function') {
            throw new Error(`message.type ${message.type} method not found`);
        }
        if (this[message.type]) {
            const ret = await this[message.type](message.data);
            this.webview.postMessage({ requestId: message.requestId, data: ret });
        }
    }
}
