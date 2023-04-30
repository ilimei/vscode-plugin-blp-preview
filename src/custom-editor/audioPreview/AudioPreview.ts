import BasePreview from "../BasePreview";
import htmlTemplate from './index.html';

export default class AudioPreview extends BasePreview {
    getCssSource(): string[] {
        return [
            '/media/audioPreview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/message.js',
            '/media/audioPreview.js',
        ];
    }

    getHTMLTempalte(): string {
        return htmlTemplate;
    }

    onActive() {
        this.ctx.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
    }

    onVisible(): void {
        this.ctx.binarySizeStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        this.ctx.binarySizeStatusBarEntry.hide(this.id);
    }
}