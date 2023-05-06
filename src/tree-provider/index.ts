import path from 'path';
import fs from 'fs';
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import EditorProvider from '../custom-editor/EditorProvider';
import { BlpPreviewContext } from "../extension";
import { localize } from '../localize';
import MpqManager from '../mpq-manager';
import { MpqTreeProvider } from './mpq/mpq-tree-provider';
import { W3XTreeProvider } from './w3x/w3x-tree-data-provider';
import { MpqItemNode } from './mpq/mpq-item-node';

export function registerTreeProvider(context: vscode.ExtensionContext, ctx: BlpPreviewContext) {
    const mpqProvider = new MpqTreeProvider(MpqManager.instance);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('blpPreview.mpqExplorer', mpqProvider));
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('mpq', mpqProvider));

    const treeProvider = new W3XTreeProvider();
    ctx.w3xTreeProvider = treeProvider;
    context.subscriptions.push(vscode.window.registerTreeDataProvider('w3xExplorer', treeProvider));
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('w3x', treeProvider));
    context.subscriptions.push(vscode.commands.registerCommand('blpPreview.exploreW3XFile', (uri: Uri) => {
        treeProvider.openW3X(uri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('blpPreview.w3xExplorerClear', () => {
        treeProvider.clear();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('blpPreview.extractFile', (node: MpqItemNode) => {
        const resourcePath = node.node.rootUri.path.replace(/\\/g, '/');
        vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: localize('blpPreview.saveBlpFolder', 'Select'),
            canSelectFiles: false,
            canSelectFolders: true,
        }).then(async folders => {
            if (folders && folders[0]) {
                const distPath = folders[0].with({ path: folders[0].path + '/' + path.basename(resourcePath) });
                ctx.edit.createFile(distPath, { ignoreIfExists: true });
                fs.writeFileSync(distPath.fsPath, await treeProvider.getBufferContent(node.node.rootUri));
                return vscode.window.showInformationMessage(localize("blpPreview.extractSuccess", "extract success"));
            }
        });
    }));
    
    context.subscriptions.push(vscode.commands.registerCommand('blpPreview.openW3X', (uri: Uri) => {
        if (['.mdx', '.blp', '.tga', '.wav', '.mp3', '.slk'].includes(path.extname(uri.path).toLowerCase())) {
            // https://code.visualstudio.com/api/references/commands
            // https://vshaxe.github.io/vscode-extern/vscode/TextDocumentShowOptions.html#preview
            vscode.commands.executeCommand('vscode.openWith', uri, EditorProvider.viewType, { preview: true });
        } else {
            vscode.window.showTextDocument(uri);
        }
    }));
}
