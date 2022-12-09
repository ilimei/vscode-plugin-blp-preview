
async function main() {
    const { buf, ext } = await message.load();
    const blob = new Blob([buf], { type: "audio/wav" });
    const url = window.URL.createObjectURL(blob);
    const audio = (document.querySelector('#audio') as HTMLAudioElement);
    audio.style.position = 'absolute';
    audio.style.left = '50%';
    audio.style.transform = 'translateX(-100%)';
    audio.style.bottom = '40px';
    audio.src = url;
    audio.autoplay = true;
}

main();

export const m = 1;
