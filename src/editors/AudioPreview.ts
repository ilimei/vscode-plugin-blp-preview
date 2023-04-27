import BasePreview from "./BasePreview";

export default class AudioPreview extends BasePreview {
    getCssSource(): string[] {
        return [
            '/media/preview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/message.js',
            '/media/audioPreview.js',
        ];
    }

    getHTMLTempalte(): string {
        return `
        <div class="container audio" dropzone="copy">
            <audio controls id="audio" style="position:absolute;left:50%;transform:translateX(-100%); bottom: 40px;"></audio>
        </div>
        `;
    }

    onActive() {
        this.previewGetter.binarySizeStatusBarEntry.show(this.id, this._imageBinarySize);
    }

    onVisible(): void {
        this.previewGetter.binarySizeStatusBarEntry.hide(this.id);
    }

    onDispose(): void {
        this.previewGetter.binarySizeStatusBarEntry.hide(this.id);
    }
}