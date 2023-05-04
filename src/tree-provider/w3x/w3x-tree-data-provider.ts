import * as vscode from 'vscode';
import {
    EventEmitter, Event, Uri,
} from 'vscode';
import { MpqItemNode } from '../mpq/mpq-item-node';
import MpqTreeHelperNode from '../mpq/mpq-tree-helper-node';
import { W3XModel } from './w3x-model';
import { W3XRoot } from './w3x-root';

function helperNodeToMpqItemNodes(node: MpqTreeHelperNode) {
    return node.children.sort((a, b) => {
        if (a.isLeaf() && !b.isLeaf()) {
            return 1;
        } else if (!a.isLeaf() && b.isLeaf()) {
            return -1;
        } else {
            return a.name.localeCompare(b.name);
        }
    }).map(v => {
        return new MpqItemNode(v.name, v, v.isLeaf() ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed, {
            title: 'Open with w3x',
            command: 'blpPreview.openW3X',
            arguments: [v.rootUri.with({
                scheme: 'w3x',
                path: v.rootUri.path,
            })],
        });
    });
}

export class W3XTreeProvider implements vscode.TreeDataProvider<MpqItemNode | W3XRoot>, vscode.TextDocumentContentProvider {
    private _onDidChangeTreeData: EventEmitter<void> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;

    private model: W3XModel;

    constructor() {
        this.clear();
    }

    public clear() {
        this.model = null;
        this.model = new W3XModel();
        this._onDidChangeTreeData.fire();
    }

    public openW3X(fileUri: Uri) {
        this.model.openW3X(fileUri);
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: MpqItemNode | W3XRoot): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getBufferContent(uri: vscode.Uri): Promise<Uint8Array> {
        return this.model.getBufferContent(uri.path.slice(1));
    }

    async getChildren(element?: MpqItemNode | W3XRoot): Promise<Array<W3XRoot | MpqItemNode>> {
        if (!element) {
            return Promise.resolve(this.model.roots);
        }
        if (element instanceof W3XRoot) {
            const data = await element.buildTree();
            return helperNodeToMpqItemNodes(data);
        } else if (element instanceof MpqItemNode) {
            return helperNodeToMpqItemNodes(element.node);
        }
        return Promise.resolve([]);
    }

    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): Promise<string> {
        return this.model.getTextContent(uri.path.slice(1));
    }
}