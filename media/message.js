/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Message)
/* harmony export */ });
class Message {
  timeout = [];
  requestsMap = {};

  constructor() {
    window.addEventListener('message', async e => {
      if (this.requestsMap[e.data.requestId]) {
        this.requestsMap[e.data.requestId].resolve(e.data.data);
        delete this.requestsMap[e.data.requestId];
      }
    });
  }

  async load() {
    return await this._trans('load');
  }

  async loadBlp(blpPath) {
    return await this._trans('loadBlp', blpPath);
  }

  async loadText(blpPath) {
    return await this._trans('loadText', blpPath);
  }

  async loadTextArray(blpPath) {
    return await this._trans('loadTextArray', blpPath);
  }

  async loadResource(blpPath) {
    return await this._trans('loadResource', blpPath);
  }

  _trans(type, data = null, timeout = -1) {
    const requestId = parseInt((Math.random() + '').slice(2), 10);
    const request = {
      requestId,
      resolve: () => {}
    };
    const p = new Promise((resolve, reject) => {
      request.resolve = resolve;

      if (timeout > 0) {
        setTimeout(() => {
          delete this.requestsMap[requestId];
          reject(`call method ${type} data=${data} timeout ${timeout}`);
        }, timeout);
      }
    });
    this.requestsMap[requestId] = request;
    window.vscode.postMessage({
      type,
      requestId,
      data
    });
    return p;
  }

}
window.message = new Message();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=message.js.map