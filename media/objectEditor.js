/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 83:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addWindowEvent": () => (/* binding */ addWindowEvent),
/* harmony export */   "addDocumentEvent": () => (/* binding */ addDocumentEvent),
/* harmony export */   "addDomEvent": () => (/* binding */ addDomEvent),
/* harmony export */   "EventBus": () => (/* binding */ EventBus),
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter)
/* harmony export */ });
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86);

function addWindowEvent(name, cb, options) {
  window.addEventListener(name, cb, options);
  return {
    dispose: () => {
      window.removeEventListener(name, cb, options);
    }
  };
}
function addDocumentEvent(type, listener, options) {
  document.addEventListener(type, listener, options);
  return {
    dispose: () => {
      document.removeEventListener(type, listener, options);
    }
  };
}
function addDomEvent(dom, type, listener, options) {
  dom.addEventListener(type, listener, options);
  return {
    dispose: () => {
      dom.removeEventListener(type, listener, options);
    }
  };
}
const EventBus = _middleware__WEBPACK_IMPORTED_MODULE_0__.Middleware.create(ctx => {
  ctx.emitter.listeners.forEach(lis => {
    lis(ctx.event);
  });
});
class EventEmitter {
  listeners = [];
  /**
   * The event listeners can subscribe to.
   */

  on(listener) {
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


  fire(data) {
    EventBus.call({
      event: data,
      emitter: this
    });
  }

  /**
   * Dispose this object and free resources.
   */
  dispose() {
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
let evt = new EventEmitter();
evt.on(s => {
  console.info('final', s);
});
evt.fire('123');
evt.fire('456');

/***/ }),

/***/ 84:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(name, className, attrs) {
  const div = document.createElement(name);

  if (className) {
    div.className = className;
  }

  if (attrs) {
    Object.keys(attrs).forEach(key => {
      div.setAttribute(key, attrs[key]);
    });
  }

  return div;
}

/***/ }),

/***/ 85:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IDisposable)
/* harmony export */ });
class IDisposable {
  _cbs = [];
  _isDisposed = false;

  register(cb) {
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

/***/ }),

/***/ 86:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Middleware": () => (/* binding */ Middleware)
/* harmony export */ });
class Middleware {
  static create(fn) {
    return new Middleware(fn);
  }

  preHandlers = [];

  constructor(func) {
    this.realFunc = func;
  }

  use(middle) {
    this.preHandlers.push(middle);
    return this;
  }

  callNext(arg, fns) {
    const fn = fns.shift();

    if (fn) {
      fn(arg, arg => this.callNext(arg, fns));
    }
  }

  call(arg) {
    this.callNext(arg, [...this.preHandlers, this.realFunc]);
  }

}

/***/ }),

/***/ 82:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resizer": () => (/* binding */ Resizer)
/* harmony export */ });
/* harmony import */ var _helper_addEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83);
/* harmony import */ var _helper_createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84);
/* harmony import */ var _helper_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85);



class Resizer extends _helper_dispose__WEBPACK_IMPORTED_MODULE_2__.default {
  events = {
    resize: this.register(new _helper_addEvent__WEBPACK_IMPORTED_MODULE_0__.EventEmitter())
  };
  parent = null;
  children = [];

  constructor() {
    super();
    this.dom = (0,_helper_createElement__WEBPACK_IMPORTED_MODULE_1__.default)('div', 'resizer');
    this.register((0,_helper_addEvent__WEBPACK_IMPORTED_MODULE_0__.addWindowEvent)('resize', this.onResize));
  }

  callVisibleChildren(method) {
    const copy = this.children.slice();

    for (let i = 0; i < copy.length; i++) {
      method.call(copy[i]);
    }
  }

  notify(method) {
    try {
      method.call(this);
    } finally {}
  }

  dispose() {
    super.dispose();
    delete this.dom;
  }

  appendToDom(parent) {
    this.dom.remove();
    parent.append(this.dom);
  }

  appendChild(resizer) {
    resizer.parent = this;
    this.children.push(resizer);
    resizer.appendToDom(this.dom);
  }

  onResize() {}

}

/***/ }),

/***/ 48:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _ui_resizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82);


const resizer = new _ui_resizer__WEBPACK_IMPORTED_MODULE_1__.Resizer();
resizer.appendToDom(document.querySelector('div.container'));
resizer.appendChild(new _ui_resizer__WEBPACK_IMPORTED_MODULE_1__.Resizer());
resizer.appendChild(new _ui_resizer__WEBPACK_IMPORTED_MODULE_1__.Resizer());
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=objectEditor.js.map