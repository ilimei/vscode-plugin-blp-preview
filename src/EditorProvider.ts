import * as vscode from 'vscode';
import BasePreview from './editors/BasePreview';
import PreviewGetter from './editors';

export default class EditorProvider implements vscode.CustomReadonlyEditorProvider {
    public static readonly viewType = 'blpPreview.previewEditor';
    private readonly _previews = new Set<BasePreview>();
    private _activePreview: BasePreview | undefined;

    constructor(
		private readonly previewGetter: PreviewGetter,
    ) {
        
    }

    openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext): vscode.CustomDocument | Thenable<vscode.CustomDocument> {
        return { uri, dispose: () => { } };
    }

    resolveCustomEditor(document: vscode.CustomDocument, webviewEditor: vscode.WebviewPanel): void | Thenable<void> {
        const preview = this.previewGetter.getPreviewByDocument(document, webviewEditor);
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
