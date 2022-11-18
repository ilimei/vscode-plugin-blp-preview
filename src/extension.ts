// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { activateBarEntry } from './barEntry';
import EditorProvider from './EditorProvider';
import PreviewGetter from './editors';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const { sizeStatusBarEntry, binarySizeStatusBarEntry, zoomStatusBarEntry } = activateBarEntry(context);

	const editorProvider = new EditorProvider(new PreviewGetter(context.extensionUri, sizeStatusBarEntry, binarySizeStatusBarEntry, zoomStatusBarEntry));

	context.subscriptions.push(vscode.window.registerCustomEditorProvider(EditorProvider.viewType, editorProvider, {
		supportsMultipleEditorsPerDocument: true,
		webviewOptions: {
			retainContextWhenHidden: true,
		}
	}));

	// context.subscriptions.push(vscode.commands.registerCommand('blpPreview.zoomIn', () => {
	// 	editorProvider.activePreview?.zoomIn();
	// }));

	// context.subscriptions.push(vscode.commands.registerCommand('blpPreview.zoomOut', () => {
	// 	editorProvider.activePreview?.zoomOut();
	// }));
}

// this method is called when your extension is deactivated
export function deactivate() { }
