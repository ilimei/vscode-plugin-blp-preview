import Message from "./message"
declare global {
    const message: Message;
    const vscode: {
        postMessage: (data: any) => void;
        getState: () => any;
        setState: (data: any) => void;
    };
    const ModelViewer: any;
    const TGA: any;
    const getImageData: any;
    const decode: any;
}
