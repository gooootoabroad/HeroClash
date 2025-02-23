import { _decorator, Component, Node } from 'cc';
import { GShuHeroNodesMap, HeroNodesMap } from "./herosNodes";
const { ccclass, property } = _decorator;


@ccclass('herosShu')
export class herosShu extends Component {
    // 英雄节点
    private herosNodesMap: HeroNodesMap = null;
    // 滚动列表节点
    private gContentNode: Node = null;


    start() {
        this.herosNodesMap = GShuHeroNodesMap;

        this.gContentNode = this.node.getChildByName("HerosScrollView").getChildByName("view").getChildByName("content");
        this.loadHeros();
    }

    update(deltaTime: number) {

    }

    // 加载英雄
    loadHeros() {
        for (let [_, heroNode] of this.herosNodesMap) {
            this.gContentNode.addChild(heroNode);
        }
    }
}


