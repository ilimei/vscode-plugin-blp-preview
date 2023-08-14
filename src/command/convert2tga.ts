import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import blp2Image from './helper/blp2img';
import commandMap from "./helper/commands";

commandMap.set('blpPreview.convert2tga', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    const data = vscode.workspace.getConfiguration("convert2tga");
    const shouldReplaceExt = data && data.convert2png ? data.convert2png : false;
    if (selectURI.length > 1) {
        vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: localize('blpPreview.saveBlpFolder', 'Select'),
            canSelectFiles: false,
            canSelectFolders: true,
        }).then(folders => {
            if (folders && folders[0]) {
                for (let uri of selectURI) {
                    const ext = path.extname(uri.fsPath).toLocaleLowerCase();
                    if (!ext.endsWith('.blp') && !ext.endsWith('.png') && !ext.endsWith('.jpg') && !ext.endsWith('.jpeg')) {
                        continue;
                    }
                    const distPath = folders[0].with({ path: folders[0].path + '/' + path.basename(uri.fsPath) + '.tga' });
                    this.edit.createFile(distPath, { ignoreIfExists: true });
                    blp2Image(uri.fsPath, distPath.fsPath, 'tga');
                }
                return vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
            }
        });
    } else {
        const distPath = uri.with({ path: shouldReplaceExt ? uri.path.replace(/\.[^\.]+$/i, '.tga') : uri.path + '.tga' });
        this.edit.createFile(distPath, { ignoreIfExists: true });
        blp2Image(uri.fsPath, distPath.fsPath, 'tga');
        await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
    }
});