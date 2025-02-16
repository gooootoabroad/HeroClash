System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Storage1Manager, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d7a5fOTKcFDUrwjYsGovBmg", "storage", undefined);

      // 存储模块
      Storage1Manager = class Storage1Manager {
        static save(key, data) {
          try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
          } catch (error) {
            console.error(`Error saving data to localStorage: ${error}`);
          }
        }

        static load(key) {
          try {
            const jsonData = localStorage.getItem(key);

            if (jsonData) {
              return JSON.parse(jsonData);
            }

            return null;
          } catch (error) {
            console.error(`Error loading data from localStorage: ${error}`);
            return null;
          }
        }

        static remove(key) {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.error(`Error removing data from localStorage: ${error}`);
          }
        }

      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7c73814d90727927e57420cefe600f4498d3e2ed.js.map