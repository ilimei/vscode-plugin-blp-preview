import { inflate } from 'pako';
import MpqArchive from "./archive";
import explode from './explode';
import decodeHuffman from './huffman';
import decompressADPCM from './adpcm';
import {
  COMPRESSION_ADPCM_MONO, COMPRESSION_ADPCM_STEREO, COMPRESSION_BZIP2, COMPRESSION_DEFLATE, COMPRESSION_HUFFMAN,
  COMPRESSION_IMPLODE, FILE_COMPRESSED, FILE_ENCRYPTED, FILE_EXISTS, FILE_IMPLODE, FILE_SINGLE_UNIT
} from "./constants";

/**
 * A block.
 */
export default class Block {
  offset: number = 0;
  compressedSize: number = 0;
  normalSize: number = 0;
  flags: number = 0;

  load(bytes: Uint32Array) {
    this.offset = bytes[0];
    this.compressedSize = bytes[1];
    this.normalSize = bytes[2];
    this.flags = bytes[3];
  }

  save(bytes: Uint32Array) {
    bytes[0] = this.offset;
    bytes[1] = this.compressedSize;
    bytes[2] = this.normalSize;
    bytes[3] = this.flags;
  }

  decode(name: string, data: Uint8Array, archive: MpqArchive): Uint8Array {
    const c = archive.c;
    const encryptionKey = c.computeFileKey(name, this);
    const flags = this.flags;
    if (flags === FILE_EXISTS) {
      return data.slice(0, this.normalSize);
    }

    if (flags & FILE_SINGLE_UNIT) {
      // One buffer of possibly encrypted and/or compressed data.
      // Read the sector
      let sector: Uint8Array;
      // If this block is encrypted, decrypt the sector.
      if (flags & FILE_ENCRYPTED) {
        sector = c.decryptBlock(data.slice(0, this.compressedSize), encryptionKey);
      } else {
        sector = data.subarray(0, this.compressedSize);
      }

      // If this block is compressed, decompress the sector.
      // Otherwise, copy the sector as-is.
      if (flags & FILE_COMPRESSED) {
        sector = this.decompressSector(name, sector, this.normalSize);
      }

      return sector;
    }

    // One or more sectors of possibly encrypted and/or compressed data.
    const sectorCount = Math.ceil(this.normalSize / archive.sectorSize);

    // Alocate a buffer for the uncompressed block size
    const out: Uint8Array[] = [];
    // const buffer = new Uint8Array(this.normalSize);

    // Get the sector offsets
    let sectorOffsets = new Uint32Array(data.buffer, 0, sectorCount + 1);

    // If this file is encrypted, copy the sector offsets and decrypt them.
    if (flags & FILE_ENCRYPTED) {
      sectorOffsets = c.decryptBlock(sectorOffsets.slice(), encryptionKey - 1);
    }

    let start = sectorOffsets[0];
    let end = sectorOffsets[1];
    let offset = 0;

    for (let i = 0; i < sectorCount; i++) {
      let sector;

      // If this file is encrypted, copy the sector and decrypt it.
      // Otherwise a view can be used directly.
      if (flags & FILE_ENCRYPTED) {
        sector = c.decryptBlock(data.slice(start, end), encryptionKey + i);
      } else {
        sector = data.subarray(start, end);
      }

      // Decompress the sector
      if (flags & FILE_COMPRESSED) {
        let uncompressedSize = archive.sectorSize;

        // If this is the last sector, its uncompressed size might not be the size of a sector.
        if (this.normalSize - offset < uncompressedSize) {
          uncompressedSize = this.normalSize - offset;
        }

        sector = this.decompressSector(name, sector, uncompressedSize);
      }

      // Some sectors have this flags instead of the compression flag + algorithm byte.
      if (flags & FILE_IMPLODE) {
        sector = explode(sector);
      }

      // Add the sector bytes to the buffer
      // buffer.set(sector, offset);
      out.push(sector);
      offset += sector.byteLength;

      // Prepare for the next sector
      if (i < sectorCount) {
        start = end;
        end = sectorOffsets[i + 2];
      }
    }

    function merge(arrays: Uint8Array[]) {
      // 计算新数组的总长度
      const totalLength = arrays.reduce((acc, curr) => acc + curr.length, 0);

      // 创建新的 Uint8Array 对象
      const mergedArray = new Uint8Array(totalLength);

      // 将原始数组的内容复制到新数组中
      let offset = 0;
      for (let i = 0; i < arrays.length; i++) {
        mergedArray.set(arrays[i], offset);
        offset += arrays[i].length;
      }

      // 返回合并后的数组
      return mergedArray;
    }

    return merge(out);
  }

  decompressSector(name: string, bytes: Uint8Array, decompressedSize: number): Uint8Array {
    // If the size of the data is the same as its decompressed size, it's not compressed.
    if (bytes.byteLength === decompressedSize) {
      return bytes;
    } else {
      const compressionMask = bytes[0];

      if (compressionMask & COMPRESSION_BZIP2) {
        throw new Error(`File ${name}: compression type 'bzip2' not supported`);
      }

      if (compressionMask & COMPRESSION_IMPLODE) {
        try {
          bytes = explode(bytes.subarray(1));
        } catch (e) {
          throw new Error(`File ${name}: failed to decompress with 'explode': ${e}`);
        }
      }

      if (compressionMask & COMPRESSION_DEFLATE) {
        try {
          bytes = inflate(bytes.subarray(1));
        } catch (e) {
          throw new Error(`File ${name}: failed to decompress with 'zlib': ${e}`);
        }
      }

      if (compressionMask & COMPRESSION_HUFFMAN) {
        try {
          bytes = decodeHuffman(bytes.subarray(1));
        } catch (e) {
          throw new Error(`File ${name}: failed to decompress with 'huffman': ${e}`);
        }
        // throw new Error(`File ${name}: compression type 'huffman' not supported`);
      }

      if (compressionMask & COMPRESSION_ADPCM_STEREO) {
        try {
          bytes = decompressADPCM(bytes, 2, decompressedSize);
        } catch (e) {
          console.error(e);
          throw new Error(`File ${name}: compression type 'adpcm stereo' not supported`);
        }
      }

      if (compressionMask & COMPRESSION_ADPCM_MONO) {
        try {
          bytes = decompressADPCM(bytes, 1, decompressedSize);
        } catch (e) {
          console.error(e);
          throw new Error(`File ${name}: compression type 'adpcm mono' not supported`);
        }
      }

      return bytes;
    }
  }
}
