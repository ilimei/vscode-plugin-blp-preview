import * as vscode from "vscode";
import * as fs from "fs";
import ArchiveManager from "./manager";

export default class MpqManager {
    private static hasInit = false;
    private static _mpqManager: ArchiveManager;

    public static get instance() {
        if (!MpqManager.hasInit) {
            MpqManager.hasInit = true;
            MpqManager.create();
        }
        return MpqManager._mpqManager;
    }

    private static create() {
        this._mpqManager = new ArchiveManager();
        const data = vscode.workspace.getConfiguration("blpPreview");
        if (data && data.mpqLocation) {
            if (fs.existsSync(data.mpqLocation)) {
                this._mpqManager.load(data.mpqLocation).catch(e => {
                    this._mpqManager = null;
                    console.error(e);
                    vscode.window.showErrorMessage("mpq location is not a mpq file!");
                });
            }
        }
    }
}
