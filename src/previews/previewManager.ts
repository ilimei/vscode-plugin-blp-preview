/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as fs from "fs";
import { SizeStatusBarEntry } from '../statusBar/sizeStatusBarEntry';
import { ZoomStatusBarEntry } from '../statusBar/zoomStatusBarEntry';
import { BinarySizeStatusBarEntry } from '../statusBar/binarySizeStatusBarEntry';
import BasePreview from './basePreview';
import BlpPreview from './blpPreview';
import MdxPreview from './mdxPreview';
import ObjectPreview from './objectPreview';
import ArchiveManager from "../mpqReader/manager";

export default class PreviewManager implements vscode.CustomReadonlyEditorProvider {

	public static readonly viewType = 'blpPreview.previewEditor';

	private readonly _previews = new Set<BasePreview>();
	private _activePreview: BasePreview | undefined;
	private mpqManager: ArchiveManager;

	constructor(
		private readonly extensionRoot: vscode.Uri,
		private readonly sizeStatusBarEntry: SizeStatusBarEntry,
		private readonly binarySizeStatusBarEntry: BinarySizeStatusBarEntry,
		private readonly zoomStatusBarEntry: ZoomStatusBarEntry,
	) {
		const data = vscode.workspace.getConfiguration("blpPreview");
		if (data && data.mpqLocation) {
			if (fs.existsSync(data.mpqLocation)) {
				this.mpqManager = new ArchiveManager();
				this.mpqManager.load(data.mpqLocation).catch(e => {
					this.mpqManager = null;
					console.error(e);
					vscode.window.showErrorMessage("mpq location is not a mpq file!");
				});
			}
		}
	}

	public async openCustomDocument(uri: vscode.Uri) {
		return { uri, dispose: () => { } };
	}

	public async resolveCustomEditor(
		document: vscode.CustomDocument,
		webviewEditor: vscode.WebviewPanel,
	): Promise<void> {
		let preview: BasePreview;
		const documentPath = document.uri.path.toLowerCase();
		const isBlp = documentPath.endsWith('blp');
		const isTga = documentPath.endsWith('tga');
		const isMdx = documentPath.endsWith('mdx');
		const isW3e = documentPath.endsWith('w3e');
		const isIni = documentPath.endsWith('ini');
		if (isBlp || isTga) {
			preview = new BlpPreview(this.extensionRoot, document.uri, this.mpqManager, webviewEditor, this.sizeStatusBarEntry, this.binarySizeStatusBarEntry, this.zoomStatusBarEntry);
		} else if (isMdx || isW3e) {
			preview = new MdxPreview(this.extensionRoot, document.uri, this.mpqManager, webviewEditor, this.binarySizeStatusBarEntry);
		} else if(isIni) {
			preview = new ObjectPreview(this.extensionRoot, document.uri, this.mpqManager, webviewEditor, this.binarySizeStatusBarEntry);
		}
		if (!preview) {
			return;
		}
		
		this._previews.add(preview);
		this.setActivePreview(preview);

		webviewEditor.onDidDispose(() => { this._previews.delete(preview); });

		webviewEditor.onDidChangeViewState(() => {
			if (webviewEditor.active) {
				this.setActivePreview(preview);
			} else if (this._activePreview === preview && !webviewEditor.active) {
				this.setActivePreview(undefined);
			}
		});
	}

	public get activePreview() { return this._activePreview; }

	private setActivePreview(value: BasePreview | undefined): void {
		this._activePreview = value;
		this.setPreviewActiveContext(!!value);
	}

	private setPreviewActiveContext(value: boolean) {
		vscode.commands.executeCommand('setContext', 'blpPreviewFocus', value);
	}
}
