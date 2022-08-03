import * as fs from "fs";

/**
 * Search for the MPQ header - MPQ\x1A.
 * The header can be on any 512 bytes boundry offset.
 */
export function searchHeader(fd: number, fileSize: number) {
  let offset = -1;
  const buf = Buffer.alloc(4);

  for (let i = 0, l = Math.ceil(fileSize / 512); i < l && i < 100; i++) {
    let base = i * 512;
    fs.readSync(fd, buf, 0, 4, base);
    // Test 'MPQ\x1A'.
    if (buf[0] === 77 && buf[1] === 80 && buf[2] === 81 && buf[3] === 26) {
      return base;
    }
  }

  return offset;
}

/**
 * Checks whether the given buffer is either a Warcraft 3 map or otherwise a generic MPQ archive.
 */
export function isArchive(bytes: Uint8Array) {
  // Check for the map identifier - HM3W
  if (bytes[0] === 72 && bytes[1] === 77 && bytes[2] === 51 && bytes[3] === 87) {
    return true;
  }

  return -1;
  // // Look for an MPQ header.
  // return searchHeader(bytes) !== -1;
}
