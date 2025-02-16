System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Mutex, VisibleError, ERROR_CODES, CurrencyManager, _crd, currencyMutexID, storageCurrencyID;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfCurrency(extras) {
    _reporterNs.report("Currency", "./kind", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMutex(extras) {
    _reporterNs.report("Mutex", "../../utils/mutex", _context.meta, extras);
  }

  function _reportPossibleCrUseOfVisibleError(extras) {
    _reporterNs.report("VisibleError", "../../utils/errors", _context.meta, extras);
  }

  function _reportPossibleCrUseOfERROR_CODES(extras) {
    _reporterNs.report("ERROR_CODES", "../../utils/errors", _context.meta, extras);
  }

  _export("CurrencyManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Mutex = _unresolved_2.Mutex;
    }, function (_unresolved_3) {
      VisibleError = _unresolved_3.VisibleError;
      ERROR_CODES = _unresolved_3.ERROR_CODES;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "70b9eAYYQJPTbdfMHsKtXLh", "manager", undefined); // 资源管理模块
      // 铜钱 进阶石 铁矿 战魂石 和田玉


      // 货币资源互斥锁ID
      currencyMutexID = "currency"; // 文件中的货币资源ID

      storageCurrencyID = "currency"; // function sleep(ms: number): Promise<void> {
      //     return new Promise(resolve => setTimeout(resolve, ms));
      // }
      // 货币资源管理器

      _export("CurrencyManager", CurrencyManager = class CurrencyManager {
        constructor() {
          // 货币缓存
          this.currencyCache = void 0;
          // 初始化缓存
          this.currencyCache = this.getCurrencyFromStorage();
        } // 获取货币资源管理器的单例


        static getInstance() {
          if (!CurrencyManager.instance) {
            CurrencyManager.instance = new CurrencyManager();
          }

          return CurrencyManager.instance;
        } // 获取货币缓存


        getCurrencyFromCache() {
          return this.currencyCache;
        } // 从存储中获取货币


        getCurrencyFromStorage() {
          var storedData = localStorage.getItem(storageCurrencyID);

          if (storedData) {
            return JSON.parse(storedData);
          }

          console.log("not init currency resource, return default currency");
          return this.getDefaultCurrency();
        } // 获取默认的资源数据


        getDefaultCurrency() {
          return {
            copper: 0,
            evolutionStone: 0,
            ironOre: 0,
            battleSoulStone: 0,
            hetianJade: 0
          };
        } // 检查指定ID的资源是否足够


        checkResource(currency) {
          for (var key of Object.keys(currency)) {
            if (this.currencyCache[key] < Math.abs(currency[key])) {
              return false;
            }
          }

          return true;
        } // 更新货币资源


        updateResource(currency) {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              yield (_crd && Mutex === void 0 ? (_reportPossibleCrUseOfMutex({
                error: Error()
              }), Mutex) : Mutex).getInstance().lock(currencyMutexID);
              console.info("update currency %s", JSON.stringify(currency));

              var currentCurrency = _this.getCurrencyFromStorage();

              console.info("current currency %s", JSON.stringify(currentCurrency));

              for (var key of Object.keys(currency)) {
                var tmp = currentCurrency[key] + currency[key];

                if (tmp < 0) {
                  console.error("Failed to update currency, %s is not enough, current:%d, need: %d", key, currentCurrency[key], Math.abs(currency[key]));
                  throw new Error("Failed to update currency: Insufficient resources");
                }

                currentCurrency[key] = tmp;
              } // 保存更新后的资源


              _this.saveResources(currentCurrency); // 更新缓存


              _this.currencyCache = currentCurrency;

              var news = _this.getCurrencyFromStorage();

              console.info("after set is %s", JSON.stringify(news));
              (_crd && Mutex === void 0 ? (_reportPossibleCrUseOfMutex({
                error: Error()
              }), Mutex) : Mutex).getInstance().unlock(currencyMutexID);
            } catch (error) {
              console.error("Failed to update currency, err: %s", error.message);

              if (error instanceof (_crd && VisibleError === void 0 ? (_reportPossibleCrUseOfVisibleError({
                error: Error()
              }), VisibleError) : VisibleError)) {
                // 非加锁失败的错误需要解锁
                if (error.code != (_crd && ERROR_CODES === void 0 ? (_reportPossibleCrUseOfERROR_CODES({
                  error: Error()
                }), ERROR_CODES) : ERROR_CODES).LOCK_FAILED) {
                  (_crd && Mutex === void 0 ? (_reportPossibleCrUseOfMutex({
                    error: Error()
                  }), Mutex) : Mutex).getInstance().unlock(currencyMutexID);
                }
              }

              throw new Error("Failed to update currency: " + error.message);
            }
          })();
        } // 保存资源到本地存储


        saveResources(currency) {
          try {
            console.info("set %s resources %s", storageCurrencyID, JSON.stringify(currency));
            localStorage.setItem(storageCurrencyID, JSON.stringify(currency));
          } catch (error) {
            console.error("save %s resources failed, error: %s", storageCurrencyID, error.message);
            throw new Error("Failed to save currency: " + error.message);
          }
        }

      });

      // 货币资源管理器实例
      CurrencyManager.instance = void 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=42c20f24dc18acc4a96c9b06ddec5992f5d23068.js.map