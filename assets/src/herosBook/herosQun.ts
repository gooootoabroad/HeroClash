import { _decorator, Component, EventTouch, Node } from 'cc';
import { GQunHeroNodesMap, HeroNodesMap } from "./herosNodes";
import { GEventTarget, GEventUpdateHeroBasicAttributeCanvas } from '../utils/event';
const { ccclass, property } = _decorator;


@ccclass('herosQun')
export class herosQun extends Component {
    // 英雄节点
    private herosNodesMap: HeroNodesMap = null;
    // 滚动列表节点
    private gContentNode: Node = null;


    start() {
        this.herosNodesMap = GQunHeroNodesMap;

        this.gContentNode = this.node.getChildByName("HerosScrollView").getChildByName("view").getChildByName("content");
        this.loadHeros();
    }

    protected onDestroy(): void {
        for (let [_, heroNode] of this.herosNodesMap) {
            heroNode.off(Node.EventType.TOUCH_START, this.onTouch, heroNode);
        }
    }

    update(deltaTime: number) {

    }

    // 加载英雄
    private loadHeros() {
        for (let [serialNumber, heroNode] of this.herosNodesMap) {
            heroNode.on(Node.EventType.TOUCH_START,
                function (event) {
                    GEventTarget.emit(GEventUpdateHeroBasicAttributeCanvas, serialNumber);
                }
                , heroNode);
            this.gContentNode.addChild(heroNode);
        }
    }

    private onTouch(event: EventTouch) {
        console.log("%s,%s", event.getUILocation().x, event.getUILocation().y);
    }
}


