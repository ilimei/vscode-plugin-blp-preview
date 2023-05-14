import * as fs from 'fs';

let binding;
// 简单的做了 win 和 darwin 判断
if (process.platform.startsWith("win")) {
    binding = eval("require")("../bind/win32-x64-binding.node");
} else if(process.platform.startsWith("darwin")) {
    // ! 编译的 M1 binding.node 进行 png 转换时崩溃; 先预加载就可以对 png 进行转换了。
    eval("require")("../bind/darwin-arm64-binding-prepare.node");
    binding = eval("require")("../bind/darwin-arm64-binding.node");
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Image, TYPE_PNG, TYPE_JPEG, TYPE_BLP } = binding;

export default function blp2Image(blpPath: string, distPath: string, type: 'png' | 'jpg' | 'blp' = 'png') {
    const img = new Image();
    const buf = fs.readFileSync(blpPath);
    img.loadFromBuffer(buf, 0, buf.length);
    if (type === 'png') {
        fs.writeFileSync(distPath, img.toBuffer(TYPE_PNG));
    } else if (type === 'blp') {
        fs.writeFileSync(distPath, img.toBuffer(TYPE_BLP));
    } else {
        fs.writeFileSync(distPath, img.toBuffer(TYPE_JPEG));
    }
}
