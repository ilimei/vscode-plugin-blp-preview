import * as vscode from 'vscode';

export default class MpqTreeHelperNode {
    name: string;
    rootUri: vscode.Uri;
    children: MpqTreeHelperNode[] = [];
    childMap: { [key: string]: MpqTreeHelperNode } = {};

    constructor(file: string, rootUri: vscode.Uri) {
        this.name = file;
        this.rootUri = rootUri;
    }

    addFile(file: string) {
        const child = file.split(/\\/g);
        if (child.length === 1) {
            this.children.push(new MpqTreeHelperNode(child[0], this.rootUri.with({ path: this.rootUri.path + '\\' + child[0] })));
        } else {
            let prev: MpqTreeHelperNode = this;
            for (let i = 0; i < child.length; i++) {
                const key = child[i];
                const lowerCaseKey = key.toLowerCase();
                if (!prev.childMap[lowerCaseKey]) {
                    prev.childMap[lowerCaseKey] = new MpqTreeHelperNode(key, prev.rootUri.with({ path: prev.rootUri.path + '\\' + key }));
                    prev.children.push(prev.childMap[lowerCaseKey]);
                }
                prev = prev.childMap[lowerCaseKey];
            }
        }
    }

    isLeaf() {
        return this.children.length === 0;
    }
}