import { _decorator, Component, EventTouch, Node } from 'cc';
import { GWeiHeroNodesMap, HeroNodesMap } from "./herosNodes";
import { GEventTarget, GEventUpdateHeroBasicAttributeCanvas } from '../utils/event';
const { ccclass, property } = _decorator;


@ccclass('herosWei')
export class herosWei extends Component {
    // 英雄节点
    private herosNodesMap: HeroNodesMap = null;
    // 滚动列表节点
    private gContentNode: Node = null;


    start() {
        this.herosNodesMap = GWeiHeroNodesMap;

        this.gContentNode = this.node.getChildByName("HerosScrollView").getChildByName("view").getChildByName("content");
        this.loadHeros();
    }

    protected onDestroy(): void {
    }

    update(deltaTime: number) {

    }

    // 加载英雄
    private loadHeros() {
        for (let [serialNumber, heroNode] of this.herosNodesMap) {
            // 监听事件 TODO:怎么销毁匿名函数事件？
            heroNode.on(Node.EventType.TOUCH_START,
                function (event) {
                    GEventTarget.emit(GEventUpdateHeroBasicAttributeCanvas, serialNumber);
                }
                , heroNode);
            this.gContentNode.addChild(heroNode);
        }
    }
}


