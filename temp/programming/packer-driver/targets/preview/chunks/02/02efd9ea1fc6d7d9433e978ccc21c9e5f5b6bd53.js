System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Mutex, ResourceManager, _crd, resourceMutexID, storageResourceID;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function loadResourcesFromLocalStorage() {
    var resourcesData = localStorage.getItem(storageResourceID);

    if (resourcesData) {
      var parsedData = JSON.parse(resourcesData);
      var resourcesMap = new Map();

      for (var _id in parsedData) {
        if (parsedData.hasOwnProperty(_id)) {
          resourcesMap.set(_id, parsedData[_id]);
        }
      }

      return resourcesMap;
    } else {
      console.log('No resources found in localStorage');
      return new Map();
    }
  } // 资源管理器类


  function _reportPossibleCrUseOfResourceType(extras) {
    _reporterNs.report("ResourceType", "./kind", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResource(extras) {
    _reporterNs.report("Resource", "./kind", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMutex(extras) {
    _reporterNs.report("Mutex", "../utils/mutex", _context.meta, extras);
  }

  _export("ResourceManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Mutex = _unresolved_2.Mutex;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "39181wALqRPJ4HUKiE7kwnJ", "resourceManager", undefined); // 资源管理模块


      // 资源管理互斥锁ID
      resourceMutexID = "resource"; // 存储下资源ID

      storageResourceID = "resource";

      _export("ResourceManager", ResourceManager = class ResourceManager {
        constructor() {
          this.resourcesMap = void 0;
          this.resourcesMap = loadResourcesFromLocalStorage();
        } // 获取资源管理器的单例


        static getInstance() {
          if (!ResourceManager.instance) {
            ResourceManager.instance = new ResourceManager();
          }

          return ResourceManager.instance;
        } // 获取指定ID资源


        getResources() {
          if (!this.resourcesMap.has(storageResourceID)) {
            // 如果资源不存在，则创建默认资源
            console.log("not init");
            this.resourcesMap.set(id, this.createDefaultResources());
            return this.createDefaultResources();
          }

          return this.resourcesMap.get(id);
        }

        sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        } // 更新指定的资源


        updateResource(type, amount) {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              yield (_crd && Mutex === void 0 ? (_reportPossibleCrUseOfMutex({
                error: Error()
              }), Mutex) : Mutex).getInstance().lock(resourceMutexID);
              console.info("update resource %s %d", type, amount); //await this.sleep(2000);

              var resources = _this.getResources(storageResourceID);

              console.info("now resource %s", JSON.stringify(resources));
              resources[type] += amount; // 保存更新后的资源

              _this.saveResources(resources);

              var news = _this.getResources(storageResourceID);

              console.info("after set %s", JSON.stringify(news));
            } catch (error) {
              console.error("Failed to update resource, err: %s", error.message);
              throw new Error("Failed to update resource: " + error.message);
            } finally {
              // 不管怎样都尝试解锁
              (_crd && Mutex === void 0 ? (_reportPossibleCrUseOfMutex({
                error: Error()
              }), Mutex) : Mutex).getInstance().unlock(resourceMutexID);
            }
          })();
        } // 检查指定ID的资源是否足够


        checkResource(id, type, amount) {
          var resources = this.getResources(id);
          return resources[type] >= amount;
        } // 从本地存储加载指定ID资源


        loadResources(id) {
          var resourcesStr = localStorage.getItem(id);

          if (resourcesStr) {
            return JSON.parse(resourcesStr);
          } // 返回默认值


          return this.createDefaultResources();
        } // 保存用户资源到本地存储


        saveResources(resources) {
          try {
            console.info("set %s resources %s", storageResourceID, JSON.stringify(resources));
            localStorage.setItem(storageResourceID, JSON.stringify(resources));
            return true;
          } catch (error) {
            console.error("save %s resources failed, error: %s", storageResourceID, error.message);
            return false;
          }
        } // 创建默认的资源数据


        createDefaultResources() {
          return {
            copper: 0,
            evolutionStone: 0,
            ironOre: 0,
            battleSoulStone: 0,
            hetianJade: 0
          };
        }

      });

      // 资源管理器实例
      ResourceManager.instance = void 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=02efd9ea1fc6d7d9433e978ccc21c9e5f5b6bd53.js.map