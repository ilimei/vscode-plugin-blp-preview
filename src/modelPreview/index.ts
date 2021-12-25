import { setupCamera } from "./camera";

const handlers = ModelViewer.viewer.handlers;
const common = ModelViewer.common;
const glMatrix = common.glMatrix;
let modelArrayBuffer: ArrayBuffer = null;
const vec3 = glMatrix.vec3;
const quat = glMatrix.quat;

let canvas = document.getElementById('canvas') as HTMLCanvasElement;

canvas.width = 800;
canvas.height = 600;

// Create the viewer!
let viewer = new ModelViewer.viewer.ModelViewer(canvas);
viewer.debugRenderMode = ModelViewer.viewer.DebugRenderMode.None;

console.info('model', viewer, ModelViewer);

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

function encode(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setAnimationList(model) {
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
    console.info('fetch', path);
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

let modelRenderer = null;

viewer.load('test.mdx').then(model => {

    console.info('model', model, scene);
    scene.lightPosition = vec3.fromValues(200, 0, 0);

    setAnimationList(model);
    setTeamColor();
    initControls();
    // Create an instance of this model.
    let instance = model.addInstance();
    modelRenderer = instance;

    // Set the instance's scene.
    // Equivalent to scene.addInstance(instance)
    instance.setScene(scene);

    // Want to run the second animation.
    // 0 is the first animation, and -1 is no animation.
    instance.setSequence(0);

    // Tell the instance to loop animations forever.
    // This overrides the setting in the model itself.
    instance.setSequenceLoopMode(2);
    instance.move([0, 0, 0]);
});

function initControls() {
    let select = document.getElementById('select') as HTMLSelectElement;
    select.addEventListener('input', () => {
        modelRenderer.setSequence(parseInt(select.value, 10));
    });
    let teamcolor = document.getElementById('teamcolor') as HTMLSelectElement;
    teamcolor.addEventListener('input', () => {
        modelRenderer.setTeamColor(parseInt(teamcolor.value, 10));
        modelRenderer.forced =  true;
    });
    let volume = document.getElementById('volume') as HTMLSelectElement;
    volume.addEventListener('input', () => {
        if (modelRenderer) {
            modelRenderer.timeScale = parseInt(volume.value, 10) / 10;
        }
    });
}