import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import blp2Image from './helper/blp2img';
import commandMap from "./helper/commands";

commandMap.set('blpPreview.convert2blp', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    const data = vscode.workspace.getConfiguration("blpPreview");
    const shouldReplaceExt = data && data.convert2blp ? data.convert2blp : false;
    if (selectURI.length > 1) {
        vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: localize('blpPreview.saveBlpFolder', 'Select'),
            canSelectFiles: false,
            canSelectFolders: true,
        }).then(folders => {
            if (folders && folders[0]) {
                for (let uri of selectURI) {
                    if (!uri.fsPath.toLocaleLowerCase().endsWith('.jpg') && !uri.fsPath.toLocaleLowerCase().endsWith('.png')) {
                        continue;
                    }
                    const basename = shouldReplaceExt ? path.basename(uri.fsPath).replace(/\.(jpg|jpeg|png)$/i, '') : path.basename(uri.fsPath);
                    const distPath = folders[0].with({ path: folders[0].path + '/' + basename + '.blp' });
                    this.edit.createFile(distPath, { ignoreIfExists: true });
                    blp2Image(uri.fsPath, distPath.fsPath, 'blp');
                }
                return vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
            }
        });
    } else {
        const distPath = uri.with({ path: shouldReplaceExt ? uri.path.replace(/\.(jpg|jpeg|png)$/i, '.blp') : uri.path + '.blp' });
        this.edit.createFile(distPath, { ignoreIfExists: true });
        blp2Image(uri.fsPath, distPath.fsPath, 'blp');
        await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
    }
});
