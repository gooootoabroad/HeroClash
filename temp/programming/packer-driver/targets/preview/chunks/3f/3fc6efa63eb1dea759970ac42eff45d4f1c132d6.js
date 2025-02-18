System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, FullScreenMask;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5a6d1LvhBtPy54ZVXRWrH0I", "fullScreenMask", undefined);
      /* 全屏半透明遮罩 */


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Graphics']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FullScreenMask", FullScreenMask = (_dec = ccclass('FullScreenMask'), _dec(_class = class FullScreenMask extends Component {
        start() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3fc6efa63eb1dea759970ac42eff45d4f1c132d6.js.map