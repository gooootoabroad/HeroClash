import { _decorator, Component, dragonBones, Label, Node, NodePool, Sprite, spriteAssembler } from 'cc';
import { getPlayerHeros, HeroInfo } from '../domino/domino';
import { DeployType } from '../types/type';
import { heroEmController } from './heroEmController';
const { ccclass, property } = _decorator;

@ccclass('embattle')
export class embattle extends Component {
    @property(Node)
    private gHeroNodes: Node[] = [];

    protected onLoad(): void {
        this._setHerosPosition();
    }

    start() {
        this._initHeros();
    }

    protected onDestroy(): void {
    }

    update(deltaTime: number) {

    }

    private _setHerosPosition() {
        for (let i = 0; i < this.gHeroNodes.length; i++) {
            this.gHeroNodes[i].getComponent(heroEmController).setPosition(i);
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


