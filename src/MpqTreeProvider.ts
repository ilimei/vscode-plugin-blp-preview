import * as vscode from 'vscode';
import MpqArchive from './mpqReader/archive';
import ArchiveManager from './mpqReader/manager';

class TreeNode {
    name: string;
    rootUri: vscode.Uri;
    children: TreeNode[] = [];
    childMap: { [key: string]: TreeNode } = {};

    constructor(file: string, rootUri: vscode.Uri) {
        this.name = file;
        this.rootUri = rootUri;
    }

    addFile(file: string) {
        const child = file.split(/\\/g);
        if (child.length === 1) {
            this.children.push(new TreeNode(child[0], this.rootUri.with({ path: this.rootUri.path + '\\' + child[0] })));
        } else {
            let prev: TreeNode = this;
            for (let i = 0; i < child.length; i++) {
                const key = child[i];
                if (!prev.childMap[key]) {
                    prev.childMap[key] = new TreeNode(key, prev.rootUri.with({ path: prev.rootUri.path + '\\' + key }));
                    prev.children.push(prev.childMap[key]);
                }
                prev = prev.childMap[key];
            }
        }
    }

    isLeaf() {
        return this.children.length === 0;
    }

    getTreeItems() {
        return this.children.sort((a, b) => {
            if (a.isLeaf() && !b.isLeaf()) {
                return 1;
            } else if (!a.isLeaf() && b.isLeaf()) {
                return -1;
            } else {
                return a.name.localeCompare(b.name);
            }
        }).map(v => {
            return new TreeMpqNode(v.name, v, v.isLeaf() ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
        });
    }
}

export class MpqNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public mpqAchive: MpqArchive,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.resourceUri = vscode.Uri.parse('mpq:' + label);
        this.tooltip = this.label;
        this.description = this.label;
    }

    async buildTree() {
        const data = await this.mpqAchive.get('(listfile)');
        const files = Buffer.from(data).toString().split(/\r\n/);
        const root = new TreeNode(this.label, this.resourceUri);
        for (let i = 0; i < files.length; i++) {
            if (!files[i]) {
                continue;
            }
            root.addFile(files[i]);
        }
        return root;
    }

    // iconPath = {
    //     light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    //     dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    // };

    contextValue = 'dependency';
}

export class TreeMpqNode extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly node: TreeNode,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(node.name, collapsibleState);
        this.resourceUri = node.rootUri;

        if (this.node.isLeaf()) {
            this.command = {
                title: 'Open with mpq',
                command: 'blpPreview.openMpq',
                arguments: [this.resourceUri],
            };
        }

        this.tooltip = node.name;
        // this.description = node.name;
    }

    contextValue = 'dependency';
}

export class MpqTreeProvider implements vscode.TreeDataProvider<TreeMpqNode | MpqNode>, vscode.TextDocumentContentProvider {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeMpqNode | MpqNode | undefined | void> = new vscode.EventEmitter<TreeMpqNode | MpqNode | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeMpqNode | MpqNode | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private mpqManager: ArchiveManager) {
    }
    onDidChange?: vscode.Event<vscode.Uri>;

    getTreeItem(element: TreeMpqNode | MpqNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: TreeMpqNode | MpqNode): Promise<Array<MpqNode | TreeMpqNode>> {
        if (!this.mpqManager) {
            vscode.window.showInformationMessage('mpq location is not a mpq file!');
            return Promise.resolve([]);
        }
        if (!element) {
            await this.mpqManager.task;
            // const data = await this.mpqManager.archives[1111].get('(listfile)');
            console.info(this.mpqManager.archives);

            return this.mpqManager.archives.map(v => {
                return new MpqNode(v.name, v, vscode.TreeItemCollapsibleState.Collapsed);
            });
        } else if (element instanceof MpqNode) {
            const data = await element.buildTree();
            return data.getTreeItems();
        } else if (element instanceof TreeMpqNode) {
            return element.node.getTreeItems();
        }
        return Promise.resolve([]);
    }

    async provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): Promise<string> {
        const [first, ...rest] = uri.path.split(/\\/);
        const data = await this.mpqManager.get(rest.join('\\'));
        return Buffer.from(data).toString();
    }
}