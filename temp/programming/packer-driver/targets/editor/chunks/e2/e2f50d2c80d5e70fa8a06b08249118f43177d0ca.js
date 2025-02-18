System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, VisibleError, _crd, ERROR_CODES;

  _export("VisibleError", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b2ccbV6LHRLkJFxvgKFjxjX", "errors", undefined);

      // 自定义错误码结构体
      _export("VisibleError", VisibleError = class VisibleError extends Error {
        constructor(code, message) {
          super(message);
          // 错误码
          this.code = void 0;
          this.code = code;
          this.name = this.constructor.name;
        }

      }); // 错误码定义


      _export("ERROR_CODES", ERROR_CODES = {
        // 加锁失败
        LOCK_FAILED: "LOCK_FAILED"
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e2f50d2c80d5e70fa8a06b08249118f43177d0ca.js.map