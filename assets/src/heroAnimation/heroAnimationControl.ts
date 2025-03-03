import { _decorator, Component, input, Input, Node } from 'cc';
import { play } from './play';
const { ccclass, property } = _decorator;

@ccclass('heroAnimationControl')
export class heroAnimationControl extends Component {
    @property(Node)
    private hero: Node = null;
    private herosNodeInfo: Map<Node, play> = new Map();
    protected onLoad(): void {
        // 初始化所有英雄节点
        this.herosNodeInfo.set(this.hero, this.hero.getComponent(play));
        this.herosNodeInfo.get(this.hero).Init("niuma");
    }
    start() {
        input.on(Input.EventType.MOUSE_DOWN, () => {
            this.herosNodeInfo.get(this.hero).playAnimation("attack");
        }, this);
    }

    update(deltaTime: number) {

    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_DOWN, () => {
            this.herosNodeInfo.get(this.hero).playAnimation("attack");
        }, this);
    }
}

