import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { BinarySizeStatusBarEntry } from '../barEntry/binarySizeStatusBarEntry';
import { SizeStatusBarEntry } from '../barEntry/sizeStatusBarEntry';
import { ZoomStatusBarEntry } from '../barEntry/zoomStatusBarEntry';
import BasePreview from "./BasePreview";
import BlpPreview from './BlpPreview';
import MdxPreview from './MdxPreview';
import W3EPreview from './W3EPreview';
import ArchiveManager from '../mpqReader/manager';

export default class PreviewGetter {
    private _mpqManager: ArchiveManager;
    
    constructor(
        private readonly extensionRoot: vscode.Uri,
        public readonly sizeStatusBarEntry: SizeStatusBarEntry,
        public readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
        public readonly zoomStatusBarEntry: ZoomStatusBarEntry,
    ) {
        const data = vscode.workspace.getConfiguration("blpPreview");
		if (data && data.mpqLocation) {
			if (fs.existsSync(data.mpqLocation)) {
				this._mpqManager = new ArchiveManager();
				this._mpqManager.load(data.mpqLocation).catch(e => {
					this._mpqManager = null;
					console.error(e);
					vscode.window.showErrorMessage("mpq location is not a mpq file!");
				});
			}
		}
    }

    public get mpqManager() {
        return this._mpqManager;
    }

    getPreviewByDocument(document: vscode.CustomDocument, webviewEditor: vscode.WebviewPanel): BasePreview {
        // document.uri.path
        switch (path.extname(document.uri.path).toLowerCase()) {
            case '.blp':
            case '.tga':
                return new BlpPreview(this.extensionRoot, document.uri, webviewEditor, this);
            case '.mdx':
                return new MdxPreview(this.extensionRoot, document.uri, webviewEditor, this);
            case '.w3e':
                return new W3EPreview(this.extensionRoot, document.uri, webviewEditor, this);
            default:
                break;
        }

        return null as BasePreview;
    }
}
