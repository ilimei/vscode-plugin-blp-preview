import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import commandMap from "./helper/commands";
import { mdx2mdl } from './helper/mdl2mdx';

commandMap.set('blpPreview.convert2mdl', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    const data = vscode.workspace.getConfiguration("convert2mdl");
    const shouldReplaceExt = data && data.convert2mdl ? data.convert2mdl : false;
    try {
        const distPath = uri.with({ path: shouldReplaceExt ? uri.path.replace(/\.(mdx)$/i, '.mdl') : uri.path + '.mdl' });
        this.edit.createFile(distPath, { ignoreIfExists: true });
        const buf = await vscode.workspace.fs.readFile(uri);
        mdx2mdl(buf, distPath.fsPath);
        await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
    } catch (e) {
        console.error(e);
    }
});

