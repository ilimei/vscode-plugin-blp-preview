import path from 'path';
import fs from 'fs';
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { BlpPreviewContext } from "../extension";
import { localize } from '../localize';
import MpqManager from '../mpq-manager';
import { MpqTreeProvider } from './mpq/mpq-tree-provider';
import { W3XTreeProvider } from './w3x/w3x-tree-data-provider';
import { MpqItemNode } from './mpq/mpq-item-node';
import { makeFileSync } from '../common/fs-helper';

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
        vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(path.basename(resourcePath)),
            title: localize('blpPreview.saveBlpFolder', 'Select'),
            filters: {
                'w3xfiles': [path.extname(resourcePath).slice(1)]
            },
        }).then(async fileUri => {
            if (fileUri) {
                ctx.edit.createFile(fileUri, { ignoreIfExists: true });
                fs.writeFileSync(fileUri.fsPath, await treeProvider.getBufferContent(node.node.rootUri));
                return vscode.window.showInformationMessage(localize("blpPreview.extractSuccess", "extract success"));
            }
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('blpPreview.extractFileWithTexture', (node: MpqItemNode) => {
        const resourcePath = node.node.rootUri.path.replace(/\\/g, '/');
        vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(path.basename(resourcePath)),
            title: localize('blpPreview.saveBlpFolder', 'Select'),
            filters: {
                'w3xfiles': ['mdx']
            },
        }).then(async fileUri => {
            if (fileUri) {
                ctx.edit.createFile(fileUri, { ignoreIfExists: true });
                const ret = await treeProvider.extractMdxWithTextures(node.node.rootUri);
                if (!ret) return;
                fs.writeFileSync(fileUri.fsPath, Buffer.from(ret.model));
                for (let i = 0; i < ret.names.length; i++) {
                    const distPath = fileUri.with({ path: path.dirname(fileUri.path) + '/' + ret.names[i].replace(/\\/g, '/') });
                    makeFileSync(distPath.fsPath);
                    ctx.edit.createFile(distPath, { ignoreIfExists: true });
                    fs.writeFileSync(distPath.fsPath, ret.blps[i]);
                }
                return vscode.window.showInformationMessage(localize("blpPreview.extractSuccess", "extract success"));
            }
        });
    }));
}
