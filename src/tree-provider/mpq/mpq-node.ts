import * as vscode from 'vscode';
import type MpqArchive from '../../mpq-manager/archive';
import MpqTreeHelperNode from './mpq-tree-helper-node';

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
        const root = new MpqTreeHelperNode(this.label, this.resourceUri);
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

    contextValue = 'mpq';
}