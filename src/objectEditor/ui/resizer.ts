import { addWindowEvent, EventEmitter } from "./helper/addEvent";
import createElement from "./helper/createElement";
import IDisposable from "./helper/dispose";

export class Resizer extends IDisposable {
    dom: HTMLElement;

    events = {
        resize: this.register(new EventEmitter<{}>()),
    };

    parent: Resizer | null = null;
    children: Resizer[] = [];

    constructor() {
        super();
        this.dom = createElement('div', 'resizer');
        this.register(addWindowEvent('resize', this.onResize));
    }

    callVisibleChildren(method: (this: Resizer) => void) {
        const copy = this.children.slice();
        for (let i = 0; i < copy.length; i++) {
            method.call(copy[i]);
        }
    }

    notify(method: (this: Resizer) => void) {
        try {
            method.call(this);
        } finally {

        }
    }

    dispose(): void {
        super.dispose();
        delete (this as any).dom;
    }

    appendToDom(parent: HTMLElement) {
        this.dom.remove();
        parent.append(this.dom);
    }

    appendChild(resizer: Resizer) {
        resizer.parent = this;
        this.children.push(resizer);
        resizer.appendToDom(this.dom);
    }

    onResize() {

    }
}
