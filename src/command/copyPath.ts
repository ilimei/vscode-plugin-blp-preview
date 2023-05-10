// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import type { MpqNode } from '../tree-provider/mpq/mpq-node';
import commandMap from './helper/commands';

commandMap.set('blpPreview.copyPath', async (node: MpqNode) => {
    vscode.env.clipboard.writeText(node.resourceUri.path.replace(/^.+\.mpq\\/ig, ''));
});
