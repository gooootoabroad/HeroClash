import { dragonBones, resources } from "cc";

// 动画效果
export enum AnimationType {
    Standby = "standby",    // 站立等待
    Attack = "attack",      // 攻击
    Attacked = "attacked",  // 被攻击
    Died = "died",          // 死亡
    Skill1 = "ability1",    // 技能
}

// 初始化动画
// @param imageName 动图名称，例如 niuma
export function initAnimation(display: dragonBones.ArmatureDisplay, imageName: string) {
    let skePath = "dragon/" + imageName + "/" + imageName + "_ske";
    resources.load(skePath, dragonBones.DragonBonesAsset, (err, skeAsset) => {
        if (err) {
            console.error("Failed to load ske.json:", err);
            return;
        }
        // 2. 加载纹理数据：tes.json
        let texPath = "dragon/" + imageName + "/" + imageName + "_tex";
        resources.load(texPath, dragonBones.DragonBonesAtlasAsset, (err, atlasAsset) => {
            if (err) {
                console.error("Failed to load tes.json:", err);
                return;
            }
            // 设置加载的资源到 ArmatureDisplay
            display.dragonAsset = skeAsset;
            display.dragonAtlasAsset = atlasAsset;

            // 骨骼名称
            display.armatureName = "Armature";
            display.playAnimation(AnimationType.Standby, 0);
        })
    })
}