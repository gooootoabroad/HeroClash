System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, user;

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

      _cclegacy._RF.push({}, "42855vsqGpGw7sf1h9WtX1Q", "user", undefined); // 界面测试用的


      __checkObsolete__(['_decorator', 'Component', 'input', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("user", user = (_dec = ccclass('user'), _dec(_class = class user extends Component {
        start() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8aeec5988f48d821f6edd5f739925bb76bcaa3f0.js.map