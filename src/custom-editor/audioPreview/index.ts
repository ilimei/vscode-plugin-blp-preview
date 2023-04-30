import './index.less';

async function main() {
    const { buf, ext } = await window.message.load();
    const blob = new Blob([buf], { type: "audio/wav" });
    const url = window.URL.createObjectURL(blob);
    const audio = (document.querySelector('#audio') as HTMLAudioElement);
    audio.src = url;
    audio.autoplay = true;
}

main();
