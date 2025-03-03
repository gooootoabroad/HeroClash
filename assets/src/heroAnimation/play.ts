// 英雄节点的动画组件控制
import { _decorator, Component, Animation, input, Input, assetManager, AnimationClip, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('play')
export class play extends Component {
    // 动画组件
    private heroAnimation: Animation = null;

    // 初始化这个节点绑定的动画名称
    public Init(name: string): void {
        this.heroAnimation = this.node.getComponent(Animation);
        // 加载武将待机动画
        resources.load(`animations/${name}/standby`, AnimationClip, (err, standby) => {
            if (err) {
                console.error(`Failed to load animation ${name} standby:`, err);
                return;
            }
            // 设置待机动画为循环模式
            standby.wrapMode = AnimationClip.WrapMode.Loop;
            // 将动画添加到 Animation 组件中
            this.heroAnimation.addClip(standby, "standby");
            // 默认播放待机动画
            this.heroAnimation.play("standby");
        });

        // 加载武将普通攻击动画
        resources.load(`animations/${name}/attack`, AnimationClip, (err, attack) => {
            if (err) {
                console.error(`Failed to load animation ${name} attack:`, err);
                return;
            }
            // 设置动画为播放一次
            attack.wrapMode = AnimationClip.WrapMode.Normal;
            // 将动画添加到 Animation 组件中
            this.heroAnimation.addClip(attack, "attack");
        });
    }

    public playAnimation(name: string) {
        this.heroAnimation.crossFade(name, 0.1);
    }

    // 结束播放普通攻击后的回掉函数
    public endAttack() {
        this.playAnimation("standby");
    }
}

