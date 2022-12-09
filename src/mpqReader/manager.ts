import MpqArchive from './archive';
import FsPromise from './fspromise';
import Task from '../common/task';
import * as path from "path";


export default class ArchiveManager {
    archives: MpqArchive[] = [];
    task: Task<boolean> | null = null;

    async load(mpqFilePath: string) {
        if (this.task) {
            await this.task;
            return;
        }
        this.task = new Task();
        const root = path.dirname(mpqFilePath);
        const files = await FsPromise.readDir(root);
        this.archives = await Promise.all(files.filter(v => v.endsWith('.mpq')).map(async file => {
            const archive = new MpqArchive(path.basename(file));
            await archive.load(path.resolve(root, file));
            return archive;
        }));
        this.task.resolve(true);
    }

    async get(name: string) {
        for (let i = 0; i < this.archives.length; i++) {
            const ret = await this.archives[i].get(name);
            if (ret) { return ret; }
        }
        return null;
    }

    async getAll(name: string) {
        const rets = [];
        for (let i = 0; i < this.archives.length; i++) {
            const ret = await this.archives[i].get(name);
            if (ret) { rets.push(ret); }
        }
        return rets;
    }
}

// const archive = new ArchiveManager();

// archive.load("/mnt/d/Program Files (x86)/dzclient/Game/Warcraft III Frozen Throne/war3.mpq").then(async () => {
//     const buf = await archive.get('replaceabletextures\\teamcolor\\teamcolor00.blp');
//     console.info(buf);
// });