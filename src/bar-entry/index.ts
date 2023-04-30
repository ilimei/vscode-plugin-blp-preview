// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { BinarySizeStatusBarEntry } from './binarySizeStatusBarEntry';
import { SizeStatusBarEntry } from './sizeStatusBarEntry';
import { ZoomStatusBarEntry } from './zoomStatusBarEntry';

/**
 * register barEntry
 * @param context 
 */
export function activateBarEntry(context: vscode.ExtensionContext) {
    const sizeStatusBarEntry = new SizeStatusBarEntry();
    context.subscriptions.push(sizeStatusBarEntry);

    const binarySizeStatusBarEntry = new BinarySizeStatusBarEntry();
    context.subscriptions.push(binarySizeStatusBarEntry);

    const zoomStatusBarEntry = new ZoomStatusBarEntry();
    context.subscriptions.push(zoomStatusBarEntry);

    return { sizeStatusBarEntry, binarySizeStatusBarEntry, zoomStatusBarEntry };
}
