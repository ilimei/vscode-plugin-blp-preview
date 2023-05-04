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
        return await this._w3xRoots.find(v => uri.startsWith(v.sourceUri.fsPath.replace(/\\/g, '/')))?.getTextContent(uri);
    }

    async getBufferContent(uri: string): Promise<Uint8Array> {
        return await this._w3xRoots.find(v => uri.startsWith(v.sourceUri.fsPath.replace(/\\/g, '/')))?.getBufferContent(uri);
    }
}
