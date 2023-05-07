import path from 'path';
import * as vscode from 'vscode';
import { BlpPreviewContext } from '../extension';
import AudioPreview from './audioPreview/AudioPreview';
import type BasePreview from './BasePreview';
import BlpPreview from './blpPreview/BlpPreview';
import W3EPreview from './mapPreview/W3EPreview';
import MdxPreview from './modelPreview/MdxPreview';
import SlkPreview from './slkPreview/SlkPreview';

export default class EditorProvider implements vscode.CustomReadonlyEditorProvider {
	public static readonly viewType = 'blpPreview.previewEditor';
	private readonly _previews = new Set<BasePreview>();
	private _activePreview: BasePreview | undefined;

	constructor(private readonly extensionRoot: vscode.Uri,
		private ctx: BlpPreviewContext) { }

	getPreviewByDocument(document: vscode.CustomDocument, webviewEditor: vscode.WebviewPanel): BasePreview {
		// document.uri.path
		switch (path.extname(document.uri.path).toLowerCase()) {
			case '.blp':
			case '.tga':
				return new BlpPreview(this.extensionRoot, document.uri, webviewEditor, this.ctx);
			case '.mdx':
				return new MdxPreview(this.extensionRoot, document.uri, webviewEditor, this.ctx);
			case '.w3e':
				return new W3EPreview(this.extensionRoot, document.uri, webviewEditor, this.ctx);
			case '.wav':
			case '.mp3':
				return new AudioPreview(this.extensionRoot, document.uri, webviewEditor, this.ctx);
			case '.mmp':
			case '.w3c':
			case '.w3i':
			case '.slk':
				return new SlkPreview(this.extensionRoot, document.uri, webviewEditor, this.ctx);
			default:
				break;
		}

		return null as BasePreview;
	}

	openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext): vscode.CustomDocument | Thenable<vscode.CustomDocument> {
		return { uri, dispose: () => { } };
	}

	resolveCustomEditor(document: vscode.CustomDocument, webviewEditor: vscode.WebviewPanel): void | Thenable<void> {
		const preview = this.getPreviewByDocument(document, webviewEditor);
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
