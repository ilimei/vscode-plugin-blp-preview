import * as fs from 'fs';
import * as path from 'path';
import { Blp1File, encode, decode, ImageType, ImageRgba } from 'image-wasm-for-war3';

export default function blp2Image(blpPath: string, distPath: string, type: 'png' | 'jpg' | 'tga' | 'blp' = 'png') {
    const buf = fs.readFileSync(blpPath);
    let promise: Promise<ImageRgba> | null = null;
    const ext = path.extname(blpPath).toLowerCase();

    console.info(ext, type);
    switch (ext) {
        case '.blp':
            try {
                promise = decode(buf, ImageType.Blp1);
            } catch (e) {
                console.error(e);
            }
            break;
        case '.png':
            promise = decode(buf, ImageType.Png);
            break;
        case '.jpg':
        case '.jpeg':
            promise = decode(buf, ImageType.Jpeg);
            break;
        case '.tga':
            promise = decode(buf, ImageType.Tga);
            break;
        default:
            throw new Error('unknown file type');
    }

    console.info(promise);
    promise.then((img) => {
        console.info(img);
        switch (type) {
            case 'png':
                encode(img, ImageType.Png).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            case 'jpg':
                encode(img, ImageType.Jpeg).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            case 'tga':
                encode(img, ImageType.Tga).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            case 'blp':
                encode(img, ImageType.Blp1).then((buf) => {
                    fs.writeFileSync(distPath, Buffer.from(buf));
                });
                break;
            default:
                throw new Error('unknown file type');
        }
    });
}
