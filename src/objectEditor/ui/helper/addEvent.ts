import { Middleware } from "./middleware";

export function addWindowEvent(name: string, cb: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    window.addEventListener(name, cb, options);
    return {
        dispose: () => {
            window.removeEventListener(name, cb, options);
        }
    };
}

export function addDocumentEvent<K extends keyof DocumentEventMap>(type: K, listener: (ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
    document.addEventListener(type, listener, options);
    return {
        dispose: () => {
            document.removeEventListener(type, listener, options);
        }
    };
}

export function addDomEvent<K extends keyof HTMLElementEventMap>(dom: HTMLElement, type: K, listener: (ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
    dom.addEventListener(type, listener, options);
    return {
        dispose: () => {
            dom.removeEventListener(type, listener, options);
        }
    };
}

export interface IEventCtx {
    event: any,
    emitter: EventEmitter<any>
}

export const EventBus = Middleware.create((ctx: IEventCtx) => {
    ctx.emitter.listeners.forEach(lis => {
        lis(ctx.event);
    });
});

export class EventEmitter<T> {
    listeners: Array<(e: T) => any> = [];
    /**
     * The event listeners can subscribe to.
     */
    on(listener: (e: T) => any) {
        this.listeners.push(listener);
        return {
            dispose: () => {
                const index = this.listeners.indexOf(listener);
                if (index > -1) {
                    this.listeners.splice(index, 1);
                }
            }
        };
    }

    /**
     * Notify all subscribers of the {@link EventEmitter.event event}. Failure
     * of one or more listener will not fail this function call.
     *
     * @param data The event object.
     */
    fire(data: T) {
        (EventBus as unknown as Middleware<IEventCtx>).call({
            event: data,
            emitter: this,
        });
    };

    /**
     * Dispose this object and free resources.
     */
    dispose(): void {
        this.listeners.length = 0;
    }
}

EventBus.use((ctx, next) => {
    console.info('before event', ctx.event);
    next(ctx);
    console.info('after event', ctx.event);
    console.info('-------');
});

EventBus.use((ctx, next) => {
    if (ctx.event === '123') {
        ctx.event = ctx.event + '_tail';
        next(ctx);
    } else {
        next(ctx);
    }
});

let evt = new EventEmitter<string>();
evt.on(s => {
    console.info('final', s);
});
evt.fire('123');
evt.fire('456');