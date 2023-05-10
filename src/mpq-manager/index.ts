import * as vscode from "vscode";
import * as fs from "fs";
import * as child_process from "child_process";
import ArchiveManager from "./manager";

const REG_PATH = 'HKCU\\Software\\Blizzard Entertainment\\Warcraft III';

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
        } else {
            child_process.exec(`reg query "${REG_PATH}" /v "InstallPath"`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const match = stdout.match(/InstallPath\s+REG_SZ\s+([^\r\n]+)/);
                if (match) {
                    const path = match[1];
                    const mpqPath = path + '\\war3.mpq';
                    if (fs.existsSync(mpqPath)) {
                        this._mpqManager.load(mpqPath).catch(e => {
                            this._mpqManager = null;
                            console.error(e);
                            vscode.window.showErrorMessage("mpq location is not a mpq file!");
                        });
                    }
                }
            });
        }
    }
}
