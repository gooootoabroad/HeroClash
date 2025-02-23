import { _decorator, Component, EventTarget, EventTouch, find, Node } from 'cc';
import { GAllHeroNodesMap, HeroNodesMap } from "./herosNodes";
import { GEventTarget, GEventUpdateHeroBasicAttributeCanvas } from '../utils/event';
const { ccclass, property } = _decorator;


@ccclass('herosAll')
export class herosAll extends Component {
    // 英雄节点
    private herosNodesMap: HeroNodesMap = null;
    // 滚动列表节点
    private gContentNode: Node = null;


    start() {
        this.herosNodesMap = GAllHeroNodesMap;

        this.gContentNode = this.node.getChildByName("HerosScrollView").getChildByName("view").getChildByName("content");
        this.loadHeros();

        // 注册事件
    }

    protected onDestroy(): void {
        for (let [serialNumber, heroNode] of this.herosNodesMap) {
            heroNode.off(Node.EventType.TOUCH_START, 
                function (event) {
                    GEventTarget.emit(GEventUpdateHeroBasicAttributeCanvas, serialNumber);
                }
                , heroNode);
        }
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


