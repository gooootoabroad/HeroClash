import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { createHeroNode } from "./herosNodes";
import { GEventTarget, GEventUpdateHeroBasicAttributeCanvas } from '../utils/event';
import { BasicHeroAttribute, NationType } from '../resource/character/attribute';
import { getHeroMap } from '../resource/character/heroList';
const { ccclass, property } = _decorator;


@ccclass('herosWei')
export class herosWei extends Component {
    // 滚动列表节点
    private gContentNode: Node = null;

    @property(Prefab)
    public gHeroPrefab: Prefab = null;

    start() {
        this.gContentNode = this.node.getChildByName("HerosScrollView").getChildByName("view").getChildByName("content");
        this.loadHeros();
    }

    protected onDestroy(): void {
    }

    update(deltaTime: number) {

    }

    // 加载英雄
    private loadHeros() {
        let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
        for (let [serialNumber, attribute] of gHerosMap) {
            if (attribute.nation !== NationType.weiguo) continue;
            // 先使用预制体作为父节点
            let node = instantiate(this.gHeroPrefab);
            // 再将预制体内容初始化
            createHeroNode(node, attribute);
            // 监听事件 TODO:怎么销毁匿名函数事件？
            node.on(Node.EventType.TOUCH_START,
                function (event) {
                    GEventTarget.emit(GEventUpdateHeroBasicAttributeCanvas, serialNumber);
                }
                , node);
            this.gContentNode.addChild(node);
        }
    }
}


