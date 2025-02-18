System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, Node, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, storeMenu, store;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6b637uG5lNPFr1CPrgdqT75", "store", undefined); // 商城模块


      __checkObsolete__(['_decorator', 'Button', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator); // 商城菜单

      storeMenu = /*#__PURE__*/function (storeMenu) {
        storeMenu[storeMenu["Resource"] = 0] = "Resource";
        storeMenu[storeMenu["Role"] = 1] = "Role";
        storeMenu[storeMenu["Weapon"] = 2] = "Weapon";
        return storeMenu;
      }(storeMenu || {}); // 商城切换结构体


      _export("store", store = (_dec = ccclass('store'), _dec2 = property(Button), _dec3 = property(Node), _dec4 = property(Button), _dec5 = property(Node), _dec6 = property(Button), _dec7 = property(Node), _dec(_class = (_class2 = class store extends Component {
        constructor() {
          super(...arguments);

          // 资源商城按钮
          _initializerDefineProperty(this, "resourceButton", _descriptor, this);

          // 资源商城画布
          _initializerDefineProperty(this, "resourceCanvas", _descriptor2, this);

          // 武将商城按钮
          _initializerDefineProperty(this, "roleButton", _descriptor3, this);

          // 武将商城画布
          _initializerDefineProperty(this, "roleCanvas", _descriptor4, this);

          // 武器商城按钮
          _initializerDefineProperty(this, "weaponButton", _descriptor5, this);

          // 武器商城画布
          _initializerDefineProperty(this, "weaponCanvas", _descriptor6, this);

          this.storeMap = new Map();
        }

        // 展示资源商城
        change2ResourceStore() {
          this.changeStore(storeMenu.Resource);
        } // 展示武将商城


        change2RoleStore() {
          this.changeStore(storeMenu.Role);
        } // 展示武器商城


        change2WeaponStore() {
          this.changeStore(storeMenu.Weapon);
        } // 切换商城


        changeStore(store) {
          // 先启用其他按钮并隐藏对应的画布
          this.storeMap.forEach((storeItem, key) => {
            if (key !== store) {
              storeItem.button.interactable = true;
              storeItem.canvas.active = false;
            }
          }); // 禁用当前按钮并打开画布

          var currentStoreItem = this.storeMap.get(store);

          if (currentStoreItem) {
            currentStoreItem.button.interactable = false;
            currentStoreItem.canvas.active = true;
          }
        }

        onLoad() {
          this.storeMap.set(storeMenu.Resource, {
            button: this.resourceButton,
            canvas: this.resourceCanvas
          });
          this.storeMap.set(storeMenu.Role, {
            button: this.roleButton,
            canvas: this.roleCanvas
          });
          this.storeMap.set(storeMenu.Weapon, {
            button: this.weaponButton,
            canvas: this.weaponCanvas
          });
        }

        start() {
          this.changeStore(storeMenu.Resource);
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "resourceButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resourceCanvas", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "roleButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "roleCanvas", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "weaponButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "weaponCanvas", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0aab88221a90b7fc9bb9813af61817dbf8cb855c.js.map