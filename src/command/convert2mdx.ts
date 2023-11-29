import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import commandMap from "./helper/commands";
import { mdl2mdx } from './helper/mdl2mdx';

commandMap.set('blpPreview.convert2mdx', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    const data = vscode.workspace.getConfiguration("blpPreview");
    const shouldReplaceExt = data && data.convert2mdx ? data.convert2mdx : false;

    if (selectURI.length > 1) {
        vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: localize('blpPreview.saveBlpFolder', 'Select'),
            canSelectFiles: false,
            canSelectFolders: true,
        }).then(folders => {
            if (folders && folders[0]) {
                for (let uri of selectURI) {
                    if (!uri.fsPath.toLocaleLowerCase().endsWith('.mdl')) {
                        continue;
                    }
                    const basename = shouldReplaceExt ? path.basename(uri.fsPath).replace(/\.(mdl)$/i, '') : path.basename(uri.fsPath);
                    const distPath = folders[0].with({ path: folders[0].path + '/' + basename + '.mdx' });
                    this.edit.createFile(distPath, { ignoreIfExists: true });
                    mdl2mdx(uri.fsPath, distPath.fsPath);
                }
                return vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
            }
        });
    } else {
        try {
            const distPath = uri.with({ path: shouldReplaceExt ? uri.path.replace(/\.(mdl)$/i, '.mdx') : uri.path + '.mdx' });
            this.edit.createFile(distPath, { ignoreIfExists: true });
            mdl2mdx(uri.fsPath, distPath.fsPath);
            await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
        } catch (e) {
            console.error(e);
        }
    }
});