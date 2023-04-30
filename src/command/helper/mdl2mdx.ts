import * as fs from 'fs';
import { parseMDX, parseMDL, generateMDL, generateMDX } from 'war3-model';

export function mdl2mdx(srcPath: string, distPath: string) {
    const model = parseMDL(fs.readFileSync(srcPath).toString());
    fs.writeFileSync(distPath, Buffer.from(generateMDX(model)));
}

export function mdx2mdl(buf: Uint8Array, distPath: string) {
    const model = parseMDX(new Uint8Array(buf).buffer);
    fs.writeFileSync(distPath, generateMDL(model));
}
