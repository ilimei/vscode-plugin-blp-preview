import * as fs from 'fs';

export default class FsPromise {

    static async open(path: fs.PathLike, flags: fs.OpenMode): Promise<number> {
        return new Promise((resolve, reject) => {
            fs.open(path, flags, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async stat(path: string): Promise<fs.Stats> {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async readFile(path: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async readDir(path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async read(fd: number, buffer: NodeJS.ArrayBufferView, offset: number, length: number, position: number): Promise<number> {
        return new Promise((resolve, reject) => {
            fs.read(fd, buffer, offset, length, position, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
