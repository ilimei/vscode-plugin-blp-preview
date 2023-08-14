import * as fs from 'fs';
import * as path from 'path';
import { Blp1File, encode, decode, ImageType } from 'image-wasm-for-war3';

export default function blp2Image(blpPath: string, distPath: string, type: 'png' | 'jpg' | 'tga' | 'blp' = 'png') {
    const buf = fs.readFileSync(blpPath);
    let promise: Promise<{
        width: number;
        height: number;
        buffer: ArrayBuffer;
    }> | null = null;
    const ext = path.extname(blpPath).toLowerCase();
    console.info('ext', ext, Blp1File);
    switch (ext) {
        case '.blp':
            promise = Blp1File.decode(buf.buffer).getMimapData(0);
            break;
        case '.png':
            promise = decode(buf.buffer, ImageType.Png);
            break;
        case '.jpg':
        case '.jpeg':
            promise = decode(buf.buffer, ImageType.Jpeg);
            break;
        case '.tga':
            promise = decode(buf.buffer, ImageType.Tga);
            break;
        default:
            throw new Error('unknown file type');
    }
    console.info('promise', promise);
    promise.then((data) => {
        console.info('data', data);
        switch (type) {
            case 'png':
                encode(data.buffer, data.width, data.height, ImageType.Png).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            case 'jpg':
                encode(data.buffer, data.width, data.height, ImageType.Jpeg).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            case 'tga':
                encode(data.buffer, data.width, data.height, ImageType.Tga).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            case 'blp':
                Blp1File.encode(data).encode().then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            default:
                throw new Error('unknown file type');
        }
    });
}
