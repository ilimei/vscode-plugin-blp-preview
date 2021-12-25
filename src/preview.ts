/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as nls from 'vscode-nls';
import * as fs from "fs";
import * as path from "path";
import * as http from "https";
import { Disposable } from './dispose';
import { SizeStatusBarEntry } from './sizeStatusBarEntry';
import { Scale, ZoomStatusBarEntry } from './zoomStatusBarEntry';
import { BinarySizeStatusBarEntry } from './binarySizeStatusBarEntry';
import ArchiveManager from "./mpqReader/manager";
import Message from './Message';


const localize = nls.loadMessageBundle();

export class PreviewManager implements vscode.CustomReadonlyEditorProvider {

	public static readonly viewType = 'blpPreview.previewEditor';

	private readonly _previews = new Set<Preview>();
	private _activePreview: Preview | undefined;
	private mpqManager: ArchiveManager;

	constructor(
		private readonly extensionRoot: vscode.Uri,
		private readonly sizeStatusBarEntry: SizeStatusBarEntry,
		private readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
		private readonly zoomStatusBarEntry: ZoomStatusBarEntry,
	) {
		const data = vscode.workspace.getConfiguration("blpPreview");
		if (data && data.mpqLocation) {
			if (fs.existsSync(data.mpqLocation)) {
				this.mpqManager = new ArchiveManager();
				this.mpqManager.load(data.mpqLocation).catch(e => {
					this.mpqManager = null;
					console.error(e);
					vscode.window.showErrorMessage("mpq location is not a mpq file!");
				});
			}
		}
	}

	public async openCustomDocument(uri: vscode.Uri) {
		return { uri, dispose: () => { } };
	}

	public async resolveCustomEditor(
		document: vscode.CustomDocument,
		webviewEditor: vscode.WebviewPanel,
	): Promise<void> {
		const preview = new Preview(this.extensionRoot, document.uri, this.mpqManager, webviewEditor, this.sizeStatusBarEntry, this.binarySizeStatusBarEntry, this.zoomStatusBarEntry);
		this._previews.add(preview);
		this.setActivePreview(preview);

		webviewEditor.onDidDispose(() => { this._previews.delete(preview); });

		webviewEditor.onDidChangeViewState(() => {
			if (webviewEditor.active) {
				this.setActivePreview(preview);
			} else if (this._activePreview === preview && !webviewEditor.active) {
				this.setActivePreview(undefined);
			}
		});
	}

	public get activePreview() { return this._activePreview; }

	private setActivePreview(value: Preview | undefined): void {
		this._activePreview = value;
		this.setPreviewActiveContext(!!value);
	}

	private setPreviewActiveContext(value: boolean) {
		vscode.commands.executeCommand('setContext', 'blpPreviewFocus', value);
	}
}

enum PreviewState {
	Disposed,
	Visible,
	Active,
}

class Preview extends Disposable {

	private readonly id: string = `${Date.now()}-${Math.random().toString()}`;

	private _previewState = PreviewState.Visible;
	private _imageSize: string | undefined;
	private _imageBinarySize: number | undefined;
	private _imageZoom: Scale | undefined;
	private _message: Message;

	private readonly emptyPngDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==';

	constructor(
		private readonly extensionRoot: vscode.Uri,
		private readonly resource: vscode.Uri,
		private readonly mpqManager: ArchiveManager,
		private readonly webviewEditor: vscode.WebviewPanel,
		private readonly sizeStatusBarEntry: SizeStatusBarEntry,
		private readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
		private readonly zoomStatusBarEntry: ZoomStatusBarEntry,
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
			switch (message.type) {
				case 'size':
					{
						this._imageSize = message.value;
						this.update();
						break;
					}
				case 'zoom':
					{
						this._imageZoom = message.value;
						this.update();
						break;
					}

				case 'reopen-as-text':
					{
						vscode.commands.executeCommand('vscode.openWith', resource, 'default', webviewEditor.viewColumn);
						break;
					}
			}
		}));

		this._register(zoomStatusBarEntry.onDidChangeScale(e => {
			if (this._previewState === PreviewState.Active) {
				this.webviewEditor.webview.postMessage({ type: 'setScale', scale: e.scale });
			}
		}));

		this._register(webviewEditor.onDidChangeViewState(() => {
			this.update();
			this.webviewEditor.webview.postMessage({ type: 'setActive', value: this.webviewEditor.active });
		}));

		this._register(webviewEditor.onDidDispose(() => {
			if (this._previewState === PreviewState.Active) {
				this.sizeStatusBarEntry.hide(this.id);
				this.binarySizeStatusBarEntry.hide(this.id);
				this.zoomStatusBarEntry.hide(this.id);
			}
			this._previewState = PreviewState.Disposed;
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

		vscode.workspace.fs.stat(resource).then(({ size }) => {
			this._imageBinarySize = size;
			this.update();
		});

		this.render();
		this.update();
		this.webviewEditor.webview.postMessage({ type: 'setActive', value: this.webviewEditor.active });
	}

	/**
	 * 递归向上查找文件
	 * @param startPath 
	 * @param fileName 
	 * @returns 
	 */
	private findFile(startPath: string, fileName: string) {
		const files = fs.readdirSync(startPath);
		if (fileName.indexOf("\\") > 0) {
			const findFolder = fileName.split(/\\/)[0];
			if (findFolder) {
				const file = files.find(v => v.toLowerCase().endsWith(findFolder.toLowerCase()));
				if (file && fs.existsSync(path.resolve(startPath, fileName))) {
					return path.resolve(startPath, fileName);
				}
			}
		} else {
			const file = files.find(v => v.toLowerCase().endsWith(fileName.toLowerCase()));
			if (file) {
				return path.resolve(startPath, file);
			}
		}
		const next = path.dirname(startPath);
		if (next === startPath) {
			return null;
		}
		return this.findFile(path.dirname(startPath), fileName);
	}

	public zoomIn() {
		if (this._previewState === PreviewState.Active) {
			this.webviewEditor.webview.postMessage({ type: 'zoomIn' });
		}
	}

	public zoomOut() {
		if (this._previewState === PreviewState.Active) {
			this.webviewEditor.webview.postMessage({ type: 'zoomOut' });
		}
	}

	private async render() {
		if (this._previewState !== PreviewState.Disposed) {
			this.webviewEditor.webview.html = await this.getWebviewContents();
		}
	}

	private update() {
		if (this._previewState === PreviewState.Disposed) {
			return;
		}

		if (this.webviewEditor.active) {
			this._previewState = PreviewState.Active;
			this.sizeStatusBarEntry.show(this.id, this._imageSize || '');
			this.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
			this.zoomStatusBarEntry.show(this.id, this._imageZoom || 'fit');
		} else {
			if (this._previewState === PreviewState.Active) {
				this.sizeStatusBarEntry.hide(this.id);
				this.binarySizeStatusBarEntry.hide(this.id);
				this.zoomStatusBarEntry.hide(this.id);
			}
			this._previewState = PreviewState.Visible;
		}
	}

	private async getWebviewContents(): Promise<string> {
		const version = Date.now().toString();
		const settings = {
			isMac: isMac(),
		};

		const nonce = getNonce();
		const cspSource = this.webviewEditor.webview.cspSource;
		const isMdx = this.resource.path.toLowerCase().endsWith('mdx');
		const isW3e = this.resource.path.toLowerCase().endsWith('w3e');

		if (isMdx || isW3e) {
			return /* html */`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
			
				<!-- Disable pinch zooming -->
				<meta name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
			
				<title>Image Preview</title>
			
				<link rel="stylesheet" href="${escapeAttribute(this.extensionResource('/media/preview.css'))}" type="text/css" media="screen" nonce="${nonce}">
			
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: ${cspSource}; script-src 'nonce-${nonce}'; style-src ${cspSource} 'nonce-${nonce}';">
				<meta id="image-preview-settings" data-settings="${escapeAttribute(JSON.stringify(settings))}">
			</head>
			<body class="container image scale-to-fit loading">
				<div class="container" dropzone="copy">
					<div class="inner">
						<canvas id="canvas" width="300" height="300"></canvas>
					</div>
					<div class="controls">
						<label>动作列表 <select id="select"><option>None</option></select></label>
						<label>队伍颜色 <select id="teamcolor"><option>None</option></select></label>
						<label>速度 <input type="range" id="volume" name="volume" value="10" min="0" max="80"></label>
					</div>
				</div>
				<script type="text/javascript" nonce="${nonce}">
					window.module = {
						exports: {},
					};
					window.vscode = acquireVsCodeApi();
				</script>
				<script src="${escapeAttribute(this.extensionResource('/media/message.js'))}" nonce="${nonce}"></script>
				<script src="${escapeAttribute(this.extensionResource('/media/viewer.min.js'))}" nonce="${nonce}"></script>
				<script src="${escapeAttribute(this.extensionResource(isMdx ? '/media/modelPreview.js' : '/media/mapPreview.js'))}" nonce="${nonce}"></script>
			</body>
			</html>`;
		}


		return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">

	<!-- Disable pinch zooming -->
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">

	<title>Image Preview</title>

	<link rel="stylesheet" href="${escapeAttribute(this.extensionResource('/media/main.css'))}" type="text/css" media="screen" nonce="${nonce}">

	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: ${cspSource}; script-src 'nonce-${nonce}'; style-src ${cspSource} 'nonce-${nonce}';">
	<meta id="image-preview-settings" data-settings="${escapeAttribute(JSON.stringify(settings))}">
</head>
<body class="container image scale-to-fit loading">
	<div class="loading-indicator"></div>
	<div class="image-load-error">
		<p>${localize('preview.imageLoadError', "An error occurred while loading the image.")}</p>
		<a href="#" class="open-file-link">${localize('preview.imageLoadErrorLink', "Open file using VS Code's standard text/binary editor?")}</a>
	</div>
	<script type="text/javascript" nonce="${nonce}">
		window.module = {
			exports: {},
		};
		window.vscode = acquireVsCodeApi();
	</script>
	<script src="${escapeAttribute(this.extensionResource('/media/message.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/jpgDecoder.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/binReader.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/tga.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/main.js'))}" nonce="${nonce}"></script>
</body>
</html>`;
	}

	private async getResourcePath(webviewEditor: vscode.WebviewPanel, resource: vscode.Uri, version: string): Promise<string> {
		if (resource.scheme === 'git') {
			const stat = await vscode.workspace.fs.stat(resource);
			if (stat.size === 0) {
				return this.emptyPngDataUri;
			}
		}

		// Avoid adding cache busting if there is already a query string
		if (resource.query) {
			return webviewEditor.webview.asWebviewUri(resource).toString();
		}


		return webviewEditor.webview.asWebviewUri(resource).with({ query: `version=${version}` }).toString();
	}

	private extensionResource(path: string) {
		return this.webviewEditor.webview.asWebviewUri(this.extensionRoot.with({
			path: this.extensionRoot.path + path
		}));
	}
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
