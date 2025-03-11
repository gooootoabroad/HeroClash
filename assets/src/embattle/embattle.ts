import { _decorator, Component, dragonBones, Label, Node, NodePool, Sprite, spriteAssembler } from 'cc';
import { getPlayerHeros, HeroInfo } from '../domino/domino';
import { DeployType } from '../types/type';
import { AnimationType, initAnimation } from '../utils/dragon';
import { loadNationsSpriteFrame, loadRaritySpriteFrame } from '../utils/loader';
const { ccclass, property } = _decorator;

@ccclass('embattle')
export class embattle extends Component {

    @property(Node)
    private gHeroNodes: Node[] = [];

    start() {
        this._initHeros();
    }

    update(deltaTime: number) {
        
    }

    private _initHeros() {
        var heros = getPlayerHeros();
        heros.forEach((hero) => {
            if (hero.deploy == DeployType.none) return;
            this._initHero(hero);
        });

    }

    private _initHero(playHero: HeroInfo) {
        var heroNode = this.gHeroNodes[playHero.deploy];
        var nameLabel = heroNode.getChildByName("Name").getComponent(Label);
        var bodyDisplay = heroNode.getChildByName("Body").getComponent(dragonBones.ArmatureDisplay);
        var raritySprite = heroNode.getChildByName("RarityMask").getChildByName("Rarity").getComponent(Sprite);
        var nationSprite = heroNode.getChildByName("Nation").getComponent(Sprite);
        var levelLabel = heroNode.getChildByName("Level").getComponent(Label);
    
        nameLabel.string = playHero.basicHeroAttribute.name;
        initAnimation(bodyDisplay, playHero.basicHeroAttribute.imageName);
        levelLabel.string = `Lv.${playHero.level.toString()}`;
        loadRaritySpriteFrame(raritySprite, playHero.basicHeroAttribute.rarity);
        loadNationsSpriteFrame(nationSprite, playHero.basicHeroAttribute.nation);
        
    }
}


