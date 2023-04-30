import BinaryStream from '../../../../common/binarystream';
import Corner from './corner';

/**
 * war3map.w3e - the environment file.
 */
export default class War3MapW3e {
  version = 0;
  tileset = 'A';
  haveCustomTileset = 0;
  /**
   * 地面贴图组
   */
  groundTilesets: string[] = [];
  /**
   * 悬崖贴图
   */
  cliffTilesets: string[] = [];
  mapSize = new Int32Array(2);
  centerOffset = new Float32Array(2);
  corners: Corner[][] = [];

  load(buffer: ArrayBuffer | Uint8Array): void {
    const stream = new BinaryStream(buffer);

    if (stream.readBinary(4) !== 'W3E!') {
      return;
    }

    this.version = stream.readInt32();
    this.tileset = stream.readBinary(1);
    this.haveCustomTileset = stream.readInt32();

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      this.groundTilesets[i] = stream.readBinary(4);
    }

    for (let i = 0, l = stream.readInt32(); i < l; i++) {
      this.cliffTilesets[i] = stream.readBinary(4);
    }

    stream.readInt32Array(this.mapSize);
    stream.readFloat32Array(this.centerOffset);

    for (let row = 0, rows = this.mapSize[1]; row < rows; row++) {
      this.corners[row] = [];

      for (let column = 0, columns = this.mapSize[0]; column < columns; column++) {
        const corner = new Corner();

        corner.load(stream);

        this.corners[row][column] = corner;
      }
    }
  }


  save(): Uint8Array {
    const stream = new BinaryStream(new ArrayBuffer(this.getByteLength()));

    stream.writeBinary('W3E!');
    stream.writeInt32(this.version);
    stream.writeBinary(this.tileset);
    stream.writeInt32(this.haveCustomTileset);
    stream.writeUint32(this.groundTilesets.length);

    for (const groundTileset of this.groundTilesets) {
      stream.writeBinary(groundTileset);
    }

    stream.writeUint32(this.cliffTilesets.length);

    for (const cliffTileset of this.cliffTilesets) {
      stream.writeBinary(cliffTileset);
    }

    stream.writeInt32Array(this.mapSize);
    stream.writeFloat32Array(this.centerOffset);

    for (const row of this.corners) {
      for (const corner of row) {
        corner.save(stream);
      }
    }

    return stream.uint8array;
  }

  getByteLength(): number {
    return 37 + (this.groundTilesets.length * 4) + (this.cliffTilesets.length * 4) + (this.mapSize[0] * this.mapSize[1] * 7);
  }

  /**
   * Is the tile at the given column and row water?
   */
  isWater(column: number, row: number): number {
    const corners = this.corners;

    return corners[row][column].water || corners[row][column + 1].water || corners[row + 1][column].water || corners[row + 1][column + 1].water;
  }

  /**
   * Is the corner at the given column and row a cliff?
   */
  isCliff(column: number, row: number): boolean {
    const [columns, rows] = this.mapSize;
    if (column < 1 || column > columns - 2 || row < 1 || row > rows - 2) {
      return false;
    }

    const corners = this.corners;
    const bottomLeft = corners[row][column].layerHeight;
    const bottomRight = corners[row][column + 1].layerHeight;
    const topLeft = corners[row + 1][column].layerHeight;
    const topRight = corners[row + 1][column + 1].layerHeight;

    return bottomLeft !== bottomRight || bottomLeft !== topLeft || bottomLeft !== topRight;
  }

  /**
   * Get the ground texture of a corner, whether it's normal ground, a cliff, or a blighted corner.
   */
  cornerTexture(column: number, row: number, tilesets: any[], cliffTilesets: any[]): number {
    const corners = this.corners;
    const columns = this.mapSize[0] - 1;
    const rows = this.mapSize[1] - 1;

    for (let y = -1; y < 1; y++) {
      for (let x = -1; x < 1; x++) {
        if (column + x > 0 && column + x < columns - 1 && row + y > 0 && row + y < rows - 1) {
          if (this.isCliff(column + x, row + y)) {
            let texture = corners[row + y][column + x].cliffTexture;

            if (texture === 15) {
              texture = 1;
            }

            return this.cliffGroundIndex(texture, tilesets, cliffTilesets);
          }
        }
      }
    }

    const corner = corners[row][column];

    // Is this corner blighted?
    // if (corner.blight) {
    //   return this.blightTextureIndex;
    // }

    return corner.groundTexture;
  }

  /**
   * Given a cliff index, get its ground texture index.
   * This is an index into the tilset textures.
   */
  cliffGroundIndex(whichCliff: number, tilesets: any[], cliffTilesets: any[]): number {
    const whichTileset = cliffTilesets[whichCliff].string('groundTile');

    for (let i = 0, l = tilesets.length; i < l; i++) {
      if (tilesets[i].string('tileID') === whichTileset) {
        return i;
      }
    }

    return 0;
  }
}
