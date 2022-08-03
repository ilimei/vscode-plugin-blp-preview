window.blp2 = (function () {
    var JPEG_TYPE = 0;
    var NORMAL_TYPE = 1;
    // 1: Uncompressed, 2: DXT compression, 3: Uncompressed BGRA
    var UNCOMPRESSED = 1;
    var DXT_COMPRESSION = 2;
    var UNCOMPRESSED_BGRA = 3;
    var BLP_ENCODING_DXT = 2;
    var BLP_ALPHA_DEPTH_0 = 0;
    var BLP_ALPHA_DEPTH_1 = 1;
    var BLP_ALPHA_DEPTH_4 = 4;
    var BLP_ALPHA_DEPTH_8 = 8;
    var BLP_ALPHA_ENCODING_DXT1 = 0;
    var BLP_ALPHA_ENCODING_DXT3 = 1;
    var BLP_ALPHA_ENCODING_DXT5 = 7;
    var BLP_FORMAT_JPEG = 0;
    var BLP_FORMAT_PALETTED_NO_ALPHA = ((UNCOMPRESSED << 16) | (BLP_ALPHA_DEPTH_0 << 8));
    var BLP_FORMAT_PALETTED_ALPHA_1 = ((UNCOMPRESSED << 16) | (BLP_ALPHA_DEPTH_1 << 8));
    var BLP_FORMAT_PALETTED_ALPHA_4 = ((UNCOMPRESSED << 16) | (BLP_ALPHA_DEPTH_4 << 8));
    var BLP_FORMAT_PALETTED_ALPHA_8 = ((UNCOMPRESSED << 16) | (BLP_ALPHA_DEPTH_8 << 8));
    var BLP_FORMAT_RAW_BGRA = (UNCOMPRESSED_BGRA << 16);
    var BLP_FORMAT_DXT1_NO_ALPHA = (BLP_ENCODING_DXT << 16) | (BLP_ALPHA_DEPTH_0 << 8) | BLP_ALPHA_ENCODING_DXT1;
    var BLP_FORMAT_DXT1_ALPHA_1 = (BLP_ENCODING_DXT << 16) | (BLP_ALPHA_DEPTH_1 << 8) | BLP_ALPHA_ENCODING_DXT1;
    var BLP_FORMAT_DXT3_ALPHA_4 = (BLP_ENCODING_DXT << 16) | (BLP_ALPHA_DEPTH_4 << 8) | BLP_ALPHA_ENCODING_DXT3;
    var BLP_FORMAT_DXT3_ALPHA_8 = (BLP_ENCODING_DXT << 16) | (BLP_ALPHA_DEPTH_8 << 8) | BLP_ALPHA_ENCODING_DXT3;
    var BLP_FORMAT_DXT5_ALPHA_8 = (BLP_ENCODING_DXT << 16) | (BLP_ALPHA_DEPTH_8 << 8) | BLP_ALPHA_ENCODING_DXT5;
    var dxt4to8 = convertBitRange(4, 8);
    var dxt5to8 = convertBitRange(5, 8);
    var dxt6to8 = convertBitRange(6, 8);
    var dx1colors = new Uint8Array(16);
    var dx3colors = new Uint8Array(12);
    var dx5alphas = new Uint8Array(8);
    var red = new Uint8Array(8);
    var green = new Uint8Array(8);
    function convertBitRange(fromBits, toBits) {
        return ((1 << toBits) - 1) / ((1 << fromBits) - 1);
    }
    function dx1Colors(out, color0, color1) {
        var r0 = ((color0 >> 11) & 31) * dxt5to8;
        var g0 = ((color0 >> 5) & 63) * dxt6to8;
        var b0 = (color0 & 31) * dxt5to8;
        var r1 = ((color1 >> 11) & 31) * dxt5to8;
        var g1 = ((color1 >> 5) & 63) * dxt6to8;
        var b1 = (color1 & 31) * dxt5to8;
        // Minimum and maximum colors.
        out[0] = r0;
        out[1] = g0;
        out[2] = b0;
        out[3] = 255;
        out[4] = r1;
        out[5] = g1;
        out[6] = b1;
        out[7] = 255;
        // Interpolated colors.
        if (color0 > color1) {
            out[8] = (5 * r0 + 3 * r1) >> 3;
            out[9] = (5 * g0 + 3 * g1) >> 3;
            out[10] = (5 * b0 + 3 * b1) >> 3;
            out[11] = 255;
            out[12] = (5 * r1 + 3 * r0) >> 3;
            out[13] = (5 * g1 + 3 * g0) >> 3;
            out[14] = (5 * b1 + 3 * b0) >> 3;
            out[15] = 255;
        }
        else {
            out[8] = (r0 + r1) >> 1;
            out[9] = (g0 + g1) >> 1;
            out[10] = (b0 + b1) >> 1;
            out[11] = 255;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 0;
        }
    }
    function dx3Colors(out, color0, color1) {
        var r0 = ((color0 >> 11) & 31) * dxt5to8;
        var g0 = ((color0 >> 5) & 63) * dxt6to8;
        var b0 = (color0 & 31) * dxt5to8;
        var r1 = ((color1 >> 11) & 31) * dxt5to8;
        var g1 = ((color1 >> 5) & 63) * dxt6to8;
        var b1 = (color1 & 31) * dxt5to8;
        // Minimum and maximum colors.
        out[0] = r0;
        out[1] = g0;
        out[2] = b0;
        out[3] = r1;
        out[4] = g1;
        out[5] = b1;
        // Interpolated colors.
        out[6] = (5 * r0 + 3 * r1) >> 3;
        out[7] = (5 * g0 + 3 * g1) >> 3;
        out[8] = (5 * b0 + 3 * b1) >> 3;
        out[9] = (5 * r1 + 3 * r0) >> 3;
        out[10] = (5 * g1 + 3 * g0) >> 3;
        out[11] = (5 * b1 + 3 * b0) >> 3;
    }
    function dx5Alphas(out, alpha0, alpha1) {
        // Minimum and maximum alphas.
        out[0] = alpha0;
        out[1] = alpha1;
        // Interpolated alphas.
        if (alpha0 > alpha1) {
            out[2] = (54 * alpha0 + 9 * alpha1) >> 6;
            out[3] = (45 * alpha0 + 18 * alpha1) >> 6;
            out[4] = (36 * alpha0 + 27 * alpha1) >> 6;
            out[5] = (27 * alpha0 + 36 * alpha1) >> 6;
            out[6] = (18 * alpha0 + 45 * alpha1) >> 6;
            out[7] = (9 * alpha0 + 54 * alpha1) >> 6;
        }
        else {
            out[2] = (12 * alpha0 + 3 * alpha1) >> 4;
            out[3] = (9 * alpha0 + 6 * alpha1) >> 4;
            out[4] = (6 * alpha0 + 9 * alpha1) >> 4;
            out[5] = (3 * alpha0 + 12 * alpha1) >> 4;
            out[6] = 0;
            out[7] = 255;
        }
    }
    function rgColors(out, color0, color1) {
        // Minimum and maximum red colors.
        out[0] = color0;
        out[1] = color1;
        // Interpolated red colors.
        if (color0 > color1) {
            out[2] = (6 * color0 + 1 * color1) / 7;
            out[3] = (5 * color0 + 2 * color1) / 7;
            out[4] = (4 * color0 + 3 * color1) / 7;
            out[5] = (3 * color0 + 4 * color1) / 7;
            out[6] = (2 * color0 + 5 * color1) / 7;
            out[7] = (1 * color0 + 6 * color1) / 7;
        }
        else {
            out[2] = (4 * color0 + 1 * color1) / 5;
            out[3] = (3 * color0 + 2 * color1) / 5;
            out[4] = (2 * color0 + 3 * color1) / 5;
            out[5] = (1 * color0 + 4 * color1) / 5;
            out[6] = 0;
            out[7] = 1;
        }
    }
    /**
     * Decodes DXT1 data to a Uint8Array typed array with 8-8-8-8 RGBA bits.
     *
     * DXT1 is also known as BC1.
     */
    function decodeDxt1(src, width, height, img) {
        for (var blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
            for (var blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
                var i = 8 * (blockY * blockWidth + blockX);
                // Get the color values.
                dx1Colors(dx1colors, src.getUint8(i) + 256 * src.getUint8(i + 1), src.getUint8(i + 2) + 256 * src.getUint8(i + 3));
                // The offset to the first pixel in the destination.
                var dstI = (blockY * 16) * width + blockX * 16;
                // All 32 color bits.
                var bits = src.getUint8(i + 4) | (src.getUint8(i + 5) << 8) | (src.getUint8(i + 6) << 16) | (src.getUint8(i + 7) << 24);
                for (var row = 0; row < 4; row++) {
                    var rowOffset = row * 8;
                    var dstOffset = dstI + row * width * 4;
                    for (var column = 0; column < 4; column++) {
                        var dstIndex = dstOffset + column * 4;
                        var colorOffset = ((bits >> (rowOffset + column * 2)) & 3) * 4;
                        img.data[dstIndex + 0] = dx1colors[colorOffset + 0];
                        img.data[dstIndex + 1] = dx1colors[colorOffset + 1];
                        img.data[dstIndex + 2] = dx1colors[colorOffset + 2];
                        img.data[dstIndex + 3] = dx1colors[colorOffset + 3];
                    }
                }
            }
        }
        return img;
    }
    /**
     * Decodes DXT3 data to a Uint8Array typed array with 8-8-8-8 RGBA bits.
     *
     * DXT3 is also known as BC2.
     */
    function decodeDxt3(src, width, height, img) {
        var rowBytes = width * 4;
        for (var blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
            for (var blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
                var i = 16 * (blockY * blockWidth + blockX);
                // Get the color values.
                dx3Colors(dx3colors, src.getUint8(i + 8) + 256 * src.getUint8(i + 9), src.getUint8(i + 10) + 256 * src.getUint8(i + 11));
                var dstI = (blockY * 16) * width + blockX * 16;
                for (var row = 0; row < 4; row++) {
                    // Get 16 bits of alpha indices.
                    var alphaBits = src.getUint8(i + row * 2) + 256 * src.getUint8(i + 1 + row * 2);
                    // Get 8 bits of color indices.
                    var colorBits = src.getUint8(i + 12 + row);
                    for (var column = 0; column < 4; column++) {
                        var dstIndex = dstI + column * 4;
                        var colorIndex = ((colorBits >> (column * 2)) & 3) * 3;
                        img.data[dstIndex + 0] = dx3colors[colorIndex + 0];
                        img.data[dstIndex + 1] = dx3colors[colorIndex + 1];
                        img.data[dstIndex + 2] = dx3colors[colorIndex + 2];
                        img.data[dstIndex + 3] = ((alphaBits >> (column * 4)) & 0xf) * dxt4to8;
                    }
                    dstI += rowBytes;
                }
            }
        }
        console.info(img);
        return img;
    }
    /**
     * Decodes DXT5 data to a Uint8Array typed array with 8-8-8-8 RGBA bits.
     *
     * DXT5 is also known as BC3.
     */
    function decodeDxt5(src, width, height, img) {
        var rowBytes = width * 4;
        for (var blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
            for (var blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
                var i = 16 * (blockY * blockWidth + blockX);
                // Get the alpha values.
                dx5Alphas(dx5alphas, src.getUint8(i), src.getUint8(i + 1));
                // Get the color values.
                dx3Colors(dx3colors, src.getUint8(i + 8) + 256 * src.getUint8(i + 9), src.getUint8(i + 10) + 256 * src.getUint8(i + 11));
                // The offset to the first pixel in the destination.
                var dstI = (blockY * 16) * width + blockX * 16;
                // The outer loop is only needed because JS bitwise operators only work on 32bit integers, while the alpha flags contain 48 bits.
                // Processing is instead done in two blocks, where each one handles 24 bits, or two rows of 4 pixels.
                for (var block = 0; block < 2; block++) {
                    var alphaOffset = i + 2 + block * 3;
                    var colorOffset = i + 12 + block * 2;
                    // 24 alpha bits.
                    var alphaBits = src.getUint8(alphaOffset) + 256 * (src.getUint8(alphaOffset + 1) + 256 * src.getUint8(alphaOffset + 2));
                    // Go over two rows.
                    for (var row = 0; row < 2; row++) {
                        var colorBits = src.getUint8(colorOffset + row);
                        // Go over four columns.
                        for (var column = 0; column < 4; column++) {
                            var dstIndex = dstI + column * 4;
                            var colorIndex = ((colorBits >> (column * 2)) & 3) * 3;
                            var alphaIndex = (alphaBits >> (row * 12 + column * 3)) & 7;
                            // Set the pixel.
                            img.data[dstIndex + 0] = dx3colors[colorIndex + 0];
                            img.data[dstIndex + 1] = dx3colors[colorIndex + 1];
                            img.data[dstIndex + 2] = dx3colors[colorIndex + 2];
                            img.data[dstIndex + 3] = dx5alphas[alphaIndex];
                        }
                        // Next row.
                        dstI += rowBytes;
                    }
                }
            }
        }
        return img;
    }
    /**
     * Decodes RGTC data to a Uint8Array typed array with 8-8 RG bits.
     *
     * RGTC is also known as BC5, ATI2, and 3Dc.
     */
    function decodeRgtc(src, width, height) {
        var dst = new Uint8Array(width * height * 2);
        var rowBytes = width * 2;
        for (var blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
            for (var blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
                var i = 16 * (blockY * blockWidth + blockX);
                // Get the red colors.
                rgColors(red, src[i], src[i + 1]);
                // Get the green colors.
                rgColors(green, src[i + 8], src[i + 9]);
                // The offset to the first pixel in the destination.
                var dstI = (blockY * 8) * width + blockX * 8;
                // Split to two blocks of two rows, because there are 48 color bits.
                for (var block = 0; block < 2; block++) {
                    var blockOffset = i + block * 3;
                    // Get 24 bits of the color indices.
                    var redbits = src[blockOffset + 2] + 256 * (src[blockOffset + 3] + 256 * src[blockOffset + 4]);
                    var greenbits = src[blockOffset + 10] + 256 * (src[blockOffset + 11] + 256 * src[blockOffset + 12]);
                    for (var row = 0; row < 2; row++) {
                        var rowOffset = row * 4;
                        for (var column = 0; column < 4; column++) {
                            var dstOffset = dstI + column * 2;
                            var shifts = 3 * (rowOffset + column);
                            dst[dstOffset + 1] = red[(redbits >> shifts) & 7];
                            dst[dstOffset + 2] = green[(greenbits >> shifts) & 7];
                        }
                        // Next row.
                        dstI += rowBytes;
                    }
                }
            }
        }
        return dst;
    }
    function keyword(view, offset) {
        return String.fromCharCode(view.getUint8(offset), view.getUint8(offset + 1), view.getUint8(offset + 2), view.getUint8(offset + 3));
    }
    function uint32(view, offset) {
        return view.getUint32(offset, true);
    }
    function uint32Array(view, offset, size) {
        return new Array(size).fill(0).map(function (_, index) {
            return uint32(view, offset + index * 4);
        });
    }
    function uint8(view, offset) {
        return view.getUint8(offset);
    }
    function readBGRA(view, offset) {
        return [view.getUint8(offset), view.getUint8(offset + 1), view.getUint8(offset + 2), view.getUint8(offset + 3)];
    }
    function readBGRAArray(view, offset, size) {
        return new Array(size).fill(0).map(function (_, index) {
            return readBGRA(view, offset + index * 4);
        });
    }
    function blpFormat(image) {
        if (image.type === JPEG_TYPE) {
            return BLP_FORMAT_JPEG;
        }
        if (image.encoding === UNCOMPRESSED) {
            // BLP_FORMAT_PALETTED
            return ((image.encoding << 16) | (image.alphaDepth << 8));
        }
        else if (image.encoding === UNCOMPRESSED_BGRA) {
            // BLP_FORMAT_RAW_BGRA
            return (image.encoding << 16);
        }
        // BLP_FORMAT_DXT
        return ((image.encoding << 16) | (image.alphaDepth << 8) | image.alphaEncoding);
    }
    function decode(arrayBuffer) {
        var view = new DataView(arrayBuffer);
        var magic = keyword(view, 0);
        if (magic !== 'BLP2') {
            throw new Error('Not a blp2 image');
        }
        var image = {
            type: uint32(view, 4),
            encoding: uint8(view, 8),
            alphaDepth: uint8(view, 9),
            alphaEncoding: uint8(view, 10),
            mipLevels: uint8(view, 11),
            width: uint32(view, 12),
            height: uint32(view, 16),
            offsets: uint32Array(view, 20, 16),
            lengths: uint32Array(view, 20 + 16 * 4, 16),
            palette: readBGRAArray(view, 20 + 32 * 4, 256)
        };
        var mipLevel = image.mipLevels - 1;
        var width = image.width >> mipLevel;
        var height = image.height >> mipLevel;
        var offset = image.offsets[mipLevel];
        var size = image.lengths[mipLevel];
        console.info(blpFormat(image));
        switch (blpFormat(image)) {
            case BLP_FORMAT_PALETTED_NO_ALPHA:
                return blp2_convert_paletted_no_alpha(view, offset, width, height, image);
            case BLP_FORMAT_PALETTED_ALPHA_1:
                return blp2_convert_paletted_alpha1(view, offset, width, height, image);
            case BLP_FORMAT_PALETTED_ALPHA_4:
                return blp2_convert_paletted_alpha4(view, offset, width, height, image);
            case BLP_FORMAT_PALETTED_ALPHA_8:
                return blp2_convert_paletted_alpha8(view, offset, width, height, image);
            case BLP_FORMAT_RAW_BGRA:
                return blp2_convert_raw_bgra(view, offset, width, height, image);
            case BLP_FORMAT_DXT1_NO_ALPHA:
            case BLP_FORMAT_DXT1_ALPHA_1:
                return blp2_convert_dxt(view, offset, size, width, height, image);
            case BLP_FORMAT_DXT3_ALPHA_4:
                console.info('BLP_FORMAT_DXT3_ALPHA_4');
                return;
            case BLP_FORMAT_DXT3_ALPHA_8:
                return blp2_convert_dxt3_alpha8(view, offset, size, width, height, image);
            case BLP_FORMAT_DXT5_ALPHA_8:
                return blp2_convert_dxt5_alpha8(view, offset, size, width, height, image);
        }
        console.info(image);
    }
    // node.js have no native ImageData
    function createImageData(width, height) {
        if (typeof ImageData !== 'undefined') {
            return new ImageData(width, height);
        }
        else {
            return {
                width: width,
                height: height,
                data: new Uint8ClampedArray(width * height * 4)
            };
        }
    }
    function blp2_convert_paletted_no_alpha(view, offset, width, height, image) {
        var img = createImageData(width, height);
        var imgIndex = 0;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var data = view.getUint8(offset++);
                var bgra = image.palette[data];
                img.data[imgIndex++] = bgra[2];
                img.data[imgIndex++] = bgra[1];
                img.data[imgIndex++] = bgra[0];
                img.data[imgIndex++] = 0xFF;
            }
        }
        return img;
    }
    function blp2_convert_paletted_alpha1(view, offset, width, height, image) {
        var img = createImageData(width, height);
        var imgIndex = 0;
        var alphaOffset = offset + width * height;
        var counter = 0;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var data = view.getUint8(offset++);
                var bgra = image.palette[data];
                img.data[imgIndex++] = bgra[2];
                img.data[imgIndex++] = bgra[1];
                img.data[imgIndex++] = bgra[0];
                img.data[imgIndex++] = (uint8(view, alphaOffset) & (1 << counter) ? 0xFF : 0x00);
                counter++;
                if (counter === 8) {
                    alphaOffset++;
                    counter = 0;
                }
            }
        }
        return img;
    }
    function blp2_convert_paletted_alpha4(view, offset, width, height, image) {
        var img = createImageData(width, height);
        var imgIndex = 0;
        var alphaOffset = offset + width * height;
        var counter = 0;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var data = view.getUint8(offset++);
                var bgra = image.palette[data];
                img.data[imgIndex++] = bgra[2];
                img.data[imgIndex++] = bgra[1];
                img.data[imgIndex++] = bgra[0];
                var alpha = (uint8(view, alphaOffset) >> counter) & 0xF;
                img.data[imgIndex++] = (alpha << 4) | alpha;
                counter += 4;
                if (counter === 8) {
                    alphaOffset++;
                    counter = 0;
                }
            }
        }
        return img;
    }
    function blp2_convert_paletted_alpha8(view, offset, width, height, image) {
        var img = createImageData(width, height);
        var imgIndex = 0;
        var alphaOffset = offset + width * height;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var data = view.getUint8(offset++);
                var bgra = image.palette[data];
                img.data[imgIndex++] = bgra[2];
                img.data[imgIndex++] = bgra[1];
                img.data[imgIndex++] = bgra[0];
                img.data[imgIndex++] = uint8(view, alphaOffset++);
            }
        }
        return img;
    }
    function blp2_convert_raw_bgra(view, offset, width, height, image) {
        var img = createImageData(width, height);
        var imgIndex = 0;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var b = view.getUint8(offset++);
                var g = view.getUint8(offset++);
                var r = view.getUint8(offset++);
                var a = view.getUint8(offset++);
                img.data[imgIndex++] = r;
                img.data[imgIndex++] = g;
                img.data[imgIndex++] = b;
                img.data[imgIndex++] = a;
            }
        }
        return img;
    }
    function blp2_convert_dxt(view, offset, size, width, height, image) {
        var dxtData = new DataView(view.buffer, offset, size);
        return decodeDxt1(dxtData, width, height, createImageData(width, height));
    }
    function blp2_convert_dxt3_alpha8(view, offset, size, width, height, image) {
        var dxtData = new DataView(view.buffer, offset, size);
        return decodeDxt3(dxtData, width, height, createImageData(width, height));
    }
    function blp2_convert_dxt5_alpha8(view, offset, size, width, height, image) {
        var dxtData = new DataView(view.buffer, offset, size);
        return decodeDxt5(dxtData, width, height, createImageData(width, height));
    }
    return decode;
})();
