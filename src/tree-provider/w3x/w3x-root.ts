import {
    window, Uri, TreeItem, TreeItemCollapsibleState, Command,
} from 'vscode';
import MpqArchive from '../../mpq-manager/archive';
import MpqTreeHelperNode from '../mpq/mpq-tree-helper-node';
import txt from 'raw-loader!./file-list.txt';

export class W3XRoot extends TreeItem {
    private _mpq: MpqArchive;
    private _promise: Thenable<any>;

    constructor(
        public _uri: Uri,
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly command?: Command) {
        super(label, collapsibleState);
        try {
            this._mpq = new MpqArchive(this._uri.fsPath);
            this._promise = this._mpq.load(this._uri.fsPath, true);
        } catch (e) {
            window.showErrorMessage(e.toString());
        }
    }

    async buildTree() {
        let files = txt.split(/\r\n/);
        if(this._mpq.has('(listfile)')) {
            const data = await this._mpq.get('(listfile)');
            files = Buffer.from(data).toString().split(/\r\n/);
        }
        const root = new MpqTreeHelperNode(this.label, this._uri);
        for (let i = 0; i < files.length; i++) {
            const name = files[i];
            if (!name || !this._mpq.has(name)) {
                continue;
            }
            root.addFile(name);
        }
        return root;
    }

    public get sourceUri(): Uri {
        return this._uri;
    }

    async getTextContent(uri: string) {
        const name = uri.slice(this._uri.path.length);
        await this._promise;
        const data = await this._mpq.get(name);
        return Buffer.from(data).toString();
    }

    async getBufferContent(uri: string) {
        const name = uri.slice(this._uri.path.length);
        await this._promise;
        return await this._mpq.get(name);
    }

    contextValue = 'w3x';
}