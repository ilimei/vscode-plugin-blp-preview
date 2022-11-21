// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { activateBarEntry } from './barEntry';
import EditorProvider from './EditorProvider';
import PreviewGetter from './editors';
import blp2Image from './command/blp2img';
import { mdl2mdx, mdx2mdl } from './command/mdl2mdx';
import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const edit = new vscode.WorkspaceEdit();

	const { sizeStatusBarEntry, binarySizeStatusBarEntry, zoomStatusBarEntry } = activateBarEntry(context);

	const editorProvider = new EditorProvider(new PreviewGetter(context.extensionUri, sizeStatusBarEntry, binarySizeStatusBarEntry, zoomStatusBarEntry));

	context.subscriptions.push(vscode.window.registerCustomEditorProvider(EditorProvider.viewType, editorProvider, {
		supportsMultipleEditorsPerDocument: true,
		webviewOptions: {
			retainContextWhenHidden: true,
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('blpPreview.convert2png', async (uri: vscode.Uri, selectURI: vscode.Uri[]) => {
		const distPath = uri.with({ path: uri.path + '.png' });
		edit.createFile(distPath, { ignoreIfExists: true });
		blp2Image(uri.fsPath, distPath.fsPath, 'png');
		await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('blpPreview.convert2jpg', async (uri: vscode.Uri, selectURI: vscode.Uri[]) => {
		const distPath = uri.with({ path: uri.path + '.jpg' });
		edit.createFile(distPath, { ignoreIfExists: true });
		blp2Image(uri.fsPath, distPath.fsPath, 'jpg');
		await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('blpPreview.convert2blp', async (uri: vscode.Uri, selectURI: vscode.Uri[]) => {
		const distPath = uri.with({ path: uri.path + '.blp' });
		edit.createFile(distPath, { ignoreIfExists: true });
		blp2Image(uri.fsPath, distPath.fsPath, 'blp');
		await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('blpPreview.convert2mdl', async (uri: vscode.Uri, selectURI: vscode.Uri[]) => {
		try {
			const distPath = uri.with({ path: uri.path + '.mdl' });
			edit.createFile(distPath, { ignoreIfExists: true });
			const buf = await vscode.workspace.fs.readFile(uri);
			mdx2mdl(buf, distPath.fsPath);
			await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
		} catch (e) {
			console.error(e);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('blpPreview.convert2mdx', async (uri: vscode.Uri, selectURI: vscode.Uri[]) => {
		const distPath = uri.with({ path: uri.path + '.mdx' });
		edit.createFile(distPath, { ignoreIfExists: true });
		mdl2mdx(uri.fsPath, distPath.fsPath);
		await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
