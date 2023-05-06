import BasePreview from "../BasePreview";
import htmlTemplate from './index.html';

export default class SlkPreview extends BasePreview {
    getCssSource(): string[] {
        return [
            '/media/lib/xspreadsheet.css',
            '/media/slkPreview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/message.js',
            '/media/lib/xspreadsheet.js',
            '/media/slkPreview.js',
        ];
    }

    getHTMLTempalte(): string {
        return htmlTemplate;
    }

    onActive() {
        // this.ctx.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
    }

    onVisible(): void {
        // this.ctx.binarySizeStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        // this.ctx.binarySizeStatusBarEntry.hide(this.id);
    }
}