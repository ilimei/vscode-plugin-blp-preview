import Message from "./message"
import type { viewer } from 'mdx-m3-viewer';
import glMatrix from "gl-matrix";
import Model from "mdx-m3-viewer/dist/cjs/parsers/mdlx/model";

declare global {
    const message: Message;
    const vscode: {
        postMessage: (data: any) => void;
        getState: () => any;
        setState: (data: any) => void;
    };
    interface Window {
        ModelViewer: {
            viewer: typeof viewer;
            common: {
                glMatrix: typeof glMatrix;
            };
            parsers: {
                mdlx: {
                    Model: typeof Model;
                },
            },
        };
    }
}
