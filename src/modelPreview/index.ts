import type MdxModel from "mdx-m3-viewer/dist/cjs/viewer/handlers/mdx/model";
import type MdxModelInstance from "mdx-m3-viewer/dist/cjs/viewer/handlers/mdx/modelinstance";
import { setupCamera } from "./camera";
import { Grid, GridInstance } from "./grid";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModelViewer = window.ModelViewer.viewer.ModelViewer;

const MdlxParser = window.ModelViewer.parsers.mdlx.Model;

const handlers = window.ModelViewer.viewer.handlers;

const MdlxModel = handlers.mdx.resource;


let canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 800;
canvas.height = 600;

// Create the viewer!
let viewer = new ModelViewer(canvas);
viewer.enableAudio();
// viewer.debugRenderMode = ModelViewer.viewer.DebugRenderMode.None;

// Create a new scene. Each scene has its own camera, and a list of things to render.
let scene = viewer.addScene();

// Check camera.js!
setupCamera(scene, { distance: 1000 });

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

function encode(html: string) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setAnimationList(model: MdxModel) {
    let list: any[] = model.sequences.map(seq => seq.name);

    if (list.length === 0) {
        list = ['None'];
    }

    let select = document.getElementById('select') as HTMLSelectElement;
    select.innerHTML = list.map((item, index) => `<option value="${index}">${encode(item)}</option>`).join('');
}

function setTeamColor() {
    const list = ['红色', '蓝色', '青色', '紫色', '黄色', '橙色', '绿色', '粉色', '灰色'];
    let select = document.getElementById('teamcolor') as HTMLSelectElement;
    select.innerHTML = list.map((item, index) => `<option value="${index}">${encode(item)}</option>`).join('');
}

// The viewer has the update(), startFrame(), render(), and updateAndRender() functions.
// Generally speaking, you will want a simple never ending loop like the one that follows, but who knows. The control is in your hands.
let previousTimeStamp: number;
function step(timestamp: number) {
    requestAnimationFrame(step);
    if (!previousTimeStamp) {
        previousTimeStamp = timestamp;
        return;
    }
    viewer.updateAndRender(timestamp - previousTimeStamp);
    previousTimeStamp = timestamp;
}
requestAnimationFrame(step);

// @ts-ignore
window.fetch = async function (path: string) {
    if (path.toLowerCase().endsWith('mdx')) {
        const { buf } = await message.load();
        return {
            ok: true,
            arrayBuffer: () => buf,
        };
    } else if (path.toLowerCase().endsWith('.blp') || path.toLowerCase().endsWith('.tga') || path.toLowerCase().endsWith('.dds')) {
        const buf = await message.loadBlp(path);
        return {
            ok: true,
            arrayBuffer: () => buf,
        };
    }
    return new Promise(() => { });
};

let minX = Number.MAX_VALUE;
let minY = Number.MAX_VALUE;
let minZ = Number.MAX_VALUE;
let maxX = Number.MIN_VALUE;
let maxY = Number.MIN_VALUE;
let maxZ = Number.MIN_VALUE;

window.fetch('test.mdx').then(e => {
    return e.arrayBuffer();
}).then(data => {
    const parser = new MdlxParser();
    parser.load(data);
    console.info(parser);
    parser.geosets.forEach(geo => {
        console.info(geo.extent);
        if (geo.extent.min) {
            let x = geo.extent.min[0];
            let y = geo.extent.min[1];
            let z = geo.extent.min[2];
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            minZ = Math.min(minZ, z);
        }
        if (geo.extent.max) {
            let x = geo.extent.max[0];
            let y = geo.extent.max[1];
            let z = geo.extent.max[2];
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            maxZ = Math.max(maxZ, z);
        }
    });
    // const seq = parser.sequences[0];
    // if (seq.extent.min) {
    //     let x = seq.extent.min[0];
    //     let y = seq.extent.min[1];
    //     let z = seq.extent.min[2];
    //     minX = Math.min(minX, x);
    //     minY = Math.min(minY, y);
    //     minZ = Math.min(minZ, z);
    // }
    // if (seq.extent.max) {
    //     let x = seq.extent.max[0];
    //     let y = seq.extent.max[1];
    //     let z = seq.extent.max[2];
    //     maxX = Math.max(maxX, x);
    //     maxY = Math.max(maxY, y);
    //     maxZ = Math.max(maxZ, z);
    // }
    console.info(minX, minY, minZ, maxX, maxY, maxZ);
    return new MdlxModel(parser, { viewer, fetchUrl: 'test.mdx' });
}).then((model: MdxModel) => {
    // scene.lightPosition = vec3.fromValues(200, 0, 0);
    const gridInstance = new Grid(viewer).addInstance();
    scene.addInstance(gridInstance);
    // Create an instance of this model.
    let instance = model.addInstance();

    setAnimationList(model);
    setTeamColor();
    initControls(instance, gridInstance);

    instance.isVisible = () => true;

    if ((maxZ - minZ) < 1) {
        const scale = 320 / model.bounds.r;
        instance.move([-model.bounds.x * scale, -model.bounds.y * scale, 0]);
        instance.scale([scale, scale, 1]);
    }

    // Set the instance's scene.
    // Equivalent to scene.addInstance(instance)
    scene.addInstance(instance);

    // Want to run the second animation.
    // 0 is the first animation, and -1 is no animation.
    instance.setSequence(0);

    // Tell the instance to loop animations forever.
    // This overrides the setting in the model itself.
    instance.setSequenceLoopMode(2);
});

function initControls(modelRenderer: MdxModelInstance, gridInstance: GridInstance) {
    const gridInput = document.getElementById('grid') as HTMLInputElement;
    gridInput.checked = true;
    gridInstance.isVisible = () => gridInput.checked;
    let select = document.getElementById('select') as HTMLSelectElement;
    select.addEventListener('input', () => {
        modelRenderer.setSequence(parseInt(select.value, 10));
    });
    let teamcolor = document.getElementById('teamcolor') as HTMLSelectElement;
    teamcolor.addEventListener('input', () => {
        modelRenderer.setTeamColor(parseInt(teamcolor.value, 10));
        modelRenderer.forced = true;
    });
    let volume = document.getElementById('volume') as HTMLSelectElement;
    volume.addEventListener('input', () => {
        if (modelRenderer) {
            modelRenderer.timeScale = parseInt(volume.value, 10) / 10;
        }
    });
}
