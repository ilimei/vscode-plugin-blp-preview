import path from "path";
import { Uri, TreeItemCollapsibleState } from "vscode";
import { W3XRoot } from "./w3x-root";

export class W3XModel {
    private _w3xRoots: W3XRoot[];

    constructor() {
        this._w3xRoots = [];
    }

    public openW3X(fileUri: Uri) {
        if (this._w3xRoots.find(v => v.sourceUri.fsPath === fileUri.fsPath)) {
            return;
        }
        this._w3xRoots.push(new W3XRoot(fileUri, path.basename(fileUri.fsPath), TreeItemCollapsibleState.Collapsed));
    }

    public get roots() {
        return this._w3xRoots;
    }

    async getTextContent(uri: string): Promise<string> {
        const compareUri = uri.replace(/\\/g, '/');
        return await this._w3xRoots.find(v => compareUri.startsWith(v.sourceUri.fsPath.replace(/\\/g, '/')))?.getTextContent(uri);
    }

    async getBufferContent(uri: string): Promise<Uint8Array> {
        const compareUri = uri.replace(/\\/g, '/'); // 兼容 unix 路径比较
        return await this._w3xRoots.find(v => compareUri.startsWith(v.sourceUri.fsPath.replace(/\\/g, '/')))?.getBufferContent(uri);
    }

    async extractMdxWithTextures(uri: string): Promise<{
        model: ArrayBuffer;
        blps: Uint8Array[];
        names: string[];
    }> {
        const compareUri = uri.replace(/\\/g, '/');
        return await this._w3xRoots.find(v => compareUri.startsWith(v.sourceUri.fsPath.replace(/\\/g, '/')))?.extractMdxWithTextures(uri);
    }
}
