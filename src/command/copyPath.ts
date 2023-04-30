// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import commandMap from './helper/commands';
import type { MpqNode, TreeMpqNode } from '../tree-provider/MpqTreeProvider';

commandMap.set('blpPreview.copyPath', async (node: MpqNode | TreeMpqNode) => {
    vscode.env.clipboard.writeText(node.resourceUri.path.replace(/^.+\.mpq\\/ig, ''));
});
