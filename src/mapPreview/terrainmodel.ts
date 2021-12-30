import MapViewer from './mapViewer';

const MdlxModel = ModelViewer.parsers.mdlx.Model;

function double(vertices: Float32Array) {
  return new Float32Array(vertices.length * 2).fill(0).map((_, index) => {
    return vertices[index % vertices.length];
  });
}

/**
 * A static terrain model.
 */
export default class TerrainModel {
  map: MapViewer;
  vertexBuffer: WebGLBuffer;
  faceBuffer: WebGLBuffer;
  normalsOffset: number;
  uvsOffset: number;
  elements: number;
  locationAndTextureBuffer: WebGLBuffer;
  texturesOffset: number;
  instances: number;
  vao: WebGLVertexArrayObjectOES | null;
  normalFaceBuffer: WebGLBuffer;
  flagsOffset: number;

  constructor(map: MapViewer, arrayBuffer: ArrayBuffer, locations: number[], textures: number[], shader: any) {
    const gl = map.viewer.gl as WebGLRenderingContext;
    const webgl = map.viewer.webgl;
    const instancedArrays = <ANGLE_instanced_arrays>webgl.extensions['ANGLE_instanced_arrays'];
    const vertexArrayObject = <OES_vertex_array_object>webgl.extensions['OES_vertex_array_object'];

    const parser = new MdlxModel();
    parser.load(arrayBuffer);

    const geoset = parser.geosets[0];
    console.info('faces', parser);
    const originLength = geoset.vertices.length/3;
    const vertices = double(geoset.vertices);
    const normals = double(geoset.normals);
    const uvs = double(geoset.uvSets[0]);
    const faces = geoset.faces;
    const flags = new Float32Array(uvs.length/2).fill(0).map((_, index) => {
      return index >= originLength ? 1 : 0;
    });
    const normalFaces = new Uint16Array(faces.reduce((ret, cur) => {
      ret.push(cur);
      ret.push(cur + originLength);
      return ret;
    }, []));
    // console.info(`faces`, vertices, flags);
    const normalsOffset = vertices.byteLength;
    const uvsOffset = normalsOffset + normals.byteLength;
    const flagsOffset = uvsOffset + uvs.byteLength;
    let vao = null;
    const attribs = shader.attribs;

    if (vertexArrayObject) {
      vao = vertexArrayObject.createVertexArrayOES();
      vertexArrayObject.bindVertexArrayOES(vao);
    }

    const vertexBuffer = <WebGLBuffer>gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flagsOffset + flags.byteLength, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
    gl.bufferSubData(gl.ARRAY_BUFFER, normalsOffset, normals);
    gl.bufferSubData(gl.ARRAY_BUFFER, uvsOffset, uvs);
    gl.bufferSubData(gl.ARRAY_BUFFER, flagsOffset, flags);
    console.info(`normals`, vertices, normals);

    if (vertexArrayObject) {
      gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(attribs['a_position']);

      gl.vertexAttribPointer(attribs['a_normal'], 3, gl.FLOAT, false, 0, normalsOffset);
      gl.enableVertexAttribArray(attribs['a_normal']);

      gl.vertexAttribPointer(attribs['a_uv'], 2, gl.FLOAT, false, 0, uvsOffset);
      gl.enableVertexAttribArray(attribs['a_uv']);
    }

    const texturesOffset = locations.length * 4;
    const locationAndTextureBuffer = <WebGLBuffer>gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, locationAndTextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturesOffset + textures.length, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(locations));
    gl.bufferSubData(gl.ARRAY_BUFFER, texturesOffset, new Uint8Array(textures));

    if (vertexArrayObject) {
      gl.vertexAttribPointer(attribs['a_instancePosition'], 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(attribs['a_instancePosition']);
      instancedArrays.vertexAttribDivisorANGLE(attribs['a_instancePosition'], 1);

      gl.vertexAttribPointer(attribs['a_instanceTexture'], 1, gl.UNSIGNED_BYTE, false, 0, texturesOffset);
      gl.enableVertexAttribArray(attribs['a_instanceTexture']);
      instancedArrays.vertexAttribDivisorANGLE(attribs['a_instanceTexture'], 1);

    }

    const faceBuffer = <WebGLBuffer>gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);

    const normalFaceBuffer = <WebGLBuffer>gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normalFaceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, normalFaces, gl.STATIC_DRAW);

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(null);
    }

    this.map = map;
    this.vertexBuffer = vertexBuffer;
    this.faceBuffer = faceBuffer;
    this.normalFaceBuffer = normalFaceBuffer;
    this.normalsOffset = normalsOffset;
    this.uvsOffset = uvsOffset;
    this.flagsOffset = flagsOffset;
    this.elements = faces.length;
    this.locationAndTextureBuffer = locationAndTextureBuffer;
    this.texturesOffset = texturesOffset;
    this.instances = locations.length / 3;
    this.vao = vao;
  }

  render(shader: any): void {
    const viewer = this.map.viewer;
    const gl = viewer.gl as WebGLRenderingContext;
    const webgl = viewer.webgl;
    const instancedArrays = <ANGLE_instanced_arrays>webgl.extensions['ANGLE_instanced_arrays'];
    const vertexArrayObject = <OES_vertex_array_object>webgl.extensions['OES_vertex_array_object'];
    const attribs = shader.attribs;

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(this.vao);
    } else {
      // Locations and textures.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.locationAndTextureBuffer);
      gl.vertexAttribPointer(attribs['a_instancePosition'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_instanceTexture'], 1, gl.UNSIGNED_BYTE, false, 0, this.texturesOffset);

      // Vertices.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_normal'], 3, gl.FLOAT, false, 0, this.normalsOffset);
      gl.vertexAttribPointer(attribs['a_uv'], 2, gl.FLOAT, false, 0, this.uvsOffset);
      // gl.vertexAttribPointer(attribs['a_color'], 1, gl.FLOAT, false, 0, this.flagsOffset);

      // Faces.
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.faceBuffer);
    }

    // Draw.
    // instancedArrays.drawElementsInstancedANGLE(gl.LINE_STRIP, this.elements, gl.UNSIGNED_SHORT, 0, this.instances);
    instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, this.elements, gl.UNSIGNED_SHORT, 0, this.instances);

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(null);
    }
  }

  renderNormal(shader) {
    const viewer = this.map.viewer;
    const gl = viewer.gl as WebGLRenderingContext;
    const webgl = viewer.webgl;
    const instancedArrays = <ANGLE_instanced_arrays>webgl.extensions['ANGLE_instanced_arrays'];
    const vertexArrayObject = <OES_vertex_array_object>webgl.extensions['OES_vertex_array_object'];
    const attribs = shader.attribs;

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(this.vao);
    } else {
      // Locations and textures.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.locationAndTextureBuffer);
      gl.vertexAttribPointer(attribs['a_instancePosition'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_instanceTexture'], 1, gl.UNSIGNED_BYTE, false, 0, this.texturesOffset);

      // Vertices.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(attribs['a_position'], 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(attribs['a_normal'], 3, gl.FLOAT, false, 0, this.normalsOffset);
      // gl.vertexAttribPointer(attribs['a_uv'], 2, gl.FLOAT, false, 0, this.uvsOffset);
      gl.vertexAttribPointer(attribs['a_flag'], 1, gl.FLOAT, false, 0, this.flagsOffset);

      // Faces.
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.normalFaceBuffer);
    }

    // Draw.
    instancedArrays.drawElementsInstancedANGLE(gl.LINES, this.elements * 2, gl.UNSIGNED_SHORT, 0, this.instances);
    // instancedArrays.drawElementsInstancedANGLE(gl.TRIANGLES, this.elements, gl.UNSIGNED_SHORT, 0, this.instances);

    if (vertexArrayObject) {
      vertexArrayObject.bindVertexArrayOES(null);
    }
  }
}
