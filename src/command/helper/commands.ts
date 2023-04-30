import * as vscode from 'vscode';

export const commandMap = new Map<string, (this: {
    edit: vscode.WorkspaceEdit;
},...args: any[]) => any>();

export default commandMap;