import path from 'path';
import * as vscode from 'vscode';
import EditorProvider from '../custom-editor/EditorProvider';
import commandMap from "./helper/commands";

const supportedFileExtensions = ['.mdx', '.blp', '.tga', '.wav', '.mp3', '.slk', '.w3i', '.mmp', '.w3c'];

commandMap.set('blpPreview.openMpq', async function (uri: vscode.Uri, selectURI: vscode.Uri[]) {
    if (supportedFileExtensions.includes(path.extname(uri.path).toLowerCase())) {
        // https://code.visualstudio.com/api/references/commands
        // https://vshaxe.github.io/vscode-extern/vscode/TextDocumentShowOptions.html#preview
        vscode.commands.executeCommand('vscode.openWith', uri, EditorProvider.viewType + '.forMpq', { preview: true });
    } else {
        vscode.window.showTextDocument(uri);
    }
});

commandMap.set('blpPreview.openW3X', (uri: vscode.Uri) => {
    if (supportedFileExtensions.includes(path.extname(uri.path).toLowerCase())) {
        // https://code.visualstudio.com/api/references/commands
        // https://vshaxe.github.io/vscode-extern/vscode/TextDocumentShowOptions.html#preview
        vscode.commands.executeCommand('vscode.openWith', uri, EditorProvider.viewType + '.forMpq', { preview: true });
    } else {
        vscode.window.showTextDocument(uri);
    }
});
