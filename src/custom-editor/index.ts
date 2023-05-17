import * as vscode from 'vscode';
import { BlpPreviewContext } from '../extension';
import EditorProvider from "./EditorProvider";

export function registerCustomEditorProvider(context: vscode.ExtensionContext, ctx: BlpPreviewContext) {
  const editorProvider = new EditorProvider(context.extensionUri, ctx);
  const data = vscode.workspace.getConfiguration("blpPreview");

  context.subscriptions.push(vscode.window.registerCustomEditorProvider(EditorProvider.viewType, editorProvider, {
    supportsMultipleEditorsPerDocument: true,
    webviewOptions: {
      retainContextWhenHidden: !!data?.get('retainContextWhenHidden'),
    }
  }));
  context.subscriptions.push(vscode.window.registerCustomEditorProvider(EditorProvider.viewType + '.forMpq', editorProvider, {
    supportsMultipleEditorsPerDocument: false,
    webviewOptions: {
      retainContextWhenHidden: false,
    }
  }));
}
