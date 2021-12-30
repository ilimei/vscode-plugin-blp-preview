/**
 * 地图查看器
 */
import { setupCamera } from "./camera";
import MapViewer from "./mapViewer";
import { vec3, vec4 } from 'gl-matrix';

const handlers = ModelViewer.viewer.handlers;
const common = ModelViewer.common;

let canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 800;
canvas.height = 600;

// Create the viewer!
let viewer = new ModelViewer.viewer.ModelViewer(canvas);
viewer.debugRenderMode = ModelViewer.viewer.DebugRenderMode.None;

// Create a new scene. Each scene has its own camera, and a list of things to render.
let scene = viewer.addScene();

// Check camera.js!
setupCamera(scene, {
    distance: 1000,
}).moveToAndFace(vec3.fromValues(0, -1285.9781494140625, 1428.2235107421875), vec3.create());

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

document.querySelector('.controls').remove();

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

let model = null;
let map: MapViewer = null;
message.load().then(({ buf, ext }) => {
    map = new MapViewer(viewer, scene, buf);
    // The viewer has the update(), startFrame(), render(), and updateAndRender() functions.
    // Generally speaking, you will want a simple never ending loop like the one that follows, but who knows. The control is in your hands.
    function step(timestamp: number) {
        requestAnimationFrame(step);

        map.render();
    }
    requestAnimationFrame(step);
}).then(() => {
    viewer.load('war3mapImported\\HeroBlackSaber.mdx').then(v => {
        if (v) {
            model = v.addInstance();

            model.move([0, 0, 0]);
            model.setSequence(0);

            // Tell the instance to loop animations forever.
            // This overrides the setting in the model itself.
            model.setSequenceLoopMode(2);
            model.setScene(scene);
            console.info(`model`, model);
        };
    });
});



const ray = new Float32Array(6);
canvas.addEventListener('click', e => {
    const { x, y } = canvas.getBoundingClientRect();
    console.info(e.clientX - x, e.clientY - y);
    scene.camera.screenToWorldRay(ray, [e.clientX - x, e.clientY - y], scene.viewport);
    const a = vec3.fromValues(ray[0], ray[1], ray[2]);
    const b = vec3.fromValues(ray[3], ray[4], ray[5]);
    const z = vec3.fromValues(0, 0, 0);
    const n = vec3.fromValues(0, 0, 1);
    vec3.normalize(b, vec3.sub(b, b, a));
    const t = (vec3.dot(z, n) - vec3.dot(a, n) / vec3.dot(b, n));
    vec3.add(a, a, vec3.scale(b, b, t));
    if (map) {
        const column = Math.floor((a[0] - map.centerOffset[0])/128);
        const row = Math.floor((a[1] - map.centerOffset[1])/128);
        const corner = map.corners[row][column];
        console.info(corner);
        const height = corner.groundHeight + corner.layerHeight - 2;
        a[2] = height * 128;
        map.selX = column;
        map.selY = row;
        console.info(a[0] - map.centerOffset[0], a[1] - map.centerOffset[1]);
    }
    if (model) {
        model.setLocation(a);
    }
    console.info(a[0] % 128, a[1] % 128);
    console.info(a, scene.camera.location);
});