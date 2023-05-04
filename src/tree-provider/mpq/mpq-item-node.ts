import * as vscode from 'vscode';
import MpqTreeHelperNode from './mpq-tree-helper-node';

export class MpqItemNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly node: MpqTreeHelperNode,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(node.name, collapsibleState);
        this.resourceUri = node.rootUri;

        this.contextValue = 'folder';
        if (this.node.isLeaf()) {
            this.contextValue = 'file';
            this.command = command || {
                title: 'Open with mpq',
                command: 'blpPreview.openMpq',
                arguments: [this.resourceUri],
            };
        }

        this.tooltip = node.name;
        // this.description = node.name;
    }
}