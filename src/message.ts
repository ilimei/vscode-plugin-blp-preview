/**
 * vscode 服务端的message处理
 */
import * as vscode from 'vscode';
import * as http from "https";
import ArchiveManager from './mpqReader/manager';

function request(url: string): Promise<{ buf: Buffer, ext: string }> {
    return new Promise((resolve) => {
        http.request(url, async res => {
            const chunks = [];
            console.info(res.statusCode);
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

    constructor(private webview: vscode.Webview,
        private mpqManager: ArchiveManager,
        private resource: vscode.Uri,
        private resourceRoot: vscode.Uri) {
        this.maxDeep = this.resourceRoot.path.split('/').length - 2;
    }

    async load() {
        const buf = await vscode.workspace.fs.readFile(this.resource);
        const imgPath = this.resource.fsPath;
        const extName = imgPath.split(/\./g).pop();
        return { ext: extName, buf: new Uint8Array(buf).buffer };
    }

    async loadBlp(path: string, deep: number = -1) {
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
                return await this.loadBlp('../' + path, deep === -1 ? this.maxDeep : deep - 1);
            } else if (deep === 0) {
                console.info("request", `https://www.hiveworkshop.com/casc-contents?path=${encodeURIComponent(path)}`);
                const { buf } = await request(`https://www.hiveworkshop.com/casc-contents?path=${encodeURIComponent(path)}`);
                if (buf) {
                    return new Uint8Array(buf);
                }
            }
        });
    }

    async onMessgae(message: { type: string, requestId: number, data: any }) {
        console.info('onMessage', message, this[message.type]);
        if (this[message.type]) {
            const ret = await this[message.type](message.data);
            console.info('ret', ret, this.webview);
            this.webview.postMessage({ requestId: message.requestId, data: ret });
        }
    }
}
