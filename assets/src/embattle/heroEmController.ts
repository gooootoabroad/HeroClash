import { _decorator, Component, dragonBones, EventTouch, Input, Label, Node, NodeEventType, Sprite, Vec2 } from 'cc';
import { initAnimation } from '../utils/dragon';
import { HeroInfo, updatePlayerHeroNoBase } from '../domino/domino';
import { deepCopy } from '../utils/copy';
import { loadNationsSpriteFrame, loadRaritySpriteFrame } from '../utils/loader';
import { DeployType, SiblingIndexType } from '../types/type';
import { GEventTarget, GEventHerosBookUpdateDeploy, GEventDeployUpdateHerosBook } from '../utils/event';
import { setChildrensSiblingIndex } from '../utils/sibling';
const { ccclass, property } = _decorator;

@ccclass('heroEmController')
export class heroEmController extends Component {
    @property(Node)
    private gHeroNameNode: Node = null;
    @property(Node)
    private gHeroBodyNode: Node = null;
    @property(Node)
    private gHeroRarityNode: Node = null;
    @property(Node)
    private gHeroNationNode: Node = null;
    @property(Node)
    private gHeroLevelNode: Node = null;

    private gNameLabel: Label = null;
    private gBodyDisplay: dragonBones.ArmatureDisplay = null;
    private gRaritySprite: Sprite = null;
    private gNationSprite: Sprite = null;
    private gLevelLabel: Label = null;

    private gHero: HeroInfo = null;

    // 标示当前节点部署位置，和英雄信息中的deploy一致
    private gDeployIndex: DeployType = null;
    // 记录当前英雄节点位置，恢复英雄位置使用
    private gHeroWorldPosition: Vec2 = null;
    // 记录所有英雄节点
    private gHerosNode: Node[] = [];
    // 节点运行速度
    private gSpeed = 1.3;

    // 最初初始化的图层，用于图层还原使用
    private gOriginSiblingIndex: SiblingIndexType = SiblingIndexType.Five;

    protected onLoad(): void {
        this.node.active = false;
        this.gNameLabel = this.gHeroNameNode.getComponent(Label);
        this.gBodyDisplay = this.gHeroBodyNode.getComponent(dragonBones.ArmatureDisplay);
        this.gRaritySprite = this.gHeroRarityNode.getComponent(Sprite);
        this.gNationSprite = this.gHeroNationNode.getComponent(Sprite);
        this.gLevelLabel = this.gHeroLevelNode.getComponent(Label);

        // 设置所有节点渲染图层
        //setChildrensSiblingIndex(this.node, this.gOriginSiblingIndex);

        this.gHeroWorldPosition = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);
        // 这个事件只处理点击图鉴信息英雄上阵使用
        GEventTarget.on(GEventHerosBookUpdateDeploy, this._eventUpdateHeroDeploy, this);

        this.gHeroBodyNode.on(Input.EventType.TOUCH_END, this._eventHeroEnd, this);
        this.gHeroBodyNode.on(Input.EventType.TOUCH_MOVE, this._eventHeroMove, this);
    }
    start() {


    }

    protected onDestroy(): void {
        GEventTarget.off(GEventHerosBookUpdateDeploy, this._eventUpdateHeroDeploy, this);
        this.gHeroBodyNode.off(Input.EventType.TOUCH_END, this._eventHeroEnd, this);
        this.gHeroBodyNode.off(Input.EventType.TOUCH_MOVE, this._eventHeroMove, this);
    }
    update(deltaTime: number) {

    }

    // 设置各个英雄点节点
    public setHeroNodes(nodes: Node[]) {
        this.gHerosNode = nodes;
    }

    public setDeploy(deploy: DeployType) {
        this.gDeployIndex = deploy;
    }
    // 由embattle脚本进行初始化
    public initHero(hero: HeroInfo) {
        this.node.active = false;
        this.gHero = deepCopy(hero);
        if (this.gHero == null) return;
        if (this.gHero.deploy == DeployType.none) return;

        // 矫正dedploy值
        this.gHero.deploy = this.gDeployIndex;
        this._updateHero(this.gHero);
    }

    private _eventUpdateHeroDeploy(hero: HeroInfo, deploy: DeployType) {
        // 非该节点的消息，就抛弃
        if (deploy != this.gDeployIndex) return;
        this._updateHero(hero);
    }

    // 接收来自布阵更新英雄信息事件
    private _updateHero(hero: HeroInfo) {
        this.node.active = false;

        // 取消上阵的英雄，隐藏就好
        if (hero.deploy == DeployType.none) {
            this.gHero.deploy = hero.deploy;
            updatePlayerHeroNoBase(deepCopy(this.gHero));
            this.gHero = null;
            return;
        }

        this.gHero = hero;
        this.gNameLabel.string = hero.basicHeroAttribute.name;
        initAnimation(this.gBodyDisplay, hero.basicHeroAttribute.imageName);
        this.gLevelLabel.string = `Lv.${hero.level.toString()}`;
        loadRaritySpriteFrame(this.gRaritySprite, hero.basicHeroAttribute.rarity);
        loadNationsSpriteFrame(this.gNationSprite, hero.basicHeroAttribute.nation);
        this.node.active = true;
        updatePlayerHeroNoBase(deepCopy(this.gHero));
    }

    // 获取英雄信息
    public getHeroInfo() {
        return deepCopy(this.gHero);
    }
    // 获取节点序号
    public getNodeIndex(): DeployType {
        return this.gDeployIndex;
    }
    
    private _eventHeroEnd() {
        // 如果当前是布阵状态，则取消布阵
        // 如果当前是未布阵状态，则不需要处理
        if ((this.gHero == null) || (this.node.active == false)) return;

        var worldPos = this.node.worldPosition;

        // 左右60个像素范围内
        var deltaX = 50;
        // 上下70个像素范围内
        var deltaY = 50;

        for (let i = 0; i < this.gHerosNode.length; i++) {
            let node = this.gHerosNode[i];
            if (node == this.node) continue;

            let nodeWorldPosition = node.worldPosition;
            if ((worldPos.x <= nodeWorldPosition.x + deltaX) &&
                (worldPos.x >= nodeWorldPosition.x - deltaX) &&
                (worldPos.y <= nodeWorldPosition.y + deltaY) &&
                (worldPos.y >= nodeWorldPosition.y - deltaY)
            ) {
                // 交换双方节点信息
                let nodeScript = node.getComponent(heroEmController);
                let targetHero = nodeScript.getHeroInfo();
                let hero = deepCopy(this.gHero);
                hero.deploy = nodeScript.getNodeIndex;
                // 交换部署位置
                if (targetHero != null) {
                    targetHero.deploy = this.gDeployIndex;
                }
                this.initHero(targetHero);
                nodeScript.initHero(hero);
            }
        }

        // 如果点击完节点还是当前节点，则隐藏
        if ((worldPos.x <= this.gHeroWorldPosition.x + deltaX) &&
            (worldPos.x >= this.gHeroWorldPosition.x - deltaX) &&
            (worldPos.y <= this.gHeroWorldPosition.y + deltaY) &&
            (worldPos.y >= this.gHeroWorldPosition.y - deltaY)) {
            // 隐藏节点
            this.node.active = false;
            this.gHero.deploy = DeployType.none;
            // 通知图鉴取消上阵状态
            GEventTarget.emit(GEventDeployUpdateHerosBook, deepCopy(this.gHero));
            this.gHero = null;
        }

        // 最后坐标回归到原始坐标
        //setChildrensSiblingIndex(this.node, this.gOriginSiblingIndex);
        this.node.setWorldPosition(this.gHeroWorldPosition.x, this.gHeroWorldPosition.y, 0);
    }

    private _eventHeroMove(event: EventTouch) {
        if ((this.gHero == null) || (this.node.active == false)) return;

        // 提高节点图层
        // setChildrensSiblingIndex(this.node, SiblingIndexType.Top);

        var delta = event.getDelta();
        var worldPos = this.node.worldPosition;
        this.node.setWorldPosition(worldPos.x + delta.x * this.gSpeed, worldPos.y + delta.y * this.gSpeed, 0);
    }
}


