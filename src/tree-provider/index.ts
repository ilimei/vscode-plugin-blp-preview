import * as vscode from 'vscode';
import { BlpPreviewContext } from "../extension";
import MpqManager from '../mpq-manager';
import { MpqTreeProvider } from './mpq/mpq-tree-provider';
import { W3XTreeProvider } from './w3x/w3x-tree-data-provider';

export function registerTreeProvider(context: vscode.ExtensionContext, ctx: BlpPreviewContext) {
    const mpqProvider = new MpqTreeProvider(MpqManager.instance);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('blpPreview.mpqExplorer', mpqProvider));
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('mpq', mpqProvider));

    const treeProvider = new W3XTreeProvider(ctx);
    ctx.w3xTreeProvider = treeProvider;
    context.subscriptions.push(vscode.window.registerTreeDataProvider('blpPreview.w3xExplorer', treeProvider));
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('w3x', treeProvider));
}
