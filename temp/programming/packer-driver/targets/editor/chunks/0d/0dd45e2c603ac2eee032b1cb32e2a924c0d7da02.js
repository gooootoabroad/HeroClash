System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, CurrencyType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b7a341QF6FHj450dMJbDzXm", "kind", undefined);

      // 货币资源类型定义
      _export("CurrencyType", CurrencyType = /*#__PURE__*/function (CurrencyType) {
        CurrencyType["Copper"] = "copper";
        CurrencyType["EvolutionStone"] = "evolutionStone";
        CurrencyType["IronOre"] = "ironOre";
        CurrencyType["BattleSoulStone"] = "battleSoulStone";
        CurrencyType["HetianJade"] = "hetianJade";
        return CurrencyType;
      }({})); // 货币资源数据结构


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0dd45e2c603ac2eee032b1cb32e2a924c0d7da02.js.map