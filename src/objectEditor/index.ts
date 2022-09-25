import './style.less';

import { Orientation, Sizing, SplitView } from './base/browser/ui/splitview/splitview';
import { PaneView, Pane } from './base/browser/ui/splitview/paneview';
import { $ } from './base/browser/dom';
import { GridView, IView } from './base/browser/ui/grid/gridview';
import { Emitter, Event } from './base/common/event';
import * as assert from './base/common/assert';
import { Direction, Grid } from './base/browser/ui/grid/grid';
import { Disposable } from './base/common/lifecycle';
import { FastDomNode } from './base/browser/fastDomNode';
import { DataTree } from './base/browser/ui/tree/dataTree';
import { Table } from './base/browser/ui/table/tableWidget';
import { IListVirtualDelegate } from './base/browser/ui/list/list';
import { IDataSource, ITreeRenderer } from './base/browser/ui/tree/tree';
import { Color } from './base/common/color';
import { ITableColumn, ITableRenderer, ITableVirtualDelegate } from './base/browser/ui/table/table';
import { ScrollbarVisibility } from './base/common/scrollable';

class TestPane extends Pane {
    protected renderHeader(container: HTMLElement): void {
        const title = $('.title');
        title.innerHTML = '123';
        container.append(title);
    }
    protected renderBody(container: HTMLElement): void {
        // container.append($('.content'));
    }
    protected layoutBody(height: number, width: number): void {
        console.info(height, width);
    }

}

class TestView extends Disposable implements IView {

    private readonly _onDidChange = new Emitter<{ width: number; height: number } | undefined>();
    readonly onDidChange = this._onDidChange.event;
    private _fastDom: FastDomNode<HTMLElement>;

    get minimumWidth(): number { return this._minimumWidth; }
    set minimumWidth(size: number) { this._minimumWidth = size; this._onDidChange.fire(undefined); }

    get maximumWidth(): number { return this._maximumWidth; }
    set maximumWidth(size: number) { this._maximumWidth = size; this._onDidChange.fire(undefined); }

    get minimumHeight(): number { return this._minimumHeight; }
    set minimumHeight(size: number) { this._minimumHeight = size; this._onDidChange.fire(undefined); }

    get maximumHeight(): number { return this._maximumHeight; }
    set maximumHeight(size: number) { this._maximumHeight = size; this._onDidChange.fire(undefined); }

    private _element: HTMLElement;
    get element(): HTMLElement { this._onDidGetElement.fire(); return this._element; }

    private readonly _onDidGetElement = new Emitter<void>();
    readonly onDidGetElement = this._onDidGetElement.event;

    private _width = 0;
    get width(): number { return this._width; }

    private _height = 0;
    get height(): number { return this._height; }

    get size(): [number, number] { return [this.width, this.height]; }

    private readonly _onDidLayout = new Emitter<{ width: number; height: number }>();
    readonly onDidLayout: Event<{ width: number; height: number }> = this._onDidLayout.event;

    private readonly _onDidFocus = new Emitter<void>();
    readonly onDidFocus: Event<void> = this._onDidFocus.event;

    constructor(
        private _minimumWidth: number,
        private _maximumWidth: number,
        private _minimumHeight: number,
        private _maximumHeight: number
    ) {
        super();
        assert.assert(_minimumWidth <= _maximumWidth);
        assert.assert(_minimumHeight <= _maximumHeight);

        this._element = $('div');
        this._fastDom = new FastDomNode(this._element);
    }

    layout(width: number, height: number): void {
        this._width = width;
        this._height = height;
        this._fastDom.setWidth(width);
        this._fastDom.setHeight(height);
        this._onDidLayout.fire({ width, height });
    }

    focus(): void {
        this._onDidFocus.fire();
    }

    dispose(): void {
        super.dispose();
        this._onDidChange.dispose();
        this._onDidGetElement.dispose();
        this._onDidLayout.dispose();
        this._onDidFocus.dispose();
    }
}

document.documentElement.style.setProperty('--sash-size', 4 + 'px');
document.documentElement.style.setProperty('--sash-hover-size', 4 + 'px');

const view1 = new TestView(50, Number.MAX_VALUE, 50, Number.MAX_VALUE);
const grid = new Grid(view1);
document.querySelector('div.container')!.appendChild(grid.element);
grid.layout(document.documentElement.clientWidth, document.documentElement.clientHeight);
window.onresize = () => {
    grid.layout(document.documentElement.clientWidth, document.documentElement.clientHeight);
};

const view2 = new TestView(50, Number.MAX_VALUE, 50, Number.MAX_VALUE);

class TreeData {
    title: string;
    children?: TreeData[];
}

class Template extends Disposable {
    private _el: HTMLElement;
    constructor(container: HTMLElement) {
        super();
        this._el = $('.tree-data');
        container.append(this._el);
    }

    render(data: TreeData) {
        this._el.innerHTML = data.title;
    }

    public dispose(): void {
        super.dispose();
        this._el.remove();
    }
}

class TreeAdapter implements IListVirtualDelegate<TreeData>, IDataSource<TreeData, TreeData> {
    getListRender(): ITreeRenderer<TreeData, void, Template>[] {
        return [
            {
                templateId: 'test',
                renderTemplate: container => {
                    return new Template(container);
                },
                renderElement(element, index, templateData, height) {
                    templateData.render(element.element);
                },
                disposeTemplate(templateData) {
                    templateData.dispose();
                },
                renderTwistie(element, twistieElement) {
                    if (element.children) {
                        twistieElement.innerHTML = '';
                        twistieElement.append($('.folder'));
                    }
                    return true;
                },
            }
        ];
    }

    hasChildren?(element: TreeData): boolean {
        console.info('hasChildren', element);
        return !!element.children;
    }

    getChildren(element: TreeData): Iterable<TreeData> {
        return element.children || [];
    }

    getHeight(element: TreeData): number {
        return 24;
    }

    getTemplateId(element: TreeData): string {
        return 'test';
    }

    hasDynamicHeight?(element: TreeData): boolean {
        return false;
    }

    getDynamicHeight?(element: TreeData): number | null {
        return null;
    }

    setDynamicHeight?(element: TreeData, height: number): void {

    }
}

const adapt = new TreeAdapter();
grid.addView(view2, 200, view1, Direction.Left);
const data = new DataTree<TreeData, TreeData>('', view2.element, adapt, adapt.getListRender(), adapt, {
    findWidgetEnabled: true,
});
data.setInput({
    title: '123',
    children: [
        {
            title: '人族',
            children: [
                { title: '单位' },
                { title: '标准技能' }
            ],
        },
        {
            title: '789'
        }
    ]
});
// data.style({
//     listFocusAndSelectionBackground: Color.fromHex('#37373d'),
//     listActiveSelectionBackground: Color.fromHex('#37373d'),
// });

class IRowData {
    title: string;
    value: string;
}

class TableAdapt implements ITableVirtualDelegate<IRowData> {
    headerRowHeight: number = 24;

    getHeight(row: IRowData): number {
        return 24;
    }

    getColumns(): ITableColumn<IRowData, any>[] {
        return [
            {
                label: '名字',
                weight: 200,
                templateId: 'title',
                project(row: IRowData) {
                    return { title: row.title };
                }
            },
            {
                label: '值',
                weight: 200,
                templateId: 'value',
                project(row: IRowData) {
                    return { title: row.value };
                }
            }
        ];
    }

    getRenders(): ITableRenderer<any, any>[] {
        return [
            {
                templateId: 'title',
                renderTemplate: container => {
                    return new Template(container);
                },
                renderElement(element, index, templateData, height) {
                    templateData.render(element);
                },
                disposeTemplate(templateData) {
                    templateData.dispose();
                },
            },
            {
                templateId: 'value',
                renderTemplate: container => {
                    return new Template(container);
                },
                renderElement(element, index, templateData, height) {
                    templateData.render(element);
                },
                disposeTemplate(templateData) {
                    templateData.dispose();
                },
            }
        ];
    }
}

const tableAdapt = new TableAdapt();

const table = new Table<IRowData>('', view1.element, tableAdapt, tableAdapt.getColumns(), tableAdapt.getRenders(), {
    verticalScrollMode: ScrollbarVisibility.Visible,
});
table.layout(view1.width, view1.height);
table.splice(0, 0, [
    { title: '123', value: '123' },
    { title: '456', value: '456' },
]);
table.style({

})

data.onDidChangeFocus(e => {
    table.setFocus([]);
    table.setSelection([]);
    table.splice(0, table.length, new Array(100).fill(0).map(v => ({ title: Math.random().toString(26), value: '123' })));
    table.layout(view1.width, view1.height);
});