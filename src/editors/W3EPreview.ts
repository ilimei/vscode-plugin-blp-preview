import BasePreview from "./BasePreview";

export default class W3EPreview extends BasePreview {
    getCssSource(): string[] {
        return [
            '/media/preview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/message.js',
            '/media/viewer.min.js',
            '/media/mapPreview.js',
        ];
    }

    getHTMLTempalte(): string {
        return `
        <div class="container" dropzone="copy">
            <div class="inner">
                <canvas id="canvas" width="300" height="300"></canvas>
            </div>
        </div>
        `;
    }
}