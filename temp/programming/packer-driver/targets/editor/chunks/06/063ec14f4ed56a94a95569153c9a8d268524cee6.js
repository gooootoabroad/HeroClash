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
//# sourceMappingURL=063ec14f4ed56a94a95569153c9a8d268524cee6.js.map