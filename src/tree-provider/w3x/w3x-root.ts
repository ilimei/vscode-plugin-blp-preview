import {
    window, Uri, TreeItem, TreeItemCollapsibleState, Command,
} from 'vscode';
import { parseMDX, generateMDX } from 'war3-model';
import MpqTreeHelperNode from '../mpq/mpq-tree-helper-node';
import War3Map from '../../parser/w3x';

export class W3XRoot extends TreeItem {
    private _w3x: War3Map;

    constructor(
        public _uri: Uri,
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly command?: Command) {
        super(label, collapsibleState);
        try {
            this._w3x = War3Map.getByPath(this._uri.fsPath);
        } catch (e) {
            window.showErrorMessage(e.toString());
        }
    }

    async buildTree() {
        const files: string[] = await this._w3x.getList();
        const root = new MpqTreeHelperNode(this.label, this._uri);
        for (const name of files) {
            root.addFile(name);
        }
        return root;
    }

    public get sourceUri(): Uri {
        return this._uri;
    }

    async getTextContent(uri: string) {
        const name = uri.slice(this._uri.path.length);
        const data = await this._w3x.get(name);
        return Buffer.from(data).toString();
    }

    async getBufferContent(uri: string) {
        const name = uri.slice(this._uri.path.length);
        return await this._w3x.get(name);
    }

    async extractMdxWithTextures(uri: string) {
        const name = uri.slice(this._uri.path.length);
        const data = await this._w3x.get(name);
        const model = parseMDX(data.buffer);
        const names: string[] = [];
        const pms = model.Textures.filter(tex => {
            return this._w3x.has(tex.Image);
        }).map(tex => {
            const orign = tex.Image;
            tex.Image = 'textures\\' + orign.split(/\\/g).pop();
            names.push(tex.Image);
            return this._w3x.get(orign);
        });

        const blps = await Promise.all(pms);
        return { model: generateMDX(model), blps, names };
    }

    contextValue = 'w3x';
}
