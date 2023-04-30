import BasePreview from "../BasePreview";
import htmlTemplate from './index.html';

export default class MdxPreview extends BasePreview {
    getCssSource(): string[] {
        return [
            '/media/modelPreview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/lib/viewer.min2.js',
            '/media/message.js',
            '/media/modelPreview.js',
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