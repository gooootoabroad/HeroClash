System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, heroBase;

  function _reportPossibleCrUseOfHeroAttribute(extras) {
    _reporterNs.report("HeroAttribute", "./attribute", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1f5f8r7eK9Ae40t4tl2bsI8", "heroBase", undefined); // 英雄基类


      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("heroBase", heroBase = (_dec = ccclass('heroBase'), _dec(_class = class heroBase extends Component {
        constructor() {
          super(...arguments);
          // 英雄属性
          this.attribute = void 0;
        }

        start() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=482ace5d74cf391b4fc8e33c4f506d328d5cd5e2.js.map