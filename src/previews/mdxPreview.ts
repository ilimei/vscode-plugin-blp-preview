import * as vscode from 'vscode';
import ArchiveManager from '../mpqReader/manager';
import BasePreview, { escapeAttribute, getNonce, isMac, PreviewState } from "./basePreview";
import { BinarySizeStatusBarEntry } from '../statusBar/binarySizeStatusBarEntry';

export default class MdxPreview extends BasePreview {

    private _imageBinarySize: number | undefined;

    constructor(
        readonly extensionRoot: vscode.Uri,
        readonly resource: vscode.Uri,
        readonly mpqManager: ArchiveManager,
        readonly webviewEditor: vscode.WebviewPanel,
        private readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
    ) {
        super(extensionRoot, resource, mpqManager, webviewEditor);
        this.init();
    }

    init() {
        vscode.workspace.fs.stat(this.resource).then(({ size }) => {
            this._imageBinarySize = size;
            this.update();
        });
        this.update();
    }

    onMessage(message: { type: string; value: any; }): void {
    }

    onActive(): void {
        this.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
    }

    onUnActive(): void {
        this.binarySizeStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        this.binarySizeStatusBarEntry.hide(this.id);
    }

    public zoomIn() {
    }

    public zoomOut() {
    }

    async getWebviewContents(): Promise<string> {
        const settings = {
            isMac: isMac(),
        };

        const nonce = getNonce();
        const cspSource = this.webviewEditor.webview.cspSource;
        const isMdx = this.resource.path.toLowerCase().endsWith('mdx');

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
                    window.nonce = "${nonce}";
				</script>
				<script src="${escapeAttribute(this.extensionResource('/media/message.js'))}" nonce="${nonce}"></script>
				<script src="${escapeAttribute(this.extensionResource('/media/viewer.min.js'))}" nonce="${nonce}"></script>
				<script src="${escapeAttribute(this.extensionResource(isMdx ? '/media/modelPreview.js' : '/media/mapPreview.js'))}" nonce="${nonce}"></script>
			</body>
			</html>`;
    }
}