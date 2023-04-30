import path from 'path';
import * as vscode from 'vscode';
import EditorProvider from '../custom-editor/EditorProvider';
import commandMap from "./helper/commands";

commandMap.set('blpPreview.openMpq', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    if (['.mdx', '.blp', '.tga', '.wav', '.mp3'].includes(path.extname(uri.path).toLowerCase())) {
        // https://code.visualstudio.com/api/references/commands
        // https://vshaxe.github.io/vscode-extern/vscode/TextDocumentShowOptions.html#preview
        vscode.commands.executeCommand('vscode.openWith', uri, EditorProvider.viewType, { preview: true });
    } else {
        vscode.window.showTextDocument(uri);
    }
});
