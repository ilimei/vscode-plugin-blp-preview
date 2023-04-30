import War3MapW3e from "./w3x-reader/w3e/w3e";
import Corner from './w3x-reader/w3e/corner';
import { MappedData, MappedDataRow } from "./w3x-reader/MappedData";
import getCliffVariation from "./variations";
import unique from "../../common/arrayunique";
import groundVert from './shaders/ground.vert';
import groundFrag from './shaders/ground.frag';
import cliffsVert from './shaders/cliffs.vert';
import cliffsFrag from './shaders/cliffs.frag';
import waterVert from './shaders/water.vert';
import waterFrag from './shaders/water.frag';
import TerrainModel from "./terrainmodel";
import War3MapDoo from "./w3x-reader/doo/doo";
import Doodad from "./doodad";
import Unit from "./unit";
import War3MapUnitsDoo from "./w3x-reader/unitsdoo/unitsdoo";

export type FetchDataTypeName = 'image' | 'text' | 'arrayBuffer' | 'bytes' | 'blob';

export default class MapViewer {

    w3e: War3MapW3e;
    viewer: any;
    corners: Corner[][];
    // 地图中心偏移量
    centerOffset = new Float32Array(2);
    // 地图大小
    mapSize = new Int32Array(2);

    /**
     * 地面贴图数据
     */
    terrainData = new MappedData();
    /**
     * 悬崖贴图数据
     */
    cliffTypesData = new MappedData();
    /**
     * 水面贴图数据
     */
    waterData = new MappedData();
    /**
     * 装饰物数据
     */
    doodadsData = new MappedData();
    /**
     * 单位数据
     */
    unitsData = new MappedData();
    /**
     * 贴图组
     */
    tilesets: MappedDataRow[] = [];
    cliffTilesets: MappedDataRow[] = [];
    blightTextureIndex: number;
    waterHeightOffset: number;
    waterIncreasePerFrame: number;
    tilesetTextures: any[] = [];
    cliffTextures: any[] = [];
    waterTextures: any[] = [];
    columns: number;
    rows: number;

    maxDeepColor = new Float32Array(4);
    minDeepColor = new Float32Array(4);
    maxShallowColor = new Float32Array(4);
    minShallowColor = new Float32Array(4);

    vertexBuffer: WebGLBuffer | null = null;
    faceBuffer: WebGLBuffer | null = null;
    instanceBuffer: WebGLBuffer | null = null;
    textureBuffer: WebGLBuffer | null = null;
    variationBuffer: WebGLBuffer | null = null;
    waterBuffer: WebGLBuffer | null = null;
    heightMap: WebGLTexture | null = null;
    waterHeightMap: WebGLTexture | null = null;
    cliffHeightMap: WebGLTexture | null = null;

    terrainReady: boolean;
    anyReady: boolean;
    cliffsReady: boolean;

    groundShader: any;
    cliffShader: any;
    waterShader: any;

    worldScene: any;
    cliffModels: any[];
    waterIndex: number = 0;
    doodads: Doodad[] = [];
    units: Unit[] = [];
    unitsReady: boolean;


    constructor(viewer: any, worldScene: any, buf: ArrayBuffer) {
        this.viewer = viewer;
        this.worldScene = worldScene;

        this.groundShader = this.viewer.webgl.createShader(groundVert, groundFrag);
        this.cliffShader = this.viewer.webgl.createShader(cliffsVert, cliffsFrag);
        this.waterShader = this.viewer.webgl.createShader(waterVert, waterFrag);

        this.w3e = new War3MapW3e();
        this.w3e.load(buf);
        this.loadBaseFiles().then(() => {
            this.loadTerrainCliffsAndWater();
            this.loadDoodadsAndDestructibles();
            this.loadUnitsAndItems();
        });
    }


    async loadBaseFile(path: string, dataType: FetchDataTypeName): Promise<any | undefined> {
        if (dataType === 'text') {
            return await message.loadTextArray(path);
        }
        return await message.loadBlp(path);
    }

    async loadBaseFiles() {
        const promises = [
            this.loadBaseFile('TerrainArt\\Terrain.slk', 'text'),
            this.loadBaseFile('TerrainArt\\CliffTypes.slk', 'text'),
            this.loadBaseFile('TerrainArt\\Water.slk', 'text'),
            this.loadBaseFile('Doodads\\Doodads.slk', 'text'),
            this.loadBaseFile('Doodads\\DoodadMetaData.slk', 'text'),
            this.loadBaseFile('Units\\DestructableData.slk', 'text'),
            this.loadBaseFile('Units\\DestructableMetaData.slk', 'text'),
            this.loadBaseFile('Units\\UnitData.slk', 'text'),
            this.loadBaseFile('Units\\unitUI.slk', 'text'),
            this.loadBaseFile('Units\\ItemData.slk', 'text'),
            this.loadBaseFile('Units\\UnitMetaData.slk', 'text'),
            this.loadBaseFile('table\\unit.ini', 'text'),
        ];

        const [terrain, cliffTypes, water, doodads, doodadMetaData, destructableData, destructableMetaData, unitData, unitUi, itemData, unitMetaData, customUnit] = await Promise.all(promises);
        if (!terrain || !cliffTypes || !water || !doodads || !doodadMetaData || !destructableData || !destructableMetaData || !unitData || !unitUi || !itemData || !unitMetaData) {
            throw new Error('Failed to load the base files');
        }

        this.terrainData.load(<string>terrain.join('\n'));
        this.cliffTypesData.load(<string>cliffTypes.join('\n'));
        this.waterData.load(<string>water.join('\n'));
        this.doodadsData.load(<string>doodads.join('\n'));
        this.doodadsData.load(<string>destructableData.join('\n'));
        this.unitsData.load(<string>unitData.join('\n'));
        this.unitsData.load(<string>unitUi.join('\n'));
        this.unitsData.load(<string>itemData.join('\n'));
        this.unitsData.load(<string>customUnit.join('\n'));
    }

    /**
     * 加载地形、悬崖和水面
     */
    async loadTerrainCliffsAndWater() {
        const viewer = this.viewer;
        const centerOffset = this.w3e.centerOffset;
        const mapSize = this.w3e.mapSize;

        this.corners = this.w3e.corners;
        this.centerOffset.set(centerOffset);
        this.mapSize.set(mapSize);

        // Override the grid based on the map.
        this.worldScene.grid = new this.worldScene.grid.constructor(centerOffset[0], centerOffset[1], mapSize[0] * 128 - 128, mapSize[1] * 128 - 128, 16 * 128, 16 * 128);

        const tileset = this.w3e.tileset;
        const tilesetTextures = [];
        const cliffTextures = [];
        const waterTextures = [];

        for (const groundTileset of this.w3e.groundTilesets) {
            const row = this.terrainData.getRow(groundTileset);

            this.tilesets.push(row);

            tilesetTextures.push(this.viewer.load(`${row.string('dir')}\\${row.string('file')}.blp`));
        }

        const blights = {
            A: 'Ashen',
            B: 'Barrens',
            C: 'Felwood',
            D: 'Cave',
            F: 'Lordf',
            G: 'Dungeon',
            I: 'Ice',
            J: 'DRuins',
            K: 'Citadel',
            L: 'Lords',
            N: 'North',
            O: 'Outland',
            Q: 'VillageFall',
            V: 'Village',
            W: 'Lordw',
            X: 'Village',
            Y: 'Village',
            Z: 'Ruins',
        };

        this.blightTextureIndex = tilesetTextures.length;
        tilesetTextures.push(this.viewer.load(`TerrainArt\\Blight\\${blights[tileset]}_Blight.blp`));

        for (const cliffTileset of this.w3e.cliffTilesets) {
            const row = this.cliffTypesData.getRow(cliffTileset);

            this.cliffTilesets.push(row);
            cliffTextures.push(this.viewer.load(`${row.string('texDir')}\\${row.string('texFile')}.blp`));
        }

        const waterRow = this.waterData.getRow(`${tileset}Sha`);
        this.waterHeightOffset = waterRow.number('height');
        this.waterIncreasePerFrame = waterRow.number('texRate') / 60;
        this.waterTextures.length = 0;
        this.maxDeepColor.set([waterRow.number('Dmax_R'), waterRow.number('Dmax_G'), waterRow.number('Dmax_B'), waterRow.number('Dmax_A')]);
        this.minDeepColor.set([waterRow.number('Dmin_R'), waterRow.number('Dmin_G'), waterRow.number('Dmin_B'), waterRow.number('Dmin_A')]);
        this.maxShallowColor.set([waterRow.number('Smax_R'), waterRow.number('Smax_G'), waterRow.number('Smax_B'), waterRow.number('Smax_A')]);
        this.minShallowColor.set([waterRow.number('Smin_R'), waterRow.number('Smin_G'), waterRow.number('Smin_B'), waterRow.number('Smin_A')]);

        for (let i = 0, l = waterRow.number('numTex'); i < l; i++) {
            waterTextures.push(this.viewer.load(`${waterRow.string('texFile')}${i < 10 ? '0' : ''}${i}.blp`));
        }

        /**
         * 加载贴图
         */
        this.tilesetTextures = await Promise.all(tilesetTextures);
        this.cliffTextures = await Promise.all(cliffTextures);
        this.waterTextures = await Promise.all(waterTextures);

        const corners = this.w3e.corners;
        const [columns, rows] = this.mapSize;
        const instanceCount = (columns - 1) * (rows - 1);
        const cliffHeights = new Float32Array(columns * rows);
        const cornerHeights = new Float32Array(columns * rows);
        const waterHeights = new Float32Array(columns * rows);
        const cornerTextures = new Uint8Array(instanceCount * 4);
        const cornerVariations = new Uint8Array(instanceCount * 4);
        const waterFlags = new Uint8Array(instanceCount);
        let instance = 0;
        const cliffs: { [key: string]: { locations: number[], textures: number[] } } = {};

        this.columns = columns - 1;
        this.rows = rows - 1;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const bottomLeft = corners[y][x];
                const index = y * columns + x;

                cliffHeights[index] = bottomLeft.groundHeight;
                cornerHeights[index] = bottomLeft.groundHeight + bottomLeft.layerHeight - 2;
                waterHeights[index] = bottomLeft.waterHeight;

                if (y < rows - 1 && x < columns - 1) {
                    // Water can be used with cliffs and normal corners, so store water state regardless.
                    waterFlags[instance] = this.w3e.isWater(x, y);

                    // Is this a cliff, or a normal corner?
                    if (this.w3e.isCliff(x, y)) {
                        const bottomLeftLayer = bottomLeft.layerHeight;
                        const bottomRightLayer = corners[y][x + 1].layerHeight;
                        const topLeftLayer = corners[y + 1][x].layerHeight;
                        const topRightLayer = corners[y + 1][x + 1].layerHeight;
                        const base = Math.min(bottomLeftLayer, bottomRightLayer, topLeftLayer, topRightLayer);
                        const fileName = this.cliffFileName(bottomLeftLayer, bottomRightLayer, topLeftLayer, topRightLayer, base);

                        if (fileName !== 'AAAA') {
                            let cliffTexture = bottomLeft.cliffTexture;

                            /// ?
                            if (cliffTexture === 15) {
                                cliffTexture = 1;
                            }

                            const cliffRow = this.cliffTilesets[cliffTexture];
                            const dir = <string>cliffRow.string('cliffModelDir');
                            const path = `Doodads\\Terrain\\${dir}\\${dir}${fileName}${getCliffVariation(dir, fileName, bottomLeft.cliffVariation)}.mdx`;

                            if (!cliffs[path]) {
                                cliffs[path] = { locations: [], textures: [] };
                            }

                            cliffs[path].locations.push((x + 1) * 128 + centerOffset[0], y * 128 + centerOffset[1], (base - 2) * 128);
                            cliffs[path].textures.push(cliffTexture);
                        }
                    } else {
                        const bottomLeftTexture = this.w3e.cornerTexture(x, y, this.tilesets, this.cliffTilesets);
                        const bottomRightTexture = this.w3e.cornerTexture(x + 1, y, this.tilesets, this.cliffTilesets);
                        const topLeftTexture = this.w3e.cornerTexture(x, y + 1, this.tilesets, this.cliffTilesets);
                        const topRightTexture = this.w3e.cornerTexture(x + 1, y + 1, this.tilesets, this.cliffTilesets);
                        const textures = unique([bottomLeftTexture, bottomRightTexture, topLeftTexture, topRightTexture]).sort();
                        let texture = textures[0];

                        cornerTextures[instance * 4] = texture + 1;
                        cornerVariations[instance * 4] = this.getVariation(texture, bottomLeft.groundVariation);

                        textures.shift();

                        for (let i = 0, l = textures.length; i < l; i++) {

                            let bitset = 0;

                            texture = textures[i];

                            if (bottomRightTexture === texture) {
                                bitset |= 0b0001;
                            }

                            if (bottomLeftTexture === texture) {
                                bitset |= 0b0010;
                            }

                            if (topRightTexture === texture) {
                                bitset |= 0b0100;
                            }

                            if (topLeftTexture === texture) {
                                bitset |= 0b1000;
                            }

                            cornerTextures[instance * 4 + 1 + i] = texture + 1;
                            cornerVariations[instance * 4 + 1 + i] = bitset;
                        }
                    }

                    instance += 1;
                }
            }
        }

        const gl = this.viewer.gl;
        const webgl = this.viewer.webgl;

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

        this.faceBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array([0, 1, 2, 1, 3, 2]), gl.STATIC_DRAW);

        this.cliffHeightMap = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.cliffHeightMap);
        webgl.setTextureMode(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.NEAREST, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, columns, rows, 0, gl.ALPHA, gl.FLOAT, cliffHeights);

        this.heightMap = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.heightMap);
        webgl.setTextureMode(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.NEAREST, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, columns, rows, 0, gl.ALPHA, gl.FLOAT, cornerHeights);

        this.waterHeightMap = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.waterHeightMap);
        webgl.setTextureMode(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.NEAREST, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, columns, rows, 0, gl.ALPHA, gl.FLOAT, waterHeights);

        this.instanceBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceCount).map((currentValue, index) => index), gl.STATIC_DRAW);

        this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, cornerTextures, gl.STATIC_DRAW);

        this.variationBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.variationBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, cornerVariations, gl.STATIC_DRAW);

        this.waterBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.waterBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, waterFlags, gl.STATIC_DRAW);

        this.terrainReady = true;
        this.anyReady = true;

        const cliffShader = this.cliffShader;

        const cliffPromises = Object.entries(cliffs).map(async (cliff) => {
            const path = cliff[0];
            const { locations, textures } = cliff[1];
            const buffer = await this.loadBaseFile(path, 'arrayBuffer');

            if (buffer) {
                return new TerrainModel(this, buffer, locations, textures, cliffShader);
            }

            return;
        }).filter(x => x);

        // Sometimes TS isn't the brightest.
        const cliffPromisesForReal = <Promise<TerrainModel>[]>cliffPromises;

        this.cliffModels = await Promise.all(cliffPromisesForReal);
        this.cliffsReady = true;
    }

    /**
     * 加载装饰物和可破坏装饰
     */
    async loadDoodadsAndDestructibles() {
        const buf = await message.loadBlp('war3map.doo');
        const parser = new War3MapDoo();
        try {
            parser.load(buf, 0);
        } catch (e) {
            console.warn(`Failed to load war3map.doo: ${e}`);
            return;
        }
        // Doodads and destructibles.
        for (const doodad of parser.doodads) {
            try {
                const row = this.doodadsData.getRow(doodad.id);
                if (row) {
                    let file = row.string('file');

                    if (file) {
                        const numVar = row.number('numVar');

                        if (file.endsWith('.mdl')) {
                            file = file.slice(0, -4);
                        }

                        let fileVar = file;

                        file += '.mdx';

                        if (numVar > 1) {
                            fileVar += Math.min(doodad.variation, numVar - 1);
                        }

                        fileVar += '.mdx';

                        this.viewer.load(fileVar).then((model) => {
                            if (!model) return;
                            this.doodads.push(new Doodad(this, model, row, doodad));
                        });
                    } else {
                        console.log('Unknown doodad ID', doodad.id, doodad);
                    }
                }
            } catch (e) {
                console.warn(`Failed to load doodad/destructible ID ${doodad.id}: ${e}`);
            }
        }
    }

    /**
     * 加载单位和物品
     * @returns 
     */
    async loadUnitsAndItems() {
        const buf = await message.loadBlp('war3mapUnits.doo');

        const parser = new War3MapUnitsDoo();

        try {
            parser.load(buf, 0);
        } catch (e) {
            console.warn(`Failed to load war3mapUnits.doo: ${e}`);
            return;
        }

        // Collect the units and items data.
        for (const unit of parser.units) {
            try {
                let row: MappedDataRow | undefined;
                let path;

                // Hardcoded?
                if (unit.id === 'sloc') {
                    path = 'Objects\\StartLocation\\StartLocation.mdx';
                } else {
                    row = this.unitsData.getRow(unit.id);
                    if (row) {
                        path = row.string('file');

                        if (path) {
                            if (path.endsWith('.mdl')) {
                                path = path.slice(0, -4);
                            }

                            path += '.mdx';
                        }
                    }
                }

                if (path) {
                    this.viewer.load(path).then((model) => {
                        if (!model) {
                            return this.viewer.load('units/critters/sammycube/sammycube.mdx').then((model) => {
                                if (!model) return;
                                this.units.push(new Unit(this, model, row, unit));
                            });
                        }
                        this.units.push(new Unit(this, model, row, unit));
                    });
                } else {
                    console.log('Unknown unit ID', unit.id, unit);
                }
            } catch (e) {
                console.warn(`Failed to load unit/item ID ${unit.id}: ${e}`);
            }
        }

        this.unitsReady = true;
        this.anyReady = true;
    }

    getVariation(groundTexture: number, variation: number): number {
        const texture = this.tilesetTextures[groundTexture];

        // Extended?
        if (texture.width > texture.height) {
            if (variation < 16) {
                return 16 + variation;
            } else if (variation === 16) {
                return 15;
            } else {
                return 0;
            }
        } else {
            if (variation === 0) {
                return 0;
            } else {
                return 15;
            }
        }
    }

    cliffFileName(bottomLeftLayer: number, bottomRightLayer: number, topLeftLayer: number, topRightLayer: number, base: number): string {
        return String.fromCharCode(65 + bottomLeftLayer - base) +
            String.fromCharCode(65 + topLeftLayer - base) +
            String.fromCharCode(65 + topRightLayer - base) +
            String.fromCharCode(65 + bottomRightLayer - base);
    }

    /**
   * Update the map.
   */
    update(): void {
        if (this.anyReady) {
            this.viewer.update();
            // const worldScene = this.worldScene;
            // worldScene.update(17);
            this.waterIndex += this.waterIncreasePerFrame;

            if (this.waterIndex >= this.waterTextures.length) {
                this.waterIndex = 0;
            }

            for (const doodad of this.doodads) {
                doodad.update();
            }

            for (const unit of this.units) {
                unit.update();
            }
        }
    }

    render() {
        if (this.anyReady) {
            const worldScene = this.worldScene;

            worldScene.startFrame();
            this.renderGround();
            this.renderCliffs();
            worldScene.renderOpaque();
            this.renderWater();
            worldScene.renderTranslucent();
            this.update();
        }
    }

    /**
     * 绘制地面
     */
    renderGround() {
        if (this.terrainReady) {
            const gl = this.viewer.gl;
            const webgl = this.viewer.webgl;
            const instancedArrays = <ANGLE_instanced_arrays>webgl.extensions['ANGLE_instanced_arrays'];
            const shader = this.groundShader;
            const uniforms = shader.uniforms;
            const attribs = shader.attribs;
            const tilesetTextures = this.tilesetTextures;
            const instanceAttrib = attribs['a_InstanceID'];
            const positionAttrib = attribs['a_position'];
            const texturesAttrib = attribs['a_textures'];
            const variationsAttrib = attribs['a_variations'];
            const tilesetCount = tilesetTextures.length; // This includes the blight texture.

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            webgl.useShader(shader);

            gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
            gl.uniform2fv(uniforms['u_offset'], this.centerOffset);
            gl.uniform2f(uniforms['u_size'], this.columns, this.rows);
            gl.uniform1i(uniforms['u_heightMap'], 15);

            gl.activeTexture(gl.TEXTURE15);
            gl.bindTexture(gl.TEXTURE_2D, this.heightMap);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
            gl.vertexAttribPointer(instanceAttrib, 1, gl.FLOAT, false, 0, 0);
            instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 1);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.vertexAttribPointer(texturesAttrib, 4, gl.UNSIGNED_BYTE, false, 0, 0);
            instancedArrays.vertexAttribDivisorANGLE(texturesAttrib, 1);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.variationBuffer);
            gl.vertexAttribPointer(variationsAttrib, 4, gl.UNSIGNED_BYTE, false, 0, 0);
            instancedArrays.vertexAttribDivisorANGLE(variationsAttrib, 1);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);

            gl.uniform1f(uniforms['u_baseTileset'], 0);

            for (let i = 0, l = Math.min(tilesetCount, 15); i < l; i++) {
                const isExtended = tilesetTextures[i].width > tilesetTextures[i].height ? 1 : 0;

                gl.uniform1f(uniforms[`u_extended[${i}]`], isExtended);
                gl.uniform1i(uniforms[`u_tilesets[${i}]`], i);

                webgl.bindTexture(tilesetTextures[i], i);
            }

            instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);

            if (tilesetCount > 15) {
                gl.uniform1f(uniforms['u_baseTileset'], 15);

                for (let i = 0, l = tilesetCount - 15; i < l; i++) {
                    const isExtended = tilesetTextures[i + 15].width > tilesetTextures[i + 15].height ? 1 : 0;

                    gl.uniform1f(uniforms[`u_extended[${i}]`], isExtended);

                    webgl.bindTexture(tilesetTextures[i + 15], i);
                }

                instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);
            }

            instancedArrays.vertexAttribDivisorANGLE(texturesAttrib, 0);
            instancedArrays.vertexAttribDivisorANGLE(variationsAttrib, 0);
            instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 0);
        }
    }

    /**
     * 绘制悬崖
     */
    renderCliffs(): void {
        if (this.cliffsReady) {
            const gl = this.viewer.gl;
            const webgl = this.viewer.webgl;
            const instancedArrays = <ANGLE_instanced_arrays>webgl.extensions['ANGLE_instanced_arrays'];
            const vertexArrayObject = <OES_vertex_array_object>webgl.extensions['OES_vertex_array_object'];
            const shader = this.cliffShader;
            const attribs = shader.attribs;
            const uniforms = shader.uniforms;

            gl.disable(gl.BLEND);

            shader.use();

            gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
            gl.uniform1i(uniforms['u_heightMap'], 0);
            gl.uniform2f(uniforms['u_pixel'], 1 / (this.columns + 1), 1 / (this.rows + 1));
            gl.uniform2fv(uniforms['u_centerOffset'], this.centerOffset);
            gl.uniform1i(uniforms['u_texture1'], 1);
            gl.uniform1i(uniforms['u_texture2'], 2);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.cliffHeightMap);

            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.cliffTextures[0].webglResource);

            if (this.cliffTextures.length > 1) {
                gl.activeTexture(gl.TEXTURE2);
                gl.bindTexture(gl.TEXTURE_2D, this.cliffTextures[1].webglResource);
            }

            // Set instanced attributes.
            if (!vertexArrayObject) {
                instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 1);
                instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 1);
            }

            // Render the cliffs.
            for (const cliff of this.cliffModels) {
                cliff.render(shader);
            }

            // Clear instanced attributes.
            if (!vertexArrayObject) {
                instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 0);
                instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 0);
            }
        }
    }

    /**
     * 绘制水面
     */
    renderWater(): void {
        if (this.terrainReady) {
            const gl = this.viewer.gl;
            const webgl = this.viewer.webgl;
            const instancedArrays = <ANGLE_instanced_arrays>webgl.extensions['ANGLE_instanced_arrays'];
            const shader = this.waterShader;
            const uniforms = shader.uniforms;
            const attribs = shader.attribs;
            const instanceAttrib = attribs['a_InstanceID'];
            const positionAttrib = attribs['a_position'];
            const isWaterAttrib = attribs['a_isWater'];

            gl.depthMask(false);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            webgl.useShader(shader);

            gl.uniformMatrix4fv(uniforms['u_VP'], false, this.worldScene.camera.viewProjectionMatrix);
            gl.uniform2fv(uniforms['u_offset'], this.centerOffset);
            gl.uniform2f(uniforms['u_size'], this.columns, this.rows);
            gl.uniform1i(uniforms['u_heightMap'], 0);
            gl.uniform1i(uniforms['u_waterHeightMap'], 1);
            gl.uniform1i(uniforms['u_waterTexture'], 2);
            gl.uniform1f(uniforms['u_offsetHeight'], this.waterHeightOffset);
            gl.uniform4fv(uniforms['u_maxDeepColor'], this.maxDeepColor);
            gl.uniform4fv(uniforms['u_minDeepColor'], this.minDeepColor);
            gl.uniform4fv(uniforms['u_maxShallowColor'], this.maxShallowColor);
            gl.uniform4fv(uniforms['u_minShallowColor'], this.minShallowColor);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.heightMap);

            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.waterHeightMap);

            webgl.bindTexture(this.waterTextures[this.waterIndex | 0], 2);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 8, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
            gl.vertexAttribPointer(instanceAttrib, 1, gl.FLOAT, false, 4, 0);
            instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 1);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.waterBuffer);
            gl.vertexAttribPointer(isWaterAttrib, 1, gl.UNSIGNED_BYTE, false, 1, 0);
            instancedArrays.vertexAttribDivisorANGLE(isWaterAttrib, 1);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
            instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.rows * this.columns);

            instancedArrays.vertexAttribDivisorANGLE(isWaterAttrib, 0);
            instancedArrays.vertexAttribDivisorANGLE(instanceAttrib, 0);
        }
    }
}