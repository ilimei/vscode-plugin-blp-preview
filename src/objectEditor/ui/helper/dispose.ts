export default class IDisposable {
    private _cbs: Array<{ dispose: () => void }> = [];
    private _isDisposed = false;

    register<T extends { dispose: () => void }>(cb: T): T {
        if (this._isDisposed) {
            cb.dispose();
        } else {
            this._cbs.push(cb);
        }
        return cb;
    }

    dispose() {
        this._isDisposed = true;
        while (this._cbs.length) {
            const cb = this._cbs.pop();
            if (cb) {
                cb.dispose();
            }
        }
    }
}
