/**
 * 地图查看器
 */
import { setupCamera } from "./camera";
import MapViewer from "./mapViewer";

const handlers = ModelViewer.viewer.handlers;
const common = ModelViewer.common;
const glMatrix = common.glMatrix;
const vec3 = glMatrix.vec3;
const quat = glMatrix.quat;

let canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 800;
canvas.height = 600;

// Create the viewer!
let viewer = new ModelViewer.viewer.ModelViewer(canvas);
viewer.debugRenderMode = ModelViewer.viewer.DebugRenderMode.None;

// Create a new scene. Each scene has its own camera, and a list of things to render.
let scene = viewer.addScene();

// Check camera.js!
setupCamera(scene);

// Events.
viewer.on('loadstart', (e) => console.log(e));
viewer.on('load', (e) => console.log('load', e));
viewer.on('loadend', (e) => console.log('loadend', e));
viewer.on('error', (e) => console.log('error', e));

// Add the MDX handler.
// Note that this also loads all of the team colors/glows.
// You can optionally supply a path solver (look below) to point the viewer to the right location of the textures.
// Additionally, a boolean can be given that selects between RoC/TFT and Reforged team colors.
// For example:
//   viewer.addHandler(handlers.mdx, pathSolver); // Roc/TFT = 14 teams.
//   viewer.addHandler(handlers.mdx, pathSolver, true); // Reforged = 28 teams.
// In the case of this example, team colors aren't used, so it's fine for their loads to simply fail.
viewer.addHandler(handlers.mdx);

// Add the BLP handler.
viewer.addHandler(handlers.blp);
// Add the DDS handler.
viewer.addHandler(handlers.dds);
// Add the TGA handler.
viewer.addHandler(handlers.tga);

document.querySelector('.controls')?.remove();

// @ts-ignore
window.fetch = async function (path: string) {
    /**
     * 优先查找resource下面的文件
     */
    const resourceBuf = await message.loadResource(path);
    if (!resourceBuf) {
        const buf = await message.loadBlp(path);
        return {
            ok: true,
            arrayBuffer: () => buf,
        };
    }
    return {
        ok: true,
        arrayBuffer: () => resourceBuf,
    };
};

message.load().then(({ buf, ext }) => {
    const map = new MapViewer(viewer, scene, buf);
    // The viewer has the update(), startFrame(), render(), and updateAndRender() functions.
    // Generally speaking, you will want a simple never ending loop like the one that follows, but who knows. The control is in your hands.
    function step(timestamp: number) {
        requestAnimationFrame(step);

        map.render();
    }
    requestAnimationFrame(step);
});
