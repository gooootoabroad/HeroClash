// 加载器

import { resources, Sprite, SpriteFrame } from "cc";

// 加载rarity下资源
export function loadRaritySpriteFrame(sprite: Sprite, imageName: string) {
    let imagePath = "rarity/" + imageName + "/spriteFrame";
    _loadSpriteFrame(sprite, imagePath);
}

// 加载nations目录下的资源
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
