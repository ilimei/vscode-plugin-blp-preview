import fs from 'fs';
import path from 'path';

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
    if (!fs.existsSync(filename)) {
        makeDirSync(path.dirname(filename));
    }
}
