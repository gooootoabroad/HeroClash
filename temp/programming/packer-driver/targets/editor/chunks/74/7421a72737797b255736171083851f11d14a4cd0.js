System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, VisibleError, ERROR_CODES, Mutex, _crd;

  function _reportPossibleCrUseOfVisibleError(extras) {
    _reporterNs.report("VisibleError", "./errors", _context.meta, extras);
  }

  function _reportPossibleCrUseOfERROR_CODES(extras) {
    _reporterNs.report("ERROR_CODES", "./errors", _context.meta, extras);
  }

  _export("Mutex", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      VisibleError = _unresolved_2.VisibleError;
      ERROR_CODES = _unresolved_2.ERROR_CODES;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "175f4YSb+pPJLD2GK/88Pio", "mutex", undefined);

      // 互斥锁
      _export("Mutex", Mutex = class Mutex {
        // 获取互斥锁单例
        static getInstance() {
          if (!Mutex.instance) {
            Mutex.instance = new Mutex();
          }

          return Mutex.instance;
        } // 锁函数，使用资源ID进行加锁


        lock(resourceId) {
          // 如果已经加锁，直接报错
          if (Mutex.locks.get(resourceId)) {
            // 锁已经被占用，抛出错误
            throw new (_crd && VisibleError === void 0 ? (_reportPossibleCrUseOfVisibleError({
              error: Error()
            }), VisibleError) : VisibleError)((_crd && ERROR_CODES === void 0 ? (_reportPossibleCrUseOfERROR_CODES({
              error: Error()
            }), ERROR_CODES) : ERROR_CODES).LOCK_FAILED, `Mutex lock failed: resource ${resourceId} is already locked`);
          } // 设置锁


          const wasLocked = Mutex.locks.set(resourceId, true).get(resourceId);

          if (!wasLocked) {
            // 如果设置锁失败，抛出错误
            throw new (_crd && VisibleError === void 0 ? (_reportPossibleCrUseOfVisibleError({
              error: Error()
            }), VisibleError) : VisibleError)((_crd && ERROR_CODES === void 0 ? (_reportPossibleCrUseOfERROR_CODES({
              error: Error()
            }), ERROR_CODES) : ERROR_CODES).LOCK_FAILED, `Mutex lock failed: resource ${resourceId} could not be locked`);
          }
        } // 解锁函数


        unlock(resourceId) {
          if (!Mutex.locks.has(resourceId)) {
            return;
          }

          Mutex.locks.set(resourceId, false);
        }

      });

      // 互斥锁实例
      Mutex.instance = void 0;
      // 锁map
      Mutex.locks = new Map();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7421a72737797b255736171083851f11d14a4cd0.js.map