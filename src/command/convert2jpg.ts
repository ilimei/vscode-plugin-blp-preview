import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import blp2Image from './helper/blp2img';
import commandMap from "./helper/commands";

commandMap.set('blpPreview.convert2jpg', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    if (selectURI.length > 1) {
        vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: localize('blpPreview.saveBlpFolder', 'Select'),
            canSelectFiles: false,
            canSelectFolders: true,
        }).then(folders => {
            if (folders && folders[0]) {
                for (let uri of selectURI) {
                    if (!uri.fsPath.toLocaleLowerCase().endsWith('.blp')) {
                        continue;
                    }
                    const distPath = folders[0].with({ path: folders[0].path + '/' + path.basename(uri.fsPath) + '.jpg' });
                    this.edit.createFile(distPath, { ignoreIfExists: true });
                    blp2Image(uri.fsPath, distPath.fsPath, 'jpg');
                }
                return vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
            }
        });
    } else {
        const distPath = uri.with({ path: uri.path + '.jpg' });
        this.edit.createFile(distPath, { ignoreIfExists: true });
        blp2Image(uri.fsPath, distPath.fsPath, 'jpg');
        await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
    }
});
