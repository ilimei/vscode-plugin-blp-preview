const { exec } = require('child_process');
import path from "path";
import fs from 'fs-extra';
import { tempPath } from "./fs-helper";

// ensure that osx-copy-image is executable
if (process.platform === 'darwin') { exec(`chmod +x "${path.join(__dirname, 'osx-copy-image')}"`); }

const isWayland = () => process.env.XDG_SESSION_TYPE === 'wayland';
const run = (cmd) => new Promise((done) => exec(cmd, { cwd: __dirname }, (...args) => done(args)));

const copyX11 = (file) => run(`xclip -sel clip -t image/png -i ${file}`);
const copyWayland = (file) => run(`wl-copy < ${file}`);
const copyLinux = (file) => (isWayland() ? copyWayland(file) : copyX11(file));
const copyOsx = (file) => run(`../bind/osx-copy-image ${file}`);
const copyWindows = (file) =>
  run(
    `powershell.exe -ExecutionPolicy Bypass Start-Process -NoNewWindow -FilePath ../bind/file2clip.exe -ArgumentList ${file}`
  );

const simpleCopy = (...list) => {
  const file = list.join(" ");
  return process.platform === 'win32'
    ? copyWindows(file)
    : process.platform === 'darwin'
      ? copyOsx(file)
      : copyLinux(file);
};

const contentCopy = (map) => {
  const list = [];
  for (const key in map) {
    if (!fs.existsSync(map[key])) { continue; }

    let copyPath = path.join(tempPath, key);
    fs.copySync(map[key], copyPath, {overwrite: true});
    const index = key.indexOf('/');
    if (index !== -1) { copyPath = copyPath.substring(0, copyPath.length - key.substring(index).length); }
    if (!list.includes(copyPath)) { list.push(copyPath.replace(/ /g, "\\ ").replace(/\(/g, "\\(").replace(/\)/g, "\\)")); }   // 路径进行转义，否则复制粘贴失败
  }

  const file = list.join(" ");
  return process.platform === 'win32'
    ? copyWindows(file)
    : process.platform === 'darwin'
      ? copyOsx(file)
      : copyLinux(file);
};

export { simpleCopy, contentCopy, isWayland };

/*
  const simpleTest = () => simpleCopy(
              join(__dirname, "package-lock.json"), 
              "/Users/theme/Documents/vscode-plugin/github/TstlDebug/lua",
              join(__dirname, "package.json")
          );
  simpleTest();

  const content = {
    "package-lock.json": join(__dirname, "package-lock.json"),
    "package.json": join(__dirname, "package.json"),
    "lua/json.lua": "/Users/theme/Documents/vscode-plugin/github/TstlStudio/lua/json.lua",
    "lua/tstlDebug.lua": "/Users/theme/Documents/vscode-plugin/github/TstlDebug/lua/tstlDebug.lua"
  }
  contentCopy(content);
*/