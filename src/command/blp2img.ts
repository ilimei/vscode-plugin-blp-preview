import * as fs from 'fs';
import * as path from 'path';

const { Image, TYPE_PNG, TYPE_JPEG, TYPE_BLP } = eval('require')('../bind/binding.node');

export default function blp2Image(blpPath: string, type: 'png' | 'jpg' | 'blp' = 'png') {
    const dirName = path.dirname(blpPath);
    const fileName = path.basename(blpPath);
    const img = new Image();
    const buf = fs.readFileSync(blpPath);
    img.loadFromBuffer(buf, 0, buf.length);
    if (type === 'png') {
        fs.writeFileSync(path.join(dirName, fileName + '.png'), img.toBuffer(TYPE_PNG));
    } else if (type === 'blp') {
        fs.writeFileSync(path.join(dirName, fileName + '.blp'), img.toBuffer(TYPE_BLP));
    } else {
        fs.writeFileSync(path.join(dirName, fileName + '.jpg'), img.toBuffer(TYPE_JPEG));
    }
}
