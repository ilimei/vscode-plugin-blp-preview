import * as vscode from 'vscode';
import { Disposable } from "../common/dispose";
import Message from '../common/message';
import MpqManager from '../mpq-manager';
import { BlpPreviewContext } from '../extension';

export enum ViewState {
    disposed,
    visible,
    active,
}

function isMac(): boolean {
    if (typeof process === 'undefined') {
        return false;
    }
    return process.platform === 'darwin';
}

function escapeAttribute(value: string | vscode.Uri): string {
    return value.toString().replace(/"/g, '&quot;');
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 64; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


export default class BasePreview extends Disposable {
    protected readonly id: string = `${Date.now()}-${Math.random().toString()}`;

    protected _previewState = ViewState.visible;
    protected _imageBinarySize: number | undefined;
    protected message: Message;


    constructor(
        protected readonly extensionRoot: vscode.Uri,
        protected readonly resource: vscode.Uri,
        protected readonly webviewEditor: vscode.WebviewPanel,
        protected readonly ctx: BlpPreviewContext,
    ) {
        super();
        const resourceRoot = resource.with({
            path: resource.path.replace(/\/[^\/]+?\.\w+$/, '/'),
        });
        webviewEditor.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                resourceRoot,
                extensionRoot,
            ]
        };

        this.message = new Message(webviewEditor.webview, MpqManager.instance, resource, resourceRoot);

        this._register(webviewEditor.webview.onDidReceiveMessage(message => {
            this.onMessage(message);
        }));

        this._register(webviewEditor.onDidChangeViewState(() => {
            this.update();
            this.webviewEditor.webview.postMessage({ type: 'setActive', value: this.webviewEditor.active });
        }));

        this._register(webviewEditor.onDidDispose(() => {
            if (this._previewState === ViewState.active) {
                this.onDispose();
            }
            this._previewState = ViewState.disposed;
        }));

        const watcher = this._register(vscode.workspace.createFileSystemWatcher(resource.fsPath));
        this._register(watcher.onDidChange(e => {
            if (e.toString() === this.resource.toString()) {
                this.render();
            }
        }));
        this._register(watcher.onDidDelete(e => {
            if (e.toString() === this.resource.toString()) {
                this.webviewEditor.dispose();
            }
        }));

        if (resource.scheme === 'file') {
            vscode.workspace.fs.stat(resource).then(({ size }) => {
                this._imageBinarySize = size;
                this.update();
            });
        }

        this.render();
        this.update();
        this.webviewEditor.webview.postMessage({ type: 'setActive', value: this.webviewEditor.active });
    }

    getCssSource(): string[] {
        return [];
    }

    getJSSource(): string[] {
        return [];
    }

    getHTMLTempalte(): string {
        return '';
    }

    onMessage(message: any) {
        this.message?.onMessage(message);
    }

    onActive() {

    }

    onVisible() {

    }

    onDispose() {

    }

    update() {
        if (this._previewState === ViewState.disposed) {
            return;
        }

        if (this.webviewEditor.active) {
            this._previewState = ViewState.active;
            this.onActive();
        } else {
            if (this._previewState === ViewState.active) {
                this.onVisible();
            }
            this._previewState = ViewState.visible;
        }
    }

    private async getWebviewContents() {
        const settings = {
            isMac: isMac(),
        };

        const nonce = getNonce();
        const cspSource = this.webviewEditor.webview.cspSource;

        return /* html */`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">

        <!-- Disable pinch zooming -->
        <meta name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">

        <title>Image Preview</title>
        ${this.getCssSource().map(source => {
            return `<link rel="stylesheet" href="${escapeAttribute(this.extensionResource(source))}" type="text/css" media="screen" nonce="${nonce}">`
        }).join('\n')
            }
        <meta http-equiv="Content-Security-Policy" content="default-src 'none';media-src * blob:; img-src data: ${cspSource}; script-src 'nonce-${nonce}'; style-src ${cspSource} 'nonce-${nonce}';">
        <meta id="image-preview-settings" data-settings="${escapeAttribute(JSON.stringify(settings))}">
    </head>
    <body class="container image scale-to-fit loading">
        ${this.getHTMLTempalte()}
        <script type="text/javascript" nonce="${nonce}">
            window.module = {
                exports: {},
            };
            window.vscode = acquireVsCodeApi();
        </script>
        ${this.getJSSource().map(source => {
                return `<script src="${escapeAttribute(this.extensionResource(source))}" nonce="${nonce}"></script>`;
            }).join('\n')}
    </body>
    </html>`;
    }

    private extensionResource(path: string) {
        return this.webviewEditor.webview.asWebviewUri(this.extensionRoot.with({
            path: this.extensionRoot.path + path
        }));
    }

    private async render() {
        if (this._previewState !== ViewState.disposed) {
            this.webviewEditor.webview.html = await this.getWebviewContents();
        }
    }
}