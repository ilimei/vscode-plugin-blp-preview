import * as vscode from 'vscode';
import BasePreview from "./BasePreview";

export default class BlpPreview extends BasePreview {

    protected _imageSize: string | undefined;
    protected _imageZoom: number | 'fit';

    getCssSource(): string[] {
        return [
            '/media/main.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/message.js',
            '/media/jpgDecoder.js',
            '/media/blp2.js',
            '/media/binReader.js',
            '/media/tga.js',
            '/media/main.js',
        ];
    }

    getHTMLTempalte() {
        return `
        <div class="loading-indicator"></div>
        <div class="image-load-error">
            <p>An error occurred while loading the image.</p>
            <a href="#" class="open-file-link">Open file using VS Code's standard text/binary editor?</a>
        </div>
        `;
    }

    onMessage(message: any): void {
        super.onMessage(message);
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
                    vscode.commands.executeCommand('vscode.openWith', this.resource, 'default', this.webviewEditor.viewColumn);
                    break;
                }
        }
    }

    onActive() {
        this.previewGetter.sizeStatusBarEntry.show(this.id, this._imageSize || '');
        this.previewGetter.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
        this.previewGetter.zoomStatusBarEntry.show(this.id, this._imageZoom || 'fit');
    }

    onVisible(): void {
        this.previewGetter.sizeStatusBarEntry.hide(this.id);
        this.previewGetter.binarySizeStatusBarEntry.hide(this.id);
        this.previewGetter.zoomStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        this.previewGetter.sizeStatusBarEntry.hide(this.id);
        this.previewGetter.binarySizeStatusBarEntry.hide(this.id);
        this.previewGetter.zoomStatusBarEntry.hide(this.id);
    }
}
