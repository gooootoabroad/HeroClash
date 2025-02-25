// 武器抽卡模块
import { _decorator, Node, Component, Event, Button, Label, Vec3, UITransform, Sprite, resources, SpriteFrame, Layers, math } from 'cc';
import { CurrencyType, Currency } from '../resource/currency/kind';
import { CurrencyManager } from '../resource/currency/manager';
import { WeaponryRarityType } from '../resource/weaponry/enum';
import { getWeaponsByRarity } from '../resource/weaponry/weaponry';
import { UserWeaponryAttribute, UserWeaponryManager } from '../resource/weaponry/manager';
import { GEventRecruitWeaponAnimationEnd, GEventRecruitWeaponAnimationStart, GEventShowRecruitPrizeEnd, GEventTarget } from '../utils/event';
const { ccclass, property } = _decorator;

interface recruitInfo {
    // 本次抽卡次数
    times: number
    // 消耗资源类型
    kind: CurrencyType,
    // 花费数量
    cost: number;
}

// 必出传说武器抽卡次数
const legendWeaponsTimes = 50;

@ccclass('weaponRecruit')
export class weaponRecruit extends Component {
    // 货币管理实例
    private currencyManager: CurrencyManager = null;
    // 装备管理实例
    private weaponryManager: UserWeaponryManager = null;

    // 抽取一次的节点
    @property(Node)
    private oneTimeNode: Node = null;
    // 抽取十次的节点
    @property(Node)
    private tenTimesNode: Node = null;
    // 必传说显示节点
    @property(Node)
    private legendTimesNode: Node = null;
    // 展示奖品的节点
    @property(Node)
    private showPrizeNode: Node = null;

    // 当前抽卡次数
    private recruitTimes: number = 0;
    // 每日抽取第一次免费
    private freeOneTimeUsed = false;

    // 创建一个 Map 保存按钮和对应的抽卡信息
    private recruitMap: Map<Node, recruitInfo> = new Map();

    // 初始化资源限制
    protected onLoad(): void {
        // 禁用展示奖品画布
        this.showPrizeNode.parent.active = false;
        this.currencyManager = CurrencyManager.getInstance();
        this.weaponryManager = UserWeaponryManager.getInstance();
        // 抽取一次的信息
        this.recruitMap.set(this.oneTimeNode, {
            times: 1,
            kind: CurrencyType.HetianJade,
            cost: 0
        });
        this.recruitMap.set(this.tenTimesNode, {
            times: 10,
            kind: CurrencyType.HetianJade,
            cost: 0
        });
        // 监听抽卡动画播放完成
        GEventTarget.on(GEventRecruitWeaponAnimationEnd, (data: any) => {
            this.showPrizeCanvas(data);
        }, this);
    }

    // 根据 recruitInfo 创建 Currency
    private createCurrency(recruitInfo: recruitInfo): Currency {
        const currency: Currency = {};
        const costKind = recruitInfo.kind;
        currency[costKind] = (currency[costKind] || 0) - recruitInfo.cost;
        return currency;
    }

    // 开始抽卡
    public onRecruitButtonClick(event: Event) {
        // 先将所有button禁用
        let node = event.target as Node;
        this.isInteractRecruitButton(false);
        let parentNode = node.getParent();
        let recruitInfo = this.recruitMap.get(parentNode);
        if (!recruitInfo) {
            console.warn(`No recruit info.`);
            return;
        }

        // 先更新资源，在抽卡
        let freeRecruit = false;
        if (parentNode == this.oneTimeNode && !this.freeOneTimeUsed) {
            // 免费抽取
            console.log("free");
            freeRecruit = true;
        } else {
            let currency = this.createCurrency(recruitInfo);
            // 更新资源
            try {
                this.currencyManager.updateResource(currency);
            } catch (error) {
                console.error('Error updating resource:', error.message);
                this.isInteractRecruitButton(true);
                throw new Error(`Failed to update currency`);
            }
        }

        // 生成序列号
        let serialNumberList: string[] = [];
        for (let time = 0; time < recruitInfo.times; time++) {
            // 抽卡
            let serialNumber: string;
            if (this.recruitTimes + 1 >= legendWeaponsTimes) {
                serialNumber = this.randomWeaponSerialNumber(WeaponryRarityType.Legend);
                this.recruitTimes = 0;
            } else {
                serialNumber = this.randomWeaponSerialNumber();
                this.recruitTimes += 1;
            }

            serialNumberList.push(serialNumber);
        }

        // 更新武器资源，后续考虑下失败了怎么还原资源
        let createWeapnry = this.weaponryManager.createWeaponry(serialNumberList);
        createWeapnry.weapons
        // 更新节点信息
        this.updateNodeInfo((legendWeaponsTimes - this.recruitTimes), freeRecruit);
        // 播放抽卡动画
        GEventTarget.emit(GEventRecruitWeaponAnimationStart, [...createWeapnry.weapons.values()]);
        let newWeaponryInfo = this.weaponryManager.getWeaponryFromStorage();
        console.log("after weaponry info %s", JSON.stringify(Array.from(newWeaponryInfo.weapons.entries())));
    }

    // 抽卡。可以传入指定的稀有度
    private randomWeaponSerialNumber(rarity?: WeaponryRarityType): string {
        if (!rarity) {
            // 先随机获取一个稀有度
            rarity = this.getRandomRarityByProbability();
        }

        let weaponsMap = getWeaponsByRarity(rarity);
        // 获取 map 中所有的 keys
        const keys = Array.from(weaponsMap.keys());
        return this.getRandomItem(keys);
    }

    // 随机获取武器品级
    private getRandomRarityByProbability(): WeaponryRarityType {
        // 定义每个元素和对应的概率
        const elements = [WeaponryRarityType.Well, WeaponryRarityType.Excellent, WeaponryRarityType.Epic, WeaponryRarityType.Legend];
        const probabilities = [0.60, 0.25, 0.10, 0.05];  // 对应的概率

        // 将概率转换为累积的概率区间
        const cumulativeProbabilities = probabilities.reduce((acc, prob, index) => {
            acc.push(prob + (acc[index - 1] || 0));  // 累加概率
            return acc;
        }, [] as number[]);

        // 生成一个 0 到 1 之间的随机数
        const random = Math.random();

        // 根据随机数选择元素
        for (let i = 0; i < cumulativeProbabilities.length; i++) {
            if (random < cumulativeProbabilities[i]) {
                return elements[i];  // 返回选中的元素
            }
        }

        return elements[elements.length - 1];  // 如果未选中，则默认返回最后一个元素
    }

    // 从数组中随机获取一个元素
    private getRandomItem(arr: string[]): string {
        // 生成一个随机索引。不是真正的随机，中间的索引概率大些
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    private updateOneTimeLabel() {
        let label = this.oneTimeNode.getChildByName("Button").getComponentInChildren(Label);
        let text = `每日首次免费\n招募一次`;
        if (this.freeOneTimeUsed) {
            text = `和田玉：100\n招募一次`;
        }

        label.string = text;
    }

    // 展示抽卡的武器界面
    private showPrizeCanvas(data: any) {
        const weaponryAttributes = data as UserWeaponryAttribute[];
        console.log("show prize", weaponryAttributes);

        let showPrizeUITransform = this.showPrizeNode.getComponent(UITransform);
        // 节点之间的x距离
        let nodeDistanceX = 10;
        // 节点长度(展示长度 - 一行5个节点)
        let nodeWidth = (showPrizeUITransform.width - 20 - nodeDistanceX * 4) / 5;
        // 节点高度(跟宽度一样，正方形，不然有点难看)
        //let nodeHight = (showPrizeUITransform.height - 20 - nodeDistance) / 2;
        let nodeHight = nodeWidth;
        // 节点之间的y距离
        let nodeDistanceY = (showPrizeUITransform.height - 2 * nodeHight) / 3;
        // 节点初始位置(这个点是图片中心点，要考虑图片的长高)
        let firstNodePosX = -((showPrizeUITransform.width - 20) / 2) + (nodeWidth / 2);
        let firstNodePosY = ((showPrizeUITransform.height - (nodeDistanceY * 2)) / 2) - (nodeHight / 2);
        // 初始化节点
        for (let i = 0; i < weaponryAttributes.length; i++) {
            const node = new Node("Prize");
            node.layer = Layers.Enum.UI_2D;
            let uiTransform = node.addComponent(UITransform);
            uiTransform.width = nodeWidth;
            uiTransform.height = nodeHight;
            node.setParent(this.showPrizeNode);
            node.setPosition(new Vec3(firstNodePosX + (i % 5) * (nodeWidth + nodeDistanceX), firstNodePosY - Math.floor(i / 5) * (nodeHight + nodeDistanceY)));
            // 设置奖品名字
            let labelNode = new Node("Name");
            labelNode.layer = Layers.Enum.UI_2D;
            labelNode.setParent(node);
            labelNode.setPosition(new Vec3(0, -70));
            let labelUI = labelNode.addComponent(UITransform);
            labelUI.setContentSize(new math.Size(100, 50));
            let label = labelNode.addComponent(Label);
            label.fontSize = 20;
            label.lineHeight = 30;
            label.string = weaponryAttributes[i].name;
            // 设置图片
            let sprite = node.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            // TODO 补充武器图片
            //let imagePath: string = "weapons/" + weaponryAttributes[i].imageName + "/spriteFrame";
            let imagePath: string = "weapons/" + "gudingdao" + "/spriteFrame";
            resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.error('load weapon image failed, err: %s', err);
                    return;
                }
                // 使用加载的 SpriteFrame
                sprite.spriteFrame = spriteFrame;
            });
        }

        // 打开奖品画布
        this.showPrizeNode.parent.active = true;
    }

    public closePrizeCanvas() {
        // 发送结束展示奖品事件
        GEventTarget.emit(GEventShowRecruitPrizeEnd);
        // 禁用展示奖品画布
        this.showPrizeNode.parent.active = false;
        // 删除生成的奖品节点
        const prizeNodes = this.showPrizeNode.children.filter(child => child.name == 'Prize');
        // 销毁所有找到的子节点
        prizeNodes.forEach(node => node.destroy());
        // 恢复抽奖按钮
        this.isInteractRecruitButton(true);
    }

    // 是否启用抽奖按钮
    private isInteractRecruitButton(interactable: boolean) {
        for (const node of this.recruitMap.keys()) {
            let button = node.getChildByName("Button").getComponent(Button);
            button.interactable = interactable;
        }
    }

    private updateNodeInfo(legendTimes: number, freeRecruit: boolean) {
        // 更新必传说描述信息
        let label = this.legendTimesNode.getComponent(Label);
        label.string = `再招募${legendTimes}次必得传说武器`;
        if (freeRecruit) {
            // 每日抽一次卡的免费一次
            this.freeOneTimeUsed = true;
            // 更新节点的展示信息
            this.updateOneTimeLabel();
        }
    }

    start() {

    }

    update(deltaTime: number) {

    }

    protected onDestroy(): void {
        // 监听抽卡动画播放完成
        GEventTarget.off(GEventRecruitWeaponAnimationEnd, (data: any) => {
            this.showPrizeCanvas(data);
        }, this);
    }
}

