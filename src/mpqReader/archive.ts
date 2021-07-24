import { numberToUint32 } from './common/typecast';
import MpqBlockTable from './blocktable';
import MpqCrypto from './crypto';
import MpqHashTable from './hashtable';
import { searchHeader } from './isarchive';
import * as fs from "fs";

/**
 * MoPaQ archive (MPQ) version 0.
 */
export default class MpqArchive {
  headerOffset: number;
  sectorSize: number;
  c: MpqCrypto;
  hashTable: MpqHashTable;
  blockTable: MpqBlockTable;
  readonly: boolean = false;
  fd: number;

  constructor() {
    this.headerOffset = 0;
    this.sectorSize = 4096;
    this.c = new MpqCrypto();
    this.hashTable = new MpqHashTable(this.c);
    this.blockTable = new MpqBlockTable(this.c);
  }

  /**
   * Load an existing archive.
   * 
   * Note that this clears the archive from whatever it had in it before.
   */
  load(mpqFilePath: string, readonly: boolean = false) {
    const fd = fs.openSync(mpqFilePath, "r");
    this.fd = fd;
    const stat = fs.statSync(mpqFilePath);
    this.readonly = readonly;

    console.info("fileSzie", stat);
    // let fileSize = buffer.byteLength;
    let headerOffset = searchHeader(fd, stat.size);

    if (headerOffset === -1) {
      throw new Error('No MPQ header');
    }

    const buf = Buffer.alloc(8 * 4);
    fs.readSync(fd, buf, 0, buf.length, headerOffset);
    // Read the header.
    let uint32array = new Uint32Array(buf.valueOf().buffer);
    // let headerSize = uint32array[1];
    // let archiveSize = uint32array[2];
    let formatVersionSectorSize = uint32array[3];
    // let formatVersion = formatVersionSectorSize & 0x0000FFFF;
    let hashPos = numberToUint32(uint32array[4] + headerOffset); // Whoever thought of MoonLight, clever!
    let blockPos = numberToUint32(uint32array[5] + headerOffset);
    let hashSize = uint32array[6];
    let blockSize = uint32array[7];

    // There can only be as many or less blocks as there are hashes.
    // Therefore, if the file is reporting too many blocks, cap the actual blocks read to the amount of hashes.
    if (blockSize > hashSize) {
      blockSize = hashSize;
    }

    this.headerOffset = headerOffset;
    this.sectorSize = 512 * (1 << (formatVersionSectorSize >>> 16)); // Generally 4096

    // Read the hash table.
    // Also clears any existing entries.
    // Have to copy the data, because hashPos is not guaranteed to be a multiple of 4.
    const hashTableBuf = Buffer.alloc(hashSize * 16);
    fs.readSync(fd, hashTableBuf, 0, hashSize * 16, hashPos);
    this.hashTable.load(hashTableBuf.valueOf());

    // Read the block table.
    // Also clears any existing entries.
    // Have to copy the data, because blockPos is not guaranteed to be a multiple of 4.
    const blockTableBuf = Buffer.alloc(blockSize * 16);
    fs.readSync(fd, blockTableBuf, 0, blockSize * 16, blockPos);
    this.blockTable.load(blockTableBuf.valueOf());
  }

  get(name: string): Buffer {
    const hash = this.hashTable.get(name);
    if(!hash) {
      return null;
    }
    const block = this.blockTable.entries[hash.blockIndex];
    if(!block) {
      return null;
    }
    const blpBuffer = Buffer.alloc(block.normalSize);
    fs.readSync(this.fd, blpBuffer, 0, blpBuffer.length, block.offset);
    return blpBuffer;
  }
}

// const archive = new MpqArchive();

// archive.load("D:\\Warcraft III\\war3.mpq", true);
