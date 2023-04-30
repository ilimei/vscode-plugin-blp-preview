/* eslint-disable @typescript-eslint/naming-convention */
import type Shader from "mdx-m3-viewer/dist/cjs/viewer/gl/shader";
import type ModelViewer from "mdx-m3-viewer/dist/cjs/viewer/viewer";
import gridFrag from 'raw-loader!./shaders/grid.frag.glsl';
import gridVertx from 'raw-loader!./shaders/grid.vert.glsl';

const { viewer } = window.ModelViewer;
const { Model, ModelInstance } = viewer;

export class GridInstance extends ModelInstance {

    constructor(model: Grid) {
        super(model);
    }

    renderOpaque(): void {
        const grid = <Grid>this.model;
        const gl = this.model.viewer.gl;
        const scene = this.scene!;
        const camera = scene.camera;
        const shader = this.model.viewer.sharedCache.get('mgrid') as Shader;

        shader.use();
        const attribs = shader.attribs;
        const uniforms = shader.uniforms;
        gl.uniformMatrix4fv(uniforms['u_VP'], false, camera.viewProjectionMatrix);

        gl.uniform1f(uniforms['visibility'], 0.5);
        gl.uniform3f(uniforms['mainColor'], 0.0, 0.0, 0.0);
        gl.uniform3f(uniforms['lineColor'], 1.0, 1.0, 1.0);
        gl.uniform4f(uniforms['gridControl'], 50.0, 100.0, 1.0, 1.0);
        gl.uniform3f(uniforms['gridOffset'], 0.0, 0.0, 0.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, grid.VBO);
        gl.vertexAttribPointer(attribs['position'], 3, gl.FLOAT, false, 6 * 4, 0);
        gl.vertexAttribPointer(attribs['normal'], 3, gl.FLOAT, false, 6 * 4, 3 * 4);

        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, grid.EBO);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
}

export class Grid extends Model {
    VBO: WebGLBuffer;
    EBO: WebGLBuffer;
    constructor(viewer: ModelViewer) {
        super({
            viewer,
            fetchUrl: '',
        });
        const gl = viewer.gl;
        gl.getExtension("OES_standard_derivatives");
        gl.getExtension("EXT_shader_texture_lod");

        const shader = viewer.webgl.createShader(gridVertx, gridFrag);
        viewer.sharedCache.set('mgrid', shader);

        shader.use();
        const size = 400;

        const vertices = new Float32Array([
            +size, +size, -1.0, 0.0, 0.0, 1.0,
            +size, -size, -1.0, 0.0, 0.0, 1.0,
            -size, -size, -1.0, 0.0, 0.0, 1.0,
            -size, +size, -1.0, 0.0, 0.0, 1.0
        ])
        const indices = new Uint16Array([ // 注意索引从0开始! 
            0, 1, 3, // 第一个三角形
            1, 2, 3  // 第二个三角形
        ]);
        // 2. 把顶点数组复制到缓冲中供OpenGL使用
        const VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        const EBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        this.VBO = VBO;
        this.EBO = EBO;

        this.bounds.fromExtents(new Float32Array([-size, size, 0.0]),
            new Float32Array([size, -size, 0.0]));
    }

    addInstance(): GridInstance {
        return new GridInstance(this);
    }
}
