import { _decorator, Component, instantiate, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { getPlayerHeros, HeroInfo } from '../domino/domino';
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
        let heroInfoScript = parentNode.getComponent(heroSelfController);
        heroInfoScript.initNode(playHero);
        
        return parentNode;
    }
}


