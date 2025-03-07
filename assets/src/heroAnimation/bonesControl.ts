import { _decorator, Component, dragonBones, Input, input, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bonesControl')
export class bonesControl extends Component {
    // 骨骼节点
    @property(Node)
    private dbNode: Node = null;
    // 骨骼组件
    private armatureDisplay: dragonBones.ArmatureDisplay = null;

    protected onLoad(): void {
        this.armatureDisplay = this.dbNode.getComponent(dragonBones.ArmatureDisplay);
        resources.load("dragon/niuma/niuma_ske", dragonBones.DragonBonesAsset, (err, skeAsset) => {
            if (err) {
                console.error("Failed to load ske.json:", err);
                return;
            }
            // 2. 加载纹理数据：tes.json
            resources.load("dragon/niuma/niuma_tex", dragonBones.DragonBonesAtlasAsset, (err, atlasAsset) => {
                if (err) {
                    console.error("Failed to load tes.json:", err);
                    return;
                }
                // 设置加载的资源到 ArmatureDisplay
                this.armatureDisplay.dragonAsset = skeAsset;
                this.armatureDisplay.dragonAtlasAsset = atlasAsset;
                this.armatureDisplay.setAnimationCacheMode(dragonBones.AnimationCacheMode.SHARED_CACHE);

                // 骨骼名称
                this.armatureDisplay.armatureName = "Armature";
                // 播放动画
                this.armatureDisplay.playAnimation("standby", -1);
            })
        })

        // 可以监听事件
        this.armatureDisplay.on(dragonBones.EventObject.COMPLETE, () => {
            console.log("animation end");
            //this.armatureDisplay.playAnimation("standby", 0);
        }, this);

    }
    start() {
        input.on(Input.EventType.MOUSE_DOWN, () => {
            this.armatureDisplay.playAnimation("ability1", 1);
        }, this);
    }

    update(deltaTime: number) {

    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_DOWN, () => {
            this.armatureDisplay.playAnimation("died", 1);
        }, this);
    }
}

