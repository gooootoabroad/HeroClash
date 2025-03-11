import { _decorator, Component, dragonBones, Label, Node, Sprite } from 'cc';
import { initAnimation } from '../utils/dragon';
import { HeroInfo } from '../domino/domino';
import { deepCopy } from '../utils/copy';
import { loadNationsSpriteFrame, loadRaritySpriteFrame } from '../utils/loader';
import { DeployType } from '../types/type';
import { GEventTarget, GEventUpdateDeployConent } from '../utils/event';
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

    // 标示当前节点的位置
    private gPosition: DeployType = null;


    protected onLoad(): void {
        this.node.active = false;
        this.gNameLabel = this.gHeroNameNode.getComponent(Label);
        this.gBodyDisplay = this.gHeroBodyNode.getComponent(dragonBones.ArmatureDisplay);
        this.gRaritySprite = this.gHeroRarityNode.getComponent(Sprite);
        this.gNationSprite = this.gHeroNationNode.getComponent(Sprite);
        this.gLevelLabel = this.gHeroLevelNode.getComponent(Label);

        // 这个事件只处理点击图鉴信息英雄上阵使用
        GEventTarget.on(GEventUpdateDeployConent, this._updateHeroDeploy, this);
    }
    start() {


    }

    protected onDestroy(): void {
        GEventTarget.off(GEventUpdateDeployConent, this._updateHeroDeploy, this);

    }
    update(deltaTime: number) {

    }

    public setPosition(position: DeployType) {
        this.gPosition = position;
    }
    // 由embattle脚本进行初始化
    public initHero(hero: HeroInfo) {
        if (hero == null) return;
        this.gHero = deepCopy(hero);
        if (this.gHero.deploy == DeployType.none) return;

        this._updateHero(this.gHero);
    }

    private _updateHeroDeploy(hero: HeroInfo, position: DeployType) {
        // 非该节点的消息，就抛弃
        if (position != this.gPosition) return;
        
        this._updateHero(hero);
    }

    private _updateHero(hero: HeroInfo) {
        this.node.active = false;

        // 取消上阵的英雄，隐藏就好
        if (hero.deploy == DeployType.none) {
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
    }
}


