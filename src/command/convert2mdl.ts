import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import commandMap from "./helper/commands";
import { mdx2mdl } from './helper/mdl2mdx';

commandMap.set('blpPreview.convert2blp', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    try {
        const distPath = uri.with({ path: uri.path + '.mdl' });
        this.edit.createFile(distPath, { ignoreIfExists: true });
        const buf = await vscode.workspace.fs.readFile(uri);
        mdx2mdl(buf, distPath.fsPath);
        await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
    } catch (e) {
        console.error(e);
    }
});

