const { spawn } = require('child_process');

spawn('D:\\Program Files\\Git\\bin\\bash.exe', ['-c', 'npm run watch'], {
    stdio: 'pipe' 
});

setTimeout(()=>{}, 99999);