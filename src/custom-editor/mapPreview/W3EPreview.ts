import BasePreview from "../BasePreview";
import htmlTemplate from './index.html';

export default class W3EPreview extends BasePreview {
    getCssSource(): string[] {
        return [
            '/media/modelPreview.css',
        ];
    }

    getJSSource(): string[] {
        return [
            '/media/message.js',
            '/media/lib/viewer.min2.js',
            '/media/mapPreview.js',
        ];
    }

    getHTMLTempalte(): string {
        return htmlTemplate;
    }
}