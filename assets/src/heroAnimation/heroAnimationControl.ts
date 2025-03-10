import { _decorator, Component, input, dragonBones, Input, Node, resources } from 'cc';
const { ccclass, property } = _decorator;

// 动画效果
export enum AnimationType {
    Standby = "standby",    // 站立等待
    Attack = "attack",      // 攻击
    Attacked = "attacked",  // 被攻击
    Died = "died",          // 死亡
    Skill1 = "ability1",    // 技能
}

@ccclass('heroAnimationControl')
export class heroAnimationControl extends Component {
    // 动画控制实例
    private static instance: heroAnimationControl;
    // 动画组件节点
    private animationNode: Node = null;
    // 骨骼组件
    private armatureDisplay: dragonBones.ArmatureDisplay = null;
    // 英雄名称，骨骼的文件名
    private heroName: string;

    // 初始化。骨骼组件node，以及对于英雄名称，即骨骼的文件名
    private constructor(animationNode: Node, heroName: string) {
        super();
        this.animationNode = animationNode;
        this.armatureDisplay = animationNode.getComponent(dragonBones.ArmatureDisplay);
        let db_ske_path = "dragon/" + heroName + "/" + heroName + "_ske";
        resources.load(db_ske_path, dragonBones.DragonBonesAsset, (err, skeAsset) => {
            if (err) {
                console.error("Failed to load hero: %s ske.json: %s", heroName, err);
                return;
            }
            // 2. 加载纹理数据：tes.json
            let db_tex_path = "dragon/" + heroName + "/" + heroName + "_tex";
            resources.load(db_tex_path, dragonBones.DragonBonesAtlasAsset, (err, atlasAsset) => {
                if (err) {
                    console.error("Failed to load hero: %s tes.json: %s", heroName, err);
                    return;
                }
                // 设置加载的资源到 ArmatureDisplay
                this.armatureDisplay.dragonAsset = skeAsset;
                this.armatureDisplay.dragonAtlasAsset = atlasAsset;
                this.armatureDisplay.setAnimationCacheMode(dragonBones.AnimationCacheMode.SHARED_CACHE);

                // 骨骼名称
                this.armatureDisplay.armatureName = "Armature";
            })
        })
    }

    // 获取动画控制实例
    public static getInstance(animationNode: Node, heroName: string): heroAnimationControl {
        if (!heroAnimationControl.instance) {
            heroAnimationControl.instance = new heroAnimationControl(animationNode, heroName);
        }

        return heroAnimationControl.instance;
    }

    public playAnimation(animName: AnimationType, playTimes?: number) {
        this.armatureDisplay.playAnimation(animName.toString(), playTimes);
    }
}

export function InitDBArmatureDisplay(animationNode: Node, heroName: string): dragonBones.ArmatureDisplay {
    let armatureDisplay = animationNode.getComponent(dragonBones.ArmatureDisplay);
    let db_ske_path = "dragon/" + heroName + "/" + heroName + "_ske";
    resources.load(db_ske_path, dragonBones.DragonBonesAsset, (err, skeAsset) => {
        if (err) {
            console.error("Failed to load hero: %s ske.json: %s", heroName, err);
            return;
        }
        // 2. 加载纹理数据：tes.json
        let db_tex_path = "dragon/" + heroName + "/" + heroName + "_tex";
        resources.load(db_tex_path, dragonBones.DragonBonesAtlasAsset, (err, atlasAsset) => {
            if (err) {
                console.error("Failed to load hero: %s tes.json: %s", heroName, err);
                return;
            }
            // 设置加载的资源到 ArmatureDisplay
            armatureDisplay.dragonAsset = skeAsset;
            armatureDisplay.dragonAtlasAsset = atlasAsset;
            armatureDisplay.setAnimationCacheMode(dragonBones.AnimationCacheMode.SHARED_CACHE);

            // 骨骼名称
            armatureDisplay.armatureName = "Armature";
        })
    })

    return armatureDisplay;
}