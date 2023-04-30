// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { init } from './localize';
import type { SizeStatusBarEntry } from './bar-entry/sizeStatusBarEntry';
import type { BinarySizeStatusBarEntry } from './bar-entry/binarySizeStatusBarEntry';
import type { ZoomStatusBarEntry } from './bar-entry/zoomStatusBarEntry';
import { activateBarEntry } from './bar-entry';
import { registerCommands } from './command';
import { registerCustomEditorProvider } from './custom-editor';
import { registerTreeProvider } from './tree-provider';

export type BlpPreviewContext = {
	extensionUri: vscode.Uri;
	sizeStatusBarEntry: SizeStatusBarEntry;
	binarySizeStatusBarEntry: BinarySizeStatusBarEntry;
	zoomStatusBarEntry: ZoomStatusBarEntry;
	edit: vscode.WorkspaceEdit;
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const edit = new vscode.WorkspaceEdit();
	init(context.extensionPath);

	const { sizeStatusBarEntry, binarySizeStatusBarEntry, zoomStatusBarEntry } = activateBarEntry(context);

	const ctx: BlpPreviewContext = {
		extensionUri: context.extensionUri,
		sizeStatusBarEntry,
		binarySizeStatusBarEntry,
		zoomStatusBarEntry,
		edit,
	};

	registerCommands(context, ctx);
	registerCustomEditorProvider(context, ctx);
	registerTreeProvider(context, ctx);
}

// this method is called when your extension is deactivated
export function deactivate() { }
