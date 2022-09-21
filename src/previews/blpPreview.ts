import * as vscode from 'vscode';
import ArchiveManager from '../mpqReader/manager';
import BasePreview, { escapeAttribute, getNonce, isMac, PreviewState } from "./basePreview";
import { SizeStatusBarEntry } from '../statusBar/sizeStatusBarEntry';
import { Scale, ZoomStatusBarEntry } from '../statusBar/zoomStatusBarEntry';
import { BinarySizeStatusBarEntry } from '../statusBar/binarySizeStatusBarEntry';

export default class BlpPreview extends BasePreview {

    private _imageSize: string | undefined;
    private _imageBinarySize: number | undefined;
    private _imageZoom: Scale | undefined;

    constructor(
        readonly extensionRoot: vscode.Uri,
        readonly resource: vscode.Uri,
        readonly mpqManager: ArchiveManager,
        readonly webviewEditor: vscode.WebviewPanel,
        private readonly sizeStatusBarEntry: SizeStatusBarEntry,
        private readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
        private readonly zoomStatusBarEntry: ZoomStatusBarEntry,
    ) {
        super(extensionRoot, resource, mpqManager, webviewEditor);
        this.init();
    }

    init() {
        this._register(this.zoomStatusBarEntry.onDidChangeScale(e => {
            if (this._previewState === PreviewState.active) {
                this.webviewEditor.webview.postMessage({ type: 'setScale', scale: e.scale });
            }
        }));
        vscode.workspace.fs.stat(this.resource).then(({ size }) => {
            this._imageBinarySize = size;
            this.update();
        });
        this.update();
    }

    onMessage(message: { type: string; value: any; }): void {
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
            default: return;
        }
    }

    onActive(): void {
        this.sizeStatusBarEntry.show(this.id, this._imageSize || '');
        this.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
        this.zoomStatusBarEntry.show(this.id, this._imageZoom || 'fit');
    }

    onUnActive(): void {
        this.sizeStatusBarEntry.hide(this.id);
        this.binarySizeStatusBarEntry.hide(this.id);
        this.zoomStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        this.sizeStatusBarEntry.hide(this.id);
        this.binarySizeStatusBarEntry.hide(this.id);
        this.zoomStatusBarEntry.hide(this.id);
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

    async getWebviewContents(): Promise<string> {
        const version = Date.now().toString();
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

	<title>Image Preview1</title>

	<link rel="stylesheet" href="${escapeAttribute(this.extensionResource('/media/main.css'))}" type="text/css" media="screen" nonce="${nonce}">

	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: ${cspSource}; script-src 'nonce-${nonce}'; style-src ${cspSource} 'nonce-${nonce}';">
	<meta id="image-preview-settings" data-settings="${escapeAttribute(JSON.stringify(settings))}">
</head>
<body class="container image scale-to-fit loading">
	<div class="loading-indicator"></div>
	<div class="image-load-error">
		<p>${this.localize('preview.imageLoadError', "An error occurred while loading the image.")}</p>
		<a href="#" class="open-file-link">${this.localize('preview.imageLoadErrorLink', "Open file using VS Code's standard text/binary editor?")}</a>
	</div>
	<script type="text/javascript" nonce="${nonce}">
		window.module = {
			exports: {},
		};
		window.vscode = acquireVsCodeApi();
	</script>
	<script src="${escapeAttribute(this.extensionResource('/media/message.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/jpgDecoder.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/blp2.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/binReader.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/tga.js'))}" nonce="${nonce}"></script>
	<script src="${escapeAttribute(this.extensionResource('/media/main.js'))}" nonce="${nonce}"></script>
</body>
</html>`;
    }
}
