import type Viewer from "mdx-m3-viewer/dist/cjs/viewer";
import glMatrix from "gl-matrix";
import Model from "mdx-m3-viewer/dist/cjs/parsers/mdlx/model";
import type Message from "../common/message";

declare const message: Message;

declare global {
    interface Window {
        message: Message;
        currentResourceURI: {
            external: string;
            fsPath: string;
            path: string;
            scheme: 'mpq' | 'w3x' | 'file'
        };

        ModelViewer: {
            viewer: typeof Viewer;
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
