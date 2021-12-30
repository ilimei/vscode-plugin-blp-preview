import BinaryStream from '../../common/binarystream';

enum Flags {
  // 边界
  MAP_BOUNDARY = 0x4000,
  // 斜坡
  RAMP = 0b0001_0000,
  // 枯萎
  BLIGHT = 0b0010_0000,
  // 水面
  WATER = 0b0100_0000,
  // 边界 相机的边界
  BOUNDARY = 0b1000_0000
}

/**
 * A tile corner.
 */
export default class Corner {
  /**
   * 地面高度
   */
  groundHeight = 0;
  waterHeight = 0;
  mapEdge = 0;
  ramp = 0;
  // 地面是否枯萎
  blight = 0;
  water = 0;
  boundary = 0;
  /**
   * 地面地图 0 - 15 分别指向不同的风格贴图
   */
  groundTexture = 0;
  /**
   * 随机贴图 0 - 20 
   */
  groundVariation = 0;
  /**
   * 悬崖贴图 0 - 15 分别指向不同的风格贴图
   */
  cliffTexture = 0;
  /**
   * 悬崖贴图随机 0 - 6
   */
  cliffVariation = 0;


  layerHeight = 0;

  load(stream: BinaryStream): void {
    this.groundHeight = (stream.readInt16() - 0x2000) / 512;

    const waterAndEdge = stream.readInt16();

    this.waterHeight = ((waterAndEdge & 0x3FFF) - 0x2000) / 512;
    this.mapEdge = waterAndEdge & Flags.MAP_BOUNDARY;

    const textureAndFlags = stream.readUint8();

    this.ramp = textureAndFlags & Flags.RAMP;
    this.blight = textureAndFlags & Flags.BLIGHT;
    this.water = textureAndFlags & Flags.WATER;
    this.boundary = textureAndFlags & Flags.BOUNDARY;

    this.groundTexture = textureAndFlags & 0x0f;

    const variation = stream.readUint8();

    this.cliffVariation = (variation & 0b1110_0000) >>> 5;
    this.groundVariation = variation & 0b0001_1111;

    const cliffTextureAndLayer = stream.readUint8();

    this.cliffTexture = (cliffTextureAndLayer & 0b1111_0000) >>> 4;
    this.layerHeight = cliffTextureAndLayer & 0b0000_1111;
  }

  save(stream: BinaryStream): void {
    stream.writeInt16(this.groundHeight * 512 + 8192);
    stream.writeInt16(this.waterHeight * 512 + 8192 + this.mapEdge << 14);
    stream.writeUint8((this.ramp << 4) | (this.blight << 5) | (this.water << 6) | (this.boundary << 7) | this.groundTexture);
    stream.writeUint8((this.cliffVariation << 5) | this.groundVariation);
    stream.writeUint8((this.cliffTexture << 4) + this.layerHeight);
  }
}
