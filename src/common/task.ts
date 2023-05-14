const noop = () => { };

export default class Task<T> implements Thenable<T> {
    private promise: Promise<T>;
    private _resolve: (value: T) => void = noop;
    private _reject: (reason?: any) => void = noop;
    private data: T;
    private reason: any;

    static createTask<T>(fn: ()=> Promise<T>): Task<T> {
        const task = new Task<T>();
        fn().then(task.resolve.bind(task), task.reject.bind(task));
        return task;
    }

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            if (this.data) {
                resolve(this.data);
            } else if (this.reason) {
                reject(this.reason);
            }
        });
    }

    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        return this.promise.then(onfulfilled, onrejected);
    }

    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
        return this.promise.catch(onrejected);
    }

    resolve(value: T) {
        this.data = value;
        if (this._resolve) {
            this._resolve(value);
        }
    }

    reject(reason: any) {
        this.reason = reason;
        if (this._reject) {
            this._reject(reason);
        }
    }
}
