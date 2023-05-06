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
        let y = prevY;
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
    console.info(s.options);
    s.loadData({
        name: 'Sheet1',
        rows: rows,
    });
});
