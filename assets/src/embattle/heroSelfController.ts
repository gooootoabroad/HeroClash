import { _decorator, Button, Component, Label, Node, NodeEventType, Sprite } from 'cc';
import { getPlayerHeros, HeroInfo, updatePlayerHeroNoBase } from '../domino/domino';
import { deepCopy } from '../utils/copy';
import { DeployType } from '../types/type';
import { GEventTarget, GEventHerosBookUpdateDeploy, GEventDeployUpdateHerosBook } from '../utils/event';
import { loadHerosSpriteFrame, loadNationsSpriteFrame, loadRolesSpriteFrame, loadWordsSpriteFrame } from '../utils/loader';
const { ccclass, property } = _decorator;

@ccclass('heroSelfController')
export class heroSelfController extends Component {
    // 标示图鉴图片上阵情况
    @property(Node)
    private gDeployNode: Node = null;

    @property(Node)
    private gNameTextNode: Node = null;

    @property(Node)
    private gHeroImageNode: Node = null;

    @property(Node)
    private gNationNode: Node = null;

    @property(Node)
    private gRarityNode: Node = null;

    @property(Node)
    private gRoleNode: Node = null;

    @property(Node)
    private gLevelNode: Node = null;

    private gHeroNameLabel: Label = null;
    private gHeroLevelLabel: Label = null;
    private gHeroImageSprite: Sprite = null;
    private gHeroRaritySprite: Sprite = null;
    private gHeroRoleSprite: Sprite = null;
    private gHeroNationSprite: Sprite = null;

    private gHeroButton: Button = null;

    // 该信息需要在节点初始化时被设置
    private gHero: HeroInfo = null;


    // 实例化的情况 onload不会被执行，需要手动调用
    protected onLoad(): void {
        this.gHeroNameLabel = this.gNameTextNode.getComponent(Label);
        this.gHeroLevelLabel = this.gLevelNode.getComponent(Label);
        this.gHeroImageSprite = this.gHeroImageNode.getComponent(Sprite);
        this.gHeroRaritySprite = this.gRarityNode.getComponent(Sprite);
        this.gHeroRoleSprite = this.gRoleNode.getComponent(Sprite);
        this.gHeroNationSprite = this.gNationNode.getComponent(Sprite);

        this.gHeroButton = this.node.getComponent(Button);

        this.node.on(NodeEventType.TOUCH_END, this._setDeploy, this);
        GEventTarget.on(GEventDeployUpdateHerosBook, this._eventUpdateHero, this);
    }

    start() {


    }

    protected onDestroy(): void {
        this.node.off(NodeEventType.TOUCH_END, this._setDeploy, this);
        GEventTarget.off(GEventDeployUpdateHerosBook, this._eventUpdateHero, this);

    }
    update(deltaTime: number) {

    }

    // 初始化英雄信息，外部调用初始化
    public initNode(hero: HeroInfo) {
        this.onLoad();

        this.gHero = deepCopy(hero);
        this.gHeroNameLabel.string = this.gHero.basicHeroAttribute.name;
        loadHerosSpriteFrame(this.gHeroImageSprite, this.gHero.basicHeroAttribute.imageName);
        this.gHeroLevelLabel.string = `Lv.${this.gHero.level}`;
        loadWordsSpriteFrame(this.gHeroRaritySprite, this.gHero.basicHeroAttribute.rarity);
        loadRolesSpriteFrame(this.gHeroRoleSprite, this.gHero.basicHeroAttribute.role);
        loadNationsSpriteFrame(this.gHeroNationSprite, this.gHero.basicHeroAttribute.nation);

        // 上阵英雄显示上阵
        if (this.gHero.deploy == DeployType.none) {
            this.gDeployNode.active = false;
        } else {
            this.gDeployNode.active = true;
        }
    }

    // 设置英雄布阵位置和信息
    private _setDeploy() {
        var freePosition = DeployType.none;
        var lastPosition = this.gHero.deploy;
        if (this.gHero.deploy == DeployType.none) {
            var heros = getPlayerHeros();
            // 找出空闲布阵位置
            freePosition = this._getDeployPosition(heros);
            if (freePosition == DeployType.none) {
                console.log("超出上阵英雄数量限制")
                return;
            }
        }
        // 如果是未布阵状态，则布阵
        // 如果已经是布阵状态，则取消布阵
        if (this.gHero.deploy == DeployType.none) {
            // 先更新数据库
            var newHero = deepCopy(this.gHero);
            newHero.deploy = freePosition;
            updatePlayerHeroNoBase(newHero);
            // 再更新本地数据
            this.gHero.deploy = freePosition;
            this.gDeployNode.active = true;
            lastPosition = freePosition;
        } else {
            // 先更新数据库
            var newHero = deepCopy(this.gHero);
            newHero.deploy = DeployType.none;
            updatePlayerHeroNoBase(newHero);
            // 再更新本地数据
            this.gHero.deploy = DeployType.none;
            this.gDeployNode.active = false;
        }
        // 消息由embattle.ts脚本所在的节点监听
        GEventTarget.emit(GEventHerosBookUpdateDeploy, this.gHero, lastPosition);
    }

    // 标记法找出空闲的布阵位置，找到立即返回，找不到说明布阵满了
    private _getDeployPosition(heros: HeroInfo[]): number {
        let deployArr = [false, false, false, false, false];

        heros.forEach((hero) => {
            if (hero.deploy == DeployType.none) return;
            deployArr[hero.deploy] = true;
        });

        let position = DeployType.none;

        for (let i = 0; i < deployArr.length; i++) {
            if (deployArr[i] == true) continue;
            position = i;
            break;
        }

        return position;
    }

    // 这里不需要更新数据库，由布阵heroEmController.ts更新即可
    private _eventUpdateHero(hero: HeroInfo) {
        // 非本英雄信息则丢弃
        if (hero.id != this.gHero.id) return;
        // 取消布阵，则去掉布阵信息
        if (this.gHero.deploy != DeployType.none && hero.deploy == DeployType.none) {
            this.gDeployNode.active = false;
            this.gHero.deploy = hero.deploy;
        }
    }
}


