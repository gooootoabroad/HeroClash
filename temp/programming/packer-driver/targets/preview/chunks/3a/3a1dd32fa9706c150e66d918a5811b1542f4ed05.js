System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Component, Button, Label, CurrencyType, CurrencyManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, resourceStore;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCurrencyType(extras) {
    _reporterNs.report("CurrencyType", "../resource/currency/kind", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCurrency(extras) {
    _reporterNs.report("Currency", "../resource/currency/kind", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCurrencyManager(extras) {
    _reporterNs.report("CurrencyManager", "../resource/currency/manager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Component = _cc.Component;
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      CurrencyType = _unresolved_2.CurrencyType;
    }, function (_unresolved_3) {
      CurrencyManager = _unresolved_3.CurrencyManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "02dd0VaSTlIrI2MsBDoNRE0", "resourceStore", undefined); // 资源商城


      __checkObsolete__(['_decorator', 'Node', 'Component', 'Event', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator); // 购买资源属性
      // 购买价格

      _export("resourceStore", resourceStore = (_dec = ccclass('resourceStore'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec(_class = (_class2 = class resourceStore extends Component {
        constructor() {
          super(...arguments);
          // 货币管理实例
          this.currencyManager = null;

          // 每日免费铜钱
          _initializerDefineProperty(this, "freeCopper", _descriptor, this);

          // 每日看广告免费铜钱
          _initializerDefineProperty(this, "adsCopper", _descriptor2, this);

          // 每日免费和田玉
          _initializerDefineProperty(this, "freeHetianJade", _descriptor3, this);

          // 每日看广告免费和田玉
          _initializerDefineProperty(this, "adsHetianJade", _descriptor4, this);

          // 每日打折进阶石
          _initializerDefineProperty(this, "discountEvolutionStone", _descriptor5, this);

          // 每日打折铁矿
          _initializerDefineProperty(this, "discountIronOre", _descriptor6, this);

          // 每日打折战魂石
          _initializerDefineProperty(this, "discountBattleSoulStone", _descriptor7, this);

          // 创建一个 Map 保存按钮和对应的购买资源
          this.storeMap = new Map();
        }

        // 初始化资源限制
        onLoad() {
          this.currencyManager = (_crd && CurrencyManager === void 0 ? (_reportPossibleCrUseOfCurrencyManager({
            error: Error()
          }), CurrencyManager) : CurrencyManager).getInstance(); // 每日免费铜钱，每次10，只能购买3次

          this.storeMap.set(this.freeCopper, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).Copper,
            purchaseQuantity: 10,
            purchasesRemaining: 3
          }); // 每日看广告免费铜钱，每次100，只能购买3次

          this.storeMap.set(this.adsCopper, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).Copper,
            purchaseQuantity: 100,
            purchasesRemaining: 3
          }); // 每日免费和田玉，每次10，只能购买1次

          this.storeMap.set(this.freeHetianJade, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).HetianJade,
            purchaseQuantity: 10,
            purchasesRemaining: 1
          }); // 每日看广告免费和田玉，每次100，只能购买3次

          this.storeMap.set(this.adsHetianJade, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).HetianJade,
            purchaseQuantity: 100,
            purchasesRemaining: 3
          }); // 每日打折进阶石，每次100，只能购买3次

          this.storeMap.set(this.discountEvolutionStone, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).EvolutionStone,
            purchaseQuantity: 100,
            purchasesRemaining: 3,
            purchaseCost: {
              kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
                error: Error()
              }), CurrencyType) : CurrencyType).Copper,
              cost: 199
            }
          }); // 每日打折铁矿，每次100，只能购买3次

          this.storeMap.set(this.discountIronOre, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).IronOre,
            purchaseQuantity: 100,
            purchasesRemaining: 3,
            purchaseCost: {
              kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
                error: Error()
              }), CurrencyType) : CurrencyType).Copper,
              cost: 199
            }
          }); // 每日打折战魂石，每次100，只能购买3次

          this.storeMap.set(this.discountBattleSoulStone, {
            kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
              error: Error()
            }), CurrencyType) : CurrencyType).BattleSoulStone,
            purchaseQuantity: 100,
            purchasesRemaining: 3,
            purchaseCost: {
              kind: (_crd && CurrencyType === void 0 ? (_reportPossibleCrUseOfCurrencyType({
                error: Error()
              }), CurrencyType) : CurrencyType).HetianJade,
              cost: 99
            }
          });
        } // 根据 purchaseResource 创建 Currency


        createCurrency(purchase) {
          var currency = {}; // 根据 purchase.kind 动态设置对应的数量

          currency[purchase.kind] = purchase.purchaseQuantity; // 如果 purchaseCost 存在，则为对应的 currency 类型添加购买价格

          if (purchase.purchaseCost) {
            var costKind = purchase.purchaseCost.kind;
            currency[costKind] = (currency[costKind] || 0) - purchase.purchaseCost.cost;
          }

          return currency;
        } // 购买资源


        onPurchaseButtonClick(event) {
          // 先将button禁用
          var node = event.target;
          var button = node.getComponent(Button);
          button.interactable = false; // 获取父节点信息（父节点包含label等）

          var parentNode = node.getParent();
          var purchaseInfo = this.storeMap.get(parentNode);

          if (!purchaseInfo || purchaseInfo.purchasesRemaining <= 0) {
            console.log("No remaining purchases for this resource. " + purchaseInfo);
            return;
          }

          var currency = this.createCurrency(purchaseInfo); // 更新资源

          try {
            this.currencyManager.updateResource(currency);
          } catch (error) {
            console.error('Error updating resource:', error.message);
            button.interactable = true;
            throw new Error("Failed to update currency");
          }

          purchaseInfo.purchasesRemaining -= 1; // 减少剩余购买次数

          console.log("Purchased " + purchaseInfo.purchaseQuantity + " of " + purchaseInfo.kind.toString());
          console.log("Remaining purchases: " + purchaseInfo.purchasesRemaining); // 更新资源状态

          this.updateNodeStates(parentNode);
        } // 更新节点资源的状态


        updateNodeStates(node) {
          if (!this.storeMap.has(node)) {
            return;
          }

          var resource = this.storeMap.get(node);
          var button = node.getChildByName("BuyButton").getComponent(Button); // 如果剩余购买次数为 0，禁用按钮

          button.interactable = resource.purchasesRemaining > 0; // 更新剩余次数

          var label = node.getChildByName("LimitText").getComponent(Label);
          label.string = "\u5269\u4F59\u6B21\u6570\uFF1A" + resource.purchasesRemaining;
        } // 更新所有资源信息


        updateAllNodeStates() {
          this.storeMap.forEach((_, node) => {
            this.updateNodeStates(node);
          });
        }

        start() {
          this.updateAllNodeStates();
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "freeCopper", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "adsCopper", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "freeHetianJade", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "adsHetianJade", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "discountEvolutionStone", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "discountIronOre", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "discountBattleSoulStone", [_dec8], {
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
//# sourceMappingURL=3a1dd32fa9706c150e66d918a5811b1542f4ed05.js.map