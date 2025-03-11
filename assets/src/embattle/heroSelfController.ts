import { _decorator, Button, Component, Node, NodeEventType } from 'cc';
import { getPlayerHeros, HeroInfo, updatePlayerHeroNoBase } from '../domino/domino';
import { deepCopy } from '../utils/copy';
import { DeployType } from '../types/type';
import { GEventTarget, GEventUpdateDeployConent } from '../utils/event';
const { ccclass, property } = _decorator;

@ccclass('heroSelfController')
export class heroSelfController extends Component {
    @property(Node)
    private gDeployNode: Node = null;

    private gHeroButton: Button = null;

    // 该信息需要在节点初始化时被设置
    private gHero: HeroInfo = null;


    protected onLoad(): void {
        this.gHeroButton = this.node.getComponent(Button);
    }

    start() {
        this.node.on(NodeEventType.TOUCH_END, this._setDeploy, this);
    }

    protected onDestroy(): void {
        this.node.off(NodeEventType.TOUCH_END, this._setDeploy, this);
    }
    update(deltaTime: number) {

    }

    // 设置英雄属性
    public setHeroInfo(hero: HeroInfo) {
        this.gHero = deepCopy(hero);
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
        GEventTarget.emit(GEventUpdateDeployConent, this.gHero, lastPosition);
    }

    // 标记法找出空闲的布阵位置，找到立即返回，找不到说明布阵满了
    private _getDeployPosition(heros: HeroInfo[]): number {
        let deployArr = [false, false, false, false, false];

        heros.forEach((hero) => {
            console.log(hero.deploy)
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
}


