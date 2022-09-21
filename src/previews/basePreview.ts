import * as vscode from 'vscode';
import * as nls from 'vscode-nls';
import { Disposable } from '../dispose';
import Message from './message';
import ArchiveManager from "../mpqReader/manager";

export enum PreviewState {
    disposed,
    visible,
    active,
}

export function isMac(): boolean {
	if (typeof process === 'undefined') {
		return false;
	}
	return process.platform === 'darwin';
}

export function escapeAttribute(value: string | vscode.Uri): string {
	return value.toString().replace(/"/g, '&quot;');
}

export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 64; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const localize = nls.loadMessageBundle();

export default abstract class BasePreview extends Disposable {

    protected readonly id: string = `${Date.now()}-${Math.random().toString()}`;
    protected readonly localize = localize;

    protected _previewState = PreviewState.visible;
    protected _message: Message;

    constructor(
        protected readonly extensionRoot: vscode.Uri,
        protected readonly resource: vscode.Uri,
        protected readonly mpqManager: ArchiveManager,
        protected readonly webviewEditor: vscode.WebviewPanel,
    ) {
        super();
        const resourceRoot = resource.with({
            path: resource.path.replace(/\/[^\/]+?\.\w+$/, '/'),
        });
        this._message = new Message(this.webviewEditor.webview, mpqManager, resource, resourceRoot);

        webviewEditor.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                resourceRoot,
                extensionRoot,
            ]
        };

        this._register(webviewEditor.webview.onDidReceiveMessage(message => {
            this._message.onMessgae(message);
            this.onMessage(message);
            switch (message.type) {
                case 'reopen-as-text':
                    {
                        vscode.commands.executeCommand('vscode.openWith', resource, 'default', webviewEditor.viewColumn);
                        break;
                    }
            }
        }));

        this._register(webviewEditor.onDidChangeViewState(() => {
            this.update();
            this.webviewEditor.webview.postMessage({ type: 'setActive', value: this.webviewEditor.active });
        }));

        this._register(webviewEditor.onDidDispose(() => {
            if (this._previewState === PreviewState.active) {
                this.onDispose();
            }
            this._previewState = PreviewState.disposed;
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

        this.render();
        this.webviewEditor.webview.postMessage({ type: 'setActive', value: this.webviewEditor.active });
    }

    public zoomIn() {
        if (this._previewState === PreviewState.active) {
            this.webviewEditor.webview.postMessage({ type: 'zoomIn' });
        }
    }

    public zoomOut() {
        if (this._previewState === PreviewState.active) {
            this.webviewEditor.webview.postMessage({ type: 'zoomOut' });
        }
    }

    private async render() {
        if (this._previewState !== PreviewState.disposed) {
            this.webviewEditor.webview.html = await this.getWebviewContents();
        }
    }

    protected update() {
        if (this._previewState === PreviewState.disposed) {
            return;
        }

        if (this.webviewEditor.active) {
            this._previewState = PreviewState.active;
            this.onActive();
        } else {
            if (this._previewState === PreviewState.active) {
                this.onUnActive();
            }
            this._previewState = PreviewState.visible;
        }
    }

    protected extensionResource(path: string) {
        return this.webviewEditor.webview.asWebviewUri(this.extensionRoot.with({
            path: this.extensionRoot.path + path
        }));
    }

    abstract init(): void;
    abstract onMessage(message: { type: string, value: any }): void;
    abstract onActive(): void;
    abstract onUnActive(): void;
    abstract onDispose(): void;
    abstract getWebviewContents(): Promise<string>;
}
