import { _decorator, Button, Color, Component, dragonBones, Label, Node, resources, Sprite, SpriteFrame, Vec3 } from 'cc';
import { getPlayerHerosInfo, HeroInfo, updatePlayerHeroInfo } from '../domino/domino';
import { EnhancementInfo } from '../domino/database/database';
import { CurrencyType } from '../resource/currency/kind';
import { CurrencyManager } from '../resource/currency/manager';
const { ccclass, property } = _decorator;

// heroNode绑定信息
interface heroNodeInfo {
    heroNode: Node,
    heroInfo: HeroInfo
}

// 升级需要的资源信息
interface costInfo {
    cost: number,
    kind: CurrencyType,
}

@ccclass('enhancementController')
export class enhancementController extends Component {
    // 资源管理实例
    private currencyManager: CurrencyManager = null;

    // 英雄节点列表
    private heroNodeList: heroNodeInfo[] = [];
    // 展示信息的节点
    private weaponNode: Node = null;
    private helmet: Node = null;
    private armor: Node = null;
    private bracelet: Node = null;
    private horse: Node = null;
    private dragon: Node = null;

    // 当前展示的节点序号
    private currentDisplayIndex: number = 0;
    // 当前展示的节点
    private currentDisplayNode: Node = null;
    // 展示节点时节点增加的高度
    private height = 30;
    // 最多展示英雄数量
    private maxDisplayNodesNumber: number = 5;

    // 初始化所有节点的信息
    private initNode() {
        // TODO 获取上阵的英雄信息
        let deployedHerosInfo = getPlayerHerosInfo();
        if (deployedHerosInfo.length == 0) {
            return;
        }

        for (let i = 0; i < deployedHerosInfo.length && i < 5; i++) {
            let heroNode = this.node.getChildByName("Hero" + i);
            this.heroNodeList.push({
                heroNode: heroNode,
                heroInfo: deployedHerosInfo[i]
            })
            // 设置英雄名称
            heroNode.getChildByName("Button").getChildByName("Label").getComponent(Label).string = deployedHerosInfo[i].name;
            // 播放待机动画
            this.playHeroStandbyAnmiation(heroNode, deployedHerosInfo[i].name);
        }

        // 设置剩余英雄节点不可点击
        for (let i = deployedHerosInfo.length; i < this.maxDisplayNodesNumber; i++) {
            this.node.getChildByName("Hero" + i).active = false;
        }

        // 初始化强化信息节点
        this.weaponNode = this.node.getChildByName("Weapon");
        this.helmet = this.node.getChildByName("Helmet");
        this.armor = this.node.getChildByName("Armor");
        this.bracelet = this.node.getChildByName("Bracelet");
        this.horse = this.node.getChildByName("Horse");
        this.dragon = this.node.getChildByName("Dragon");

        // 展示第一个节点的信息
        this.showHeroEnhancementInfo(this.heroNodeList[0]);
    }

    private playHeroStandbyAnmiation(heroNode: Node, heroName: string) {
        let armatureDisplay = heroNode.getChildByName("Hero").getComponent(dragonBones.ArmatureDisplay);
        let db_ske_path = "dragon/" + heroName + "/" + heroName + "_ske";
        resources.load(db_ske_path, dragonBones.DragonBonesAsset, (err, skeAsset) => {
            if (err) {
                console.error("Failed to load hero: %s ske.json: %s", heroName, err);
                return;
            }
            // 2. 加载纹理数据：tes.json
            let db_tex_path = "dragon/" + heroName + "/" + heroName + "_tex";
            resources.load(db_tex_path, dragonBones.DragonBonesAtlasAsset, (err, atlasAsset) => {
                if (err) {
                    console.error("Failed to load hero: %s tes.json: %s", heroName, err);
                    return;
                }
                // 设置加载的资源到 ArmatureDisplay
                armatureDisplay.dragonAsset = skeAsset;
                armatureDisplay.dragonAtlasAsset = atlasAsset;
                armatureDisplay.setAnimationCacheMode(dragonBones.AnimationCacheMode.SHARED_CACHE);

                // 骨骼名称
                armatureDisplay.armatureName = "Armature";
                armatureDisplay.playAnimation("standby", -1);
            })
        })
    }

    private showHeroEnhancementInfo(heroNodeInfo: heroNodeInfo) {
        // 还原当前节点位置
        if (this.currentDisplayNode) {
            this.currentDisplayNode.setPosition(new Vec3(this.currentDisplayNode.position.x, this.currentDisplayNode.position.y - this.height));
        }

        // 展示最新的英雄增幅信息
        let [costInfo, _] = this.getNextEnhancementCostInfo("", heroNodeInfo.heroInfo.weaponEnhancement.level);
        this.showNodeEnhancementInfo(this.weaponNode, heroNodeInfo.heroInfo.weaponEnhancement, costInfo);
        this.showNodeEnhancementInfo(this.helmet, heroNodeInfo.heroInfo.helmetEnhancement, costInfo);
        this.showNodeEnhancementInfo(this.armor, heroNodeInfo.heroInfo.armorEnhancement, costInfo);
        this.showNodeEnhancementInfo(this.bracelet, heroNodeInfo.heroInfo.braceletEnhancement, costInfo);
        this.showNodeEnhancementInfo(this.horse, heroNodeInfo.heroInfo.horseEnhancementWeapon, costInfo);
        this.showNodeEnhancementInfo(this.dragon, heroNodeInfo.heroInfo.dragonEnhancementWeapon, costInfo);

        // 将展示节点位置往上移
        this.currentDisplayNode = heroNodeInfo.heroNode;
        this.currentDisplayNode.setPosition(new Vec3(this.currentDisplayNode.position.x, this.currentDisplayNode.position.y + this.height));
    }

    // 展示一个类型的详细信息
    private showNodeEnhancementInfo(node: Node, enhancementInfo: EnhancementInfo, costInfo: costInfo) {
        let showEquipmentNode = node.getChildByName("ShowEquipment");
        showEquipmentNode.getChildByName("Level").getComponent(Label).string = enhancementInfo.level.toString();
        showEquipmentNode.getChildByName("Value").getComponent(Label).string = enhancementInfo.value.toString();
        let upgradNode = node.getChildByName("Upgrade");
        let costNode = upgradNode.getChildByName("Cost");
        let costImagePath = "ui/currency/" + costInfo.kind.toString() + "/spriteFrame";
        resources.load(costImagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }

            costNode.getChildByName("Sprite").getComponent(Sprite).spriteFrame = spriteFrame;
        })

        costNode.getChildByName("Cost").getComponent(Label).string = costInfo.cost.toString();
        // 计算是否有足够资源进行升级，没有的话就把禁用按钮且更改字体颜色为红色
        if (!this.currencyManager.isSpecialResourceEnough(costInfo.kind, costInfo.cost)) {
            costNode.getChildByName("Cost").getComponent(Label).color = new Color().fromHEX("#D30404");
            upgradNode.getComponent(Button).interactable = false;
            upgradNode.getComponent(Sprite).color = new Color().fromHEX("#686807");

        } else {
            costNode.getChildByName("Cost").getComponent(Label).color = new Color().fromHEX("#E4F70A");
            node.getChildByName("Upgrade").getComponent(Button).interactable = true;
            upgradNode.getComponent(Sprite).color = new Color().fromHEX("#D6D6D6");
        }

    }

    // 获取下一次的升级费用
    private getNextEnhancementCostInfo(kind: string, level: number): [costInfo, EnhancementInfo] {
        // TODO 强化的费用怎么算
        return [{ cost: 500, kind: CurrencyType.Copper }, { level: level + 1, value: level + 1 }];
    }

    protected onLoad(): void {
        this.currencyManager = CurrencyManager.getInstance();
        this.initNode();
        // 初始化资源图片
    }

    // 英雄按钮回掉函数
    public changeHeroEnhancementScreen(_: Event, currentDisplayIndex: number) {
        this.currentDisplayIndex = currentDisplayIndex;
        this.showHeroEnhancementInfo(this.heroNodeList[currentDisplayIndex]);
    }

    // 增幅回掉函数
    public enhance(_: Event, kind: string) {
        // TODO 根据kind判断是增幅的那个部位,获取到升级的费用
        // TODO 全属性提升这个应该是要升到多少级或者打了多少关才行
        let [costInfo, nextEnhancemaneInfo] = this.getNextEnhancementCostInfo(kind, this.heroNodeList[this.currentDisplayIndex].heroInfo.weaponEnhancement.level);
        if (!this.currencyManager.isSpecialResourceEnough(costInfo.kind, costInfo.cost)) {
            console.log("currency %s not enough", costInfo.kind);
        }

        try {
            // TODO 计算出下一级别的强化数据
            this.currencyManager.updateResourceByKind(costInfo.kind, -costInfo.cost);
            // 更新对应数据 TODO 目前只更新武器
            this.heroNodeList[this.currentDisplayIndex].heroInfo.weaponEnhancement = nextEnhancemaneInfo;
            updatePlayerHeroInfo(this.heroNodeList[this.currentDisplayIndex].heroInfo);
        } catch (error) {
            console.error("Failed to enhace %s, err: %s", costInfo.kind, error);
            throw new Error(`Failed to update currency`);
        }

        // 更新显示数据
        this.showHeroEnhancementInfo(this.heroNodeList[this.currentDisplayIndex]);
    }

    start() {

    }

    update(deltaTime: number) {

    }
}

