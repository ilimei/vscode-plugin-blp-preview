// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import commandMap from './helper/commands';

import './copyPath';
import './convert2png';
import './convert2jpg';
import './convert2blp';
import './convert2mdx';
import './convert2mdl';
import './openMpq';

/**
 * register commands
 * @param context 
 * @param thisContext
 */
export function registerCommands(context: vscode.ExtensionContext, thisContext: { edit: vscode.WorkspaceEdit }) {
    for (const [key, value] of commandMap) {
        context.subscriptions.push(vscode.commands.registerCommand(key, value, thisContext));
    }
}
