import War3MapMmp from '../../parser/mmp';
import War3MapW3c from '../../parser/w3c';
import War3MapW3i from '../../parser/w3i';
import './index.less';

declare const x_spreadsheet: any;

const backgroundColor = document.documentElement.style.getPropertyValue('--vscode-editor-background');
const foreColor = document.documentElement.style.getPropertyValue('--vscode-editor-foreground');
const strokeColor = document.documentElement.style.getPropertyValue('--vscode-editor-lineHighlightBorder');

x_spreadsheet.defaultStyle.drawBoxDefaultBgColor = backgroundColor;
x_spreadsheet.defaultStyle.tableGridStyle.fillStyle = backgroundColor;
x_spreadsheet.defaultStyle.tableFixedHeaderCleanStyle.fillStyle = backgroundColor;
x_spreadsheet.defaultStyle.tableFixedLeftTopCell.fillStyle = backgroundColor;
x_spreadsheet.defaultStyle.tableFixedHeaderStyle.strokeStyle = strokeColor;
x_spreadsheet.defaultStyle.tableGridStyle.strokeStyle = strokeColor;
x_spreadsheet.defaultStyle.tableFixedHeaderStyle.fillStyle = foreColor;

function parseData(str: string) {
    if (str.startsWith('X')) {
        return { x: parseInt(str.slice(1)) - 1 };
    } else if (str.startsWith('Y')) {
        return { y: parseInt(str.slice(1)) - 1 };
    } else if (str.startsWith('K')) {
        return { value: str.slice(1).replace(/^"|"$/g, '') };
    }
}

function parseDatas(strs: string[]): { x?: number, y?: number, value?: string } {
    return strs.reduce((prev, str) => {
        const data = parseData(str);
        return { ...prev, ...data };
    }, {});
}

// @ts-ignore
const s = x_spreadsheet("#example", {
    showToolbar: false,
    showBottomBar: false,
    showContextmenu: false,
    mode: 'read', // 'edit'
    style: {
        // 背景颜色
        bgcolor: backgroundColor,
        // 文字颜色
        color: foreColor,
    }
});

message.load().then((data) => {
    if (window.currentResourceURI.path.toLowerCase().endsWith('.slk')) {
        const decoder = new TextDecoder('utf-8');
        const str = decoder.decode(data.buf);
        const rows = {};
        let prevY = 0;
        let maxX = 1;
        let maxY = 1;
        str.split(/[\r\n]/g).forEach(line => {
            const data = line.split(';');
            if (data[0] !== 'C') {
                return;
            }
            let x = 0;
            const cellData = parseDatas(data.slice(1));
            if (!cellData.value) return;
            if (!cellData.y) {
                cellData.y = prevY;
            } else {
                prevY = cellData.y;
                maxY = Math.max(maxY, cellData.y);
            }
            rows[cellData.y] = rows[cellData.y] || { cells: [] };
            rows[cellData.y].cells[cellData.x || x] = { text: cellData.value };
            maxX = Math.max(maxX, cellData.x || x);
        });

        s.options.row = { len: Object.keys(rows).length, height: 25, };
        s.options.col = {
            len: maxX, width: 100,
            indexWidth: 60,
            minWidth: 60,
        };
        s.loadData({
            name: 'Sheet1',
            rows: rows,
        });
    } else if (window.currentResourceURI.path.toLowerCase().endsWith('.mmp')) {
        const mmp = new War3MapMmp();
        mmp.load(data.buf);
        const rows = [];
        const styles = [];
        rows[0] = {
            cells: [
                { text: 'type' },
                { text: 'x' },
                { text: 'y' },
                { text: 'color' },
            ]
        };
        mmp.icons.forEach(icon => {
            styles.push({ color: icon.getRgba() });
            rows.push({
                cells: [
                    { text: icon.type },
                    { text: icon.location[0] },
                    { text: icon.location[1] },
                    {
                        text: icon.getColorString(), style: styles.length - 1,
                    },
                ]
            });
        });
        s.options.row = { len: Math.max(rows.length, 100), height: 25, };
        s.loadData({
            name: 'Sheet1',
            styles,
            rows,
        });
    } else if (window.currentResourceURI.path.toLowerCase().endsWith('.w3c')) {
        const w3c = new War3MapW3c();
        w3c.load(data.buf, 0);
        const rows = [];
        const styles = [];
        rows[0] = {
            cells: [
                { text: 'targetLocationX' },
                { text: 'targetLocationY' },
                { text: 'targetLocationZ' },
                { text: 'rotation' },
                { text: 'angleOfAttack' },
                { text: 'distance' },
                { text: 'roll' },
                { text: 'fieldOfView' },
                { text: 'farClippingPlane' },
                { text: 'nearClippingPlane' },
                { text: 'cinematicName' },
            ]
        };
        w3c.cameras.forEach(camera => {
            rows.push({
                cells: [
                    { text: camera.targetLocation[0].toFixed(6) },
                    { text: camera.targetLocation[1].toFixed(6) },
                    { text: camera.targetLocation[2].toFixed(6) },
                    { text: String(camera.rotation) },
                    { text: String(camera.angleOfAttack) },
                    { text: String(camera.distance) },
                    { text: String(camera.roll) },
                    { text: String(camera.fieldOfView) },
                    { text: String(camera.farClippingPlane) },
                    { text: String(camera.nearClippingPlane) },
                    { text: String(camera.cinematicName) },
                ]
            });
        });
        s.options.row = { len: Math.max(rows.length, 100), height: 25, };
        s.loadData({
            name: 'Sheet1',
            styles,
            rows,
        });
    } else if (window.currentResourceURI.path.toLowerCase().endsWith('.w3i')) {
        const w3i = new War3MapW3i();
        w3i.load(data.buf);
        const rows = [];
        const styles = [];
        [
            'version',
            'saves', 
            'editorVersion',
            { key: 'buildVersion', value: () => w3i.getBuildVersion() },
            'name',
            'description',
            'recommendedPlayers',
            'tileset',
        ].forEach(row => {
            const key = typeof row === 'string' ? row : row.key;
            const value = typeof row === 'string' ? w3i[key] : row.value();
            rows.push({
                cells: [
                    { text: key }, { text: String(value) },
                ]
            });
        });
        s.options.row = { len: Math.max(rows.length, 100), height: 25, };
        s.loadData({
            name: 'Sheet1',
            styles,
            rows,
        });
    }
});
