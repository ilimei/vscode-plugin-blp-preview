import BasePreview, { ViewState } from "./BasePreview";

export class BlpPreview extends BasePreview {

    protected _imageSize: string | undefined;
    protected _imageZoom: number | 'fit';

    getCssSource(): string[] {
        return [
            '/media/main.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/jpgDecoder.js',
            '/media/blp2.js',
            '/media/binReader.js',
            '/media/tga.js',
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
