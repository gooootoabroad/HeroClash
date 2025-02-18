System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, HeroRarityType, HeroProfessionType, HeroSkillType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "00f75MmsHVEzbCcKBl1Vmd2", "attribute", undefined);

      /* 英雄属性定义 */
      // 英雄稀有度定义
      _export("HeroRarityType", HeroRarityType = /*#__PURE__*/function (HeroRarityType) {
        HeroRarityType["normal"] = "normal";
        HeroRarityType["well"] = "well";
        HeroRarityType["excellent"] = "excellent";
        HeroRarityType["epic"] = "epic";
        HeroRarityType["legend"] = "legend";
        return HeroRarityType;
      }({})); // 英雄职业定义


      _export("HeroProfessionType", HeroProfessionType = /*#__PURE__*/function (HeroProfessionType) {
        HeroProfessionType["warrior"] = "warrior";
        HeroProfessionType["mage"] = "mage";
        HeroProfessionType["crossbowman"] = "crossbowman";
        return HeroProfessionType;
      }({})); // 英雄技能定义 TODO：待补充


      _export("HeroSkillType", HeroSkillType = /*#__PURE__*/function (HeroSkillType) {
        return HeroSkillType;
      }({})); // 英雄属性


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=93851fcff7a5c57d2269ab8bed84fc12107808f9.js.map