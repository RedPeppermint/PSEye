(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-window-token', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-window-token'] = {}, global.ng.core));
}(this, (function (exports, core) { 'use strict';

    var WINDOW = new core.InjectionToken('WindowToken', typeof window !== 'undefined' && window.document
        ? { providedIn: 'root', factory: function () { return window; } }
        : { providedIn: 'root', factory: function () { return undefined; } });

    /*
     * Public API Surface of ngx-window-token
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.WINDOW = WINDOW;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-window-token.umd.js.map
