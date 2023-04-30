import * as vscode from 'vscode';
import BasePreview from "../BasePreview";
import htmlTemplate from './index.html';

export default class BlpPreview extends BasePreview {

    protected _imageSize: string | undefined;
    protected _imageZoom: number | 'fit';

    getCssSource(): string[] {
        return [
            '/media/blpPreview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/lib/jpgDecoder.js',
            '/media/lib/blp2.js',
            '/media/lib/binReader.js',
            '/media/lib/tga.js',
            '/media/message.js',
            '/media/blpPreview.js',
        ];
    }

    getHTMLTempalte() {
        return htmlTemplate;
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
        this.ctx.sizeStatusBarEntry.show(this.id, this._imageSize || '');
        this.ctx.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
        this.ctx.zoomStatusBarEntry.show(this.id, this._imageZoom || 'fit');
    }

    onVisible(): void {
        this.ctx.sizeStatusBarEntry.hide(this.id);
        this.ctx.binarySizeStatusBarEntry.hide(this.id);
        this.ctx.zoomStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        this.ctx.sizeStatusBarEntry.hide(this.id);
        this.ctx.binarySizeStatusBarEntry.hide(this.id);
        this.ctx.zoomStatusBarEntry.hide(this.id);
    }
}
