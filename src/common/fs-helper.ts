import fs from 'fs';
import path from 'path';
import crypto from "crypto";
import tempdir from 'temp-dir';

export const isWin = process.platform.startsWith('win');

export const MD5 = buffer => crypto.createHash("md5").update(buffer).digest("hex");
export const tempPath = path.join(tempdir, MD5(__dirname));
export const tempFilePath = (fileName: string, ext = ".blp") => path.join(tempPath, MD5(fileName) + ext);
makeDirSync(tempPath);

export function makefiles(filepaths: string[]) {
    filepaths.forEach(filepath => makeFileSync(filepath));
}

export function makefolders(files: string[]) {
    files.forEach(file => makeDirSync(file));
}

export function makeDirSync(dir: string) {
    if (fs.existsSync(dir)) return;
    if (!fs.existsSync(path.dirname(dir))) {
        makeDirSync(path.dirname(dir));
    }
    fs.mkdirSync(dir);
}

export function makeFileSync(filename: string) {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
}
