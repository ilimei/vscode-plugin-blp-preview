import * as vscode from 'vscode';
import { localize } from '../localize';
import commandMap from "./helper/commands";
import { mdl2mdx } from './helper/mdl2mdx';

commandMap.set('blpPreview.convert2mdx', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    const distPath = uri.with({ path: uri.path + '.mdx' });
    this.edit.createFile(distPath, { ignoreIfExists: true });
    mdl2mdx(uri.fsPath, distPath.fsPath);
    await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
});

