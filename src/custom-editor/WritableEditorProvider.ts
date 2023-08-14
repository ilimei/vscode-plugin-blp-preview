import path from 'path';
import * as vscode from 'vscode';
import { BlpPreviewContext } from '../extension';
import type BasePreview from './BasePreview';
import SlkPreview from './slkPreview/SlkPreview';

export default class EditableEditorProvider implements vscode.CustomEditorProvider {
	public static readonly viewType = 'blpPreview.editableEditor';
	private readonly _previews = new Set<BasePreview>();
	private _activePreview: BasePreview | undefined;

	constructor(private readonly extensionRoot: vscode.Uri,
		private ctx: BlpPreviewContext) { }

	onDidChangeCustomDocument: vscode.Event<vscode.CustomDocumentEditEvent<vscode.CustomDocument>> | vscode.Event<vscode.CustomDocumentContentChangeEvent<vscode.CustomDocument>>;
	saveCustomDocument(document: vscode.CustomDocument, cancellation: vscode.CancellationToken): Thenable<void> {
		throw new Error('Method not implemented.');
	}
	saveCustomDocumentAs(document: vscode.CustomDocument, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
		throw new Error('Method not implemented.');
	}
	revertCustomDocument(document: vscode.CustomDocument, cancellation: vscode.CancellationToken): Thenable<void> {
		throw new Error('Method not implemented.');
	}
	backupCustomDocument(document: vscode.CustomDocument, context: vscode.CustomDocumentBackupContext, cancellation: vscode.CancellationToken): Thenable<vscode.CustomDocumentBackup> {
		throw new Error('Method not implemented.');
	}

	getPreviewByDocument(document: vscode.CustomDocument, webviewEditor: vscode.WebviewPanel): BasePreview {
		// document.uri.path
		switch (path.extname(document.uri.path).toLowerCase()) {
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
