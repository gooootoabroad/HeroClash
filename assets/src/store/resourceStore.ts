// 资源商城
import { _decorator, Node, Component, Event, Button, Label } from 'cc';
import { CurrencyType, Currency } from '../resource/currency/kind';
import { CurrencyManager } from '../resource/currency/manager';
const { ccclass, property } = _decorator;

// 购买资源属性
interface purchaseResource {
    // 资源类型
    kind: CurrencyType,
    // 购买一次的数量
    purchaseQuantity: number,
    // 剩余购买次数
    purchasesRemaining: number,
    // 购买价格
    purchaseCost?: purchaseCost,
}

// 购买价格
interface purchaseCost {
    // 资源类型
    kind: CurrencyType,
    // 花费数量
    cost: number;
}

@ccclass('resourceStore')
export class resourceStore extends Component {
    // 货币管理实例
    private currencyManager: CurrencyManager = null;

    // 每日免费铜钱
    @property(Node)
    private freeCopper: Node = null;
    // 每日看广告免费铜钱
    @property(Node)
    private adsCopper: Node = null;
    // 每日免费和田玉
    @property(Node)
    private freeHetianJade: Node = null;
    // 每日看广告免费和田玉
    @property(Node)
    private adsHetianJade: Node = null;
    // 每日打折进阶石
    @property(Node)
    private discountEvolutionStone: Node = null;
    // 每日打折铁矿
    @property(Node)
    private discountIronOre: Node = null;
    // 每日打折战魂石
    @property(Node)
    private discountBattleSoulStone: Node = null;

    // 创建一个 Map 保存按钮和对应的购买资源
    private storeMap: Map<Node, purchaseResource> = new Map();

    // 初始化资源限制
    protected onLoad(): void {
        this.currencyManager = CurrencyManager.getInstance();
        // 每日免费铜钱，每次10，只能购买3次
        this.storeMap.set(this.freeCopper, {
            kind: CurrencyType.Copper,
            purchaseQuantity: 10,
            purchasesRemaining: 3
        });
        // 每日看广告免费铜钱，每次100，只能购买3次
        this.storeMap.set(this.adsCopper, {
            kind: CurrencyType.Copper,
            purchaseQuantity: 100,
            purchasesRemaining: 3
        });
        // 每日免费和田玉，每次10，只能购买1次
        this.storeMap.set(this.freeHetianJade, {
            kind: CurrencyType.HetianJade,
            purchaseQuantity: 10,
            purchasesRemaining: 1
        });
        // 每日看广告免费和田玉，每次100，只能购买3次
        this.storeMap.set(this.adsHetianJade, {
            kind: CurrencyType.HetianJade,
            purchaseQuantity: 100,
            purchasesRemaining: 3
        });
        // 每日打折进阶石，每次100，只能购买3次
        this.storeMap.set(this.discountEvolutionStone, {
            kind: CurrencyType.EvolutionStone,
            purchaseQuantity: 100,
            purchasesRemaining: 3,
            purchaseCost: {
                kind: CurrencyType.Copper,
                cost: 199
            }
        });
        // 每日打折铁矿，每次100，只能购买3次
        this.storeMap.set(this.discountIronOre, {
            kind: CurrencyType.IronOre,
            purchaseQuantity: 100,
            purchasesRemaining: 3,
            purchaseCost: {
                kind: CurrencyType.Copper,
                cost: 199
            }
        });
        // 每日打折战魂石，每次100，只能购买3次
        this.storeMap.set(this.discountBattleSoulStone, {
            kind: CurrencyType.BattleSoulStone,
            purchaseQuantity: 100,
            purchasesRemaining: 3,
            purchaseCost: {
                kind: CurrencyType.HetianJade,
                cost: 99
            }
        });
    }

    // 根据 purchaseResource 创建 Currency
    private createCurrency(purchase: purchaseResource): Currency {
        const currency: Currency = {};
        // 根据 purchase.kind 动态设置对应的数量
        currency[purchase.kind] = purchase.purchaseQuantity;
        // 如果 purchaseCost 存在，则为对应的 currency 类型添加购买价格
        if (purchase.purchaseCost) {
            const costKind = purchase.purchaseCost.kind;
            currency[costKind] = (currency[costKind] || 0) - purchase.purchaseCost.cost;
        }

        return currency;
    }

    // 购买资源
    public onPurchaseButtonClick(event: Event) {
        // 先将button禁用
        let node = event.target as Node;
        let button = node.getComponent(Button);
        button.interactable = false;

        // 获取父节点信息（父节点包含label等）
        let parentNode = node.getParent();
        let purchaseInfo = this.storeMap.get(parentNode);
        if (!purchaseInfo || purchaseInfo.purchasesRemaining <= 0) {
            console.log(`No remaining purchases for this resource. ${purchaseInfo}`);
            return;
        }

        let currency = this.createCurrency(purchaseInfo);
        // 更新资源
        try {
            this.currencyManager.updateResource(currency);
        } catch (error) {
            console.error('Error updating resource:', error.message);
            button.interactable = true;
            throw new Error(`Failed to update currency`);
        }

        purchaseInfo.purchasesRemaining -= 1;  // 减少剩余购买次数
        console.log(`Purchased ${purchaseInfo.purchaseQuantity} of ${purchaseInfo.kind.toString()}`);
        console.log(`Remaining purchases: ${purchaseInfo.purchasesRemaining}`);

        // 更新资源状态
        this.updateNodeStates(parentNode);
    }


    // 更新节点资源的状态
    updateNodeStates(node: Node) {
        if (!this.storeMap.has(node)) {
            return;
        }

        let resource = this.storeMap.get(node);
        let button = node.getChildByName("BuyButton").getComponent(Button);
        // 如果剩余购买次数为 0，禁用按钮
        button.interactable = resource.purchasesRemaining > 0;
        // 更新剩余次数
        let label = node.getChildByName("LimitText").getComponent(Label);
        label.string = `剩余次数：${resource.purchasesRemaining}`;

    }

    // 更新所有资源信息
    updateAllNodeStates() {
        this.storeMap.forEach((_, node) => {
            this.updateNodeStates(node);
        })
    }

    start() {
        this.updateAllNodeStates();
    }

    update(deltaTime: number) {

    }
}

