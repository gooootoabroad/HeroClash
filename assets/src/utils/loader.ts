// 加载器

import { resources, Sprite, SpriteFrame } from "cc";

// 加载roles下图片资源
export function loadRolesSpriteFrame(sprite: Sprite, imageName: string) {
    let imagePath = "roles/" + imageName + "/spriteFrame";
    _loadSpriteFrame(sprite, imagePath);
}

// 加载words下图片资源
export function loadWordsSpriteFrame(sprite: Sprite, imageName: string) {
    let imagePath = "words/" + imageName + "/spriteFrame";
    _loadSpriteFrame(sprite, imagePath);
}

// 加载heros下图片资源
export function loadHerosSpriteFrame(sprite: Sprite, imageName: string) {
    let imagePath = "heros/" + imageName + "/spriteFrame";
    _loadSpriteFrame(sprite, imagePath);
}

// 加载rarity下图片资源
export function loadRaritySpriteFrame(sprite: Sprite, imageName: string) {
    let imagePath = "rarity/" + imageName + "/spriteFrame";
    _loadSpriteFrame(sprite, imagePath);
}

// 加载nations目录下的图片资源
export function loadNationsSpriteFrame(sprite: Sprite, imageName: string) {
    let imagePath = "nations/" + imageName + "/spriteFrame";
    _loadSpriteFrame(sprite, imagePath);
}

// 加载SpriteFrame
function _loadSpriteFrame(sprite: Sprite, path: string) {
    resources.load(path, SpriteFrame, (err, spriteFrame) => {
        if (err) {
            console.warn(err);
            return;
        }
        sprite.spriteFrame = spriteFrame;
    });
}
