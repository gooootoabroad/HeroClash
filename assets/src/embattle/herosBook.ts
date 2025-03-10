import { _decorator, Button, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('herosBook')
export class herosBook extends Component {
    // 自己的英雄预制体
    @property(Prefab)
    private gHeroPrefab: Prefab = null;

    // 全英雄按钮
    @property(Button)
    private gHerosAllButton: Button = null;

    // 


    protected onLoad(): void {

    }

    start() {

    }

    protected onDestroy(): void {

    }

    update(deltaTime: number) {

    }

    private _viewAllHeros() {
        // TODO 从数据库读取信息，先用假数据代替
        // let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
        // for (let [serialNumber, attribute] of gHerosMap) {
        //     // 先使用预制体作为父节点
        //     let node = instantiate(this.gHeroPrefab);
        //     // 再将预制体内容初始化
        //     createHeroNode(node, attribute);
        //     // 监听事件 TODO:怎么销毁匿名函数事件？
        //     node.on(Node.EventType.TOUCH_START,
        //         function (event) {
        //             GEventTarget.emit(GEventUpdateHeroBasicAttributeCanvas, serialNumber);
        //         }
        //         , node);
        //     this.gContentNode.addChild(node);
        // }
    }
}


