import path from 'path';
import * as vscode from 'vscode';
import { localize } from '../localize';
import commandMap from "./helper/commands";
import { mdx2mdl } from './helper/mdl2mdx';

commandMap.set('blpPreview.convert2mdl', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    const data = vscode.workspace.getConfiguration("blpPreview");
    const shouldReplaceExt = data && data.convert2mdl ? data.convert2mdl : false;

    if (selectURI.length > 1) {
        vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: localize('blpPreview.saveBlpFolder', 'Select'),
            canSelectFiles: false,
            canSelectFolders: true,
        }).then(async folders => {
            if (folders && folders[0]) {
                for (let uri of selectURI) {
                    if (!uri.fsPath.toLocaleLowerCase().endsWith('.mdx')) {
                        continue;
                    }
                    const basename = shouldReplaceExt ? path.basename(uri.fsPath).replace(/\.(mdx)$/i, '') : path.basename(uri.fsPath);
                    const distPath = folders[0].with({ path: folders[0].path + '/' + basename + '.mdl' });
                    this.edit.createFile(distPath, { ignoreIfExists: true });
                    const buf = await vscode.workspace.fs.readFile(uri);
                    mdx2mdl(buf, distPath.fsPath);
                }
                return vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
            }
        });
    } else {
        try {
            const distPath = uri.with({ path: shouldReplaceExt ? uri.path.replace(/\.(mdx)$/i, '.mdl') : uri.path + '.mdl' });
            this.edit.createFile(distPath, { ignoreIfExists: true });
            const buf = await vscode.workspace.fs.readFile(uri);
            mdx2mdl(buf, distPath.fsPath);
            await vscode.window.showInformationMessage(localize("blpPreview.convertSuccess", "convert success"));
        } catch (e) {
            console.error(e);
        }
    }
});
