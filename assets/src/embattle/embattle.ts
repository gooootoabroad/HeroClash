import { _decorator, Component, dragonBones, Label, Node, NodeEventType, NodePool, Sprite, spriteAssembler, Vec2 } from 'cc';
import { getPlayerHeros, HeroInfo } from '../domino/domino';
import { DeployType } from '../types/type';
import { heroEmController } from './heroEmController';
const { ccclass, property } = _decorator;

@ccclass('embattle')
export class embattle extends Component {
    @property(Node)
    private gHeroNodes: Node[] = [];

    protected onLoad(): void {

    }

    start() {
        // 设置英雄自身号数
        this._setHeros();
        // 初始化英雄属性
        this._initHeros();

    }

    protected onDestroy(): void {

    }

    update(deltaTime: number) {

    }

    // 设置英雄信息
    private _setHeros() {
        for (let i = 0; i < this.gHeroNodes.length; i++) {
            let nodeScript = this.gHeroNodes[i].getComponent(heroEmController);
            nodeScript.setDeploy(i);
            nodeScript.setHeroNodes(this.gHeroNodes);
        }
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
        var heroScript = heroNode.getComponent(heroEmController);
        heroScript.initHero(playHero);
    }
}


