import { _decorator, Component, Node } from 'cc';
import { GWeiHeroNodesMap, HeroNodesMap } from "./herosNodes";
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
        this.node.active = false;
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


