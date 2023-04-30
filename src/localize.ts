import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const map = {};

export function init(extensionPath: string) {
    const local = vscode.env.language;
    const localPath = path.join(extensionPath, `package.nls.${local}.json`);
    if (fs.existsSync(path.join(localPath))) {
        try {
            Object.assign(map, JSON.parse(fs.readFileSync(localPath).toString('utf-8')));
        } catch (e) {
            console.error(e);
        }
    }
}

export function localize(key: string, defaultValue: string) {
    return map[key] || defaultValue;
}