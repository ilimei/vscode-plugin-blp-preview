import * as vscode from 'vscode';
import { BinarySizeStatusBarEntry } from '../barEntry/binarySizeStatusBarEntry';
import { SizeStatusBarEntry } from '../barEntry/sizeStatusBarEntry';
import { ZoomStatusBarEntry } from '../barEntry/zoomStatusBarEntry';
import BasePreview from "./BasePreview";

export default class PreviewGetter {
    constructor(
        private readonly extensionRoot: vscode.Uri,
        public readonly sizeStatusBarEntry: SizeStatusBarEntry,
        public readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
        public readonly zoomStatusBarEntry: ZoomStatusBarEntry,
    ) {

    }

    getPreviewByDocument(document: vscode.CustomDocument, webviewEditor: vscode.WebviewPanel): BasePreview {
        return null as BasePreview;
    }
}
