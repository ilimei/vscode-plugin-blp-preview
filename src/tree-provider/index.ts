import * as vscode from 'vscode';
import { BlpPreviewContext } from "../extension";
import MpqManager from '../mpq-manager';
import { MpqTreeProvider } from './mpq/mpq-tree-provider';

export function registerTreeProvider(context: vscode.ExtensionContext, ctx: BlpPreviewContext) {
    const mpqProvider = new MpqTreeProvider(MpqManager.instance);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('blpPreview.mpqExplorer', mpqProvider));
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('mpq', mpqProvider));
}
