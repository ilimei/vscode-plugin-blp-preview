export class Middleware<T> {

    static create<S>(fn: (arg: S) => void) {
        return new Middleware<S>(fn);
    }

    preHandlers: Array<(arg: T, next: (arg: T) => void) => void> = [];
    realFunc: (arg: T) => void;

    private constructor(func: (arg: T) => void) {
        this.realFunc = func;
    }

    use(middle: (arg: T, next: (arg: T) => void) => void) {
        this.preHandlers.push(middle);
        return this;
    }

    private callNext(arg: T, fns: Array<(arg: T, next: (arg: T) => void) => void>) {
        const fn = fns.shift();
        if (fn) {
            fn(arg, (arg: T) => this.callNext(arg, fns));
        }
    }

    call(arg: T) {
        this.callNext(arg, [...this.preHandlers, this.realFunc]);
    }
}
