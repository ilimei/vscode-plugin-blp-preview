
async function main() {
    const { buf, ext } = await message.load();
    const blob = new Blob([buf], { type: "audio/wav" });
    const url = window.URL.createObjectURL(blob);
    const audio = (document.querySelector('#audio') as HTMLAudioElement);
    audio.src = url;
    audio.autoplay = true;
}

document.body.style.cssText = `
    background-color: transparent;
    color: var(--vscode-editor-foreground);
    font-family: var(--vscode-font-family);
    font-weight: var(--vscode-font-weight);
    font-size: var(--vscode-font-size);
    margin: 0;
    padding: 0 20px;`;

main();

export const m = 1;
