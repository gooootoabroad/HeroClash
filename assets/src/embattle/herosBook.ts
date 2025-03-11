import { _decorator, Component, instantiate, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { getPlayerHeros, HeroInfo } from '../domino/domino';
import { DeployType } from '../types/type';
import { heroSelfController } from './heroSelfController';
const { ccclass, property } = _decorator;

@ccclass('herosBook')
export class herosBook extends Component {
    // 英雄预制体
    @property(Prefab)
    private gHeroPrefab: Prefab = null;
    // 滚动列表
    @property(Node)
    private gScrollViewConent: Node = null;


    start() {
        this._viewAllHeros();
    }

    update(deltaTime: number) {

    }

    // 展示所有英雄信息
    private _viewAllHeros() {
        var heros = getPlayerHeros();
        for (let i = 0; i < heros.length; i++) {
            let heroNode = this._createHeroNode(heros[i]);
            this.gScrollViewConent.addChild(heroNode);
        }
    }

    // 创建英雄节点
    private _createHeroNode(playHero: HeroInfo): Node {
        let parentNode = instantiate(this.gHeroPrefab);
        let heroNameLabel = parentNode.getChildByName("Name").getComponentInChildren(Label);
        let heroImageSprite = parentNode.getChildByName("HeroFrame").getChildByName("InsideFrame1").getChildByName("InsideFrame2").getChildByName("Mask").getChildByName("HeroImage").getComponent(Sprite);
        let heroLevalLabel = parentNode.getChildByName("Leval").getComponentInChildren(Label);
        let heroRaritySprite = parentNode.getChildByName("Rarity").getComponent(Sprite);
        let heroRoleSprite = parentNode.getChildByName("Role").getComponent(Sprite);
        let heroNationSprite = parentNode.getChildByName("Nation").getComponent(Sprite);
        let heroDeployNode = parentNode.getChildByName("Deploy");
        let heroInfoScript = parentNode.getComponent(heroSelfController);

        heroInfoScript.setHeroInfo(playHero);
        heroNameLabel.string = playHero.basicHeroAttribute.name;

        let imagePath: string = "heros/" + playHero.basicHeroAttribute.imageName + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            heroImageSprite.spriteFrame = spriteFrame;
        });

        heroLevalLabel.string = `LV.${playHero.level}`;

        imagePath = "words/" + playHero.basicHeroAttribute.rarity + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            heroRaritySprite.spriteFrame = spriteFrame;
        });

        imagePath = "roles/" + playHero.basicHeroAttribute.role + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            heroRoleSprite.spriteFrame = spriteFrame;
        });

        imagePath = "nations/" + playHero.basicHeroAttribute.nation + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            heroNationSprite.spriteFrame = spriteFrame;

        });

        // 上阵英雄显示上阵
        if (playHero.deploy == DeployType.none) {
            heroDeployNode.active = false;
        } else {
            heroDeployNode.active = true;
        }

        return parentNode;
    }
}


