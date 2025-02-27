/* 英雄图鉴节点 */
import { BasicHeroAttribute } from "../resource/character/attribute";
import { Label, Node, resources, Sprite, SpriteFrame } from "cc";

export type HeroNodesMap = Map<string, Node>;

// 加载一个英雄
export function createHeroNode(parentNode: Node, heroAttribute: BasicHeroAttribute): Node {
    let heroNameLabel = parentNode.getChildByName("Name").getComponentInChildren(Label);
    let heroImageSprite = parentNode.getChildByName("HeroFrame").getChildByName("InsideFrame1").getChildByName("InsideFrame2").getChildByName("Mask").getChildByName("HeroImage").getComponent(Sprite);
    let heroLevalLabel = parentNode.getChildByName("Leval").getComponentInChildren(Label);
    let heroRaritySprite = parentNode.getChildByName("Rarity").getComponent(Sprite);
    let heroRoleSprite = parentNode.getChildByName("Role").getComponent(Sprite);
    let heroNationSprite = parentNode.getChildByName("Nation").getComponent(Sprite);

    heroNameLabel.string = `${heroAttribute.basicAttribute.name}`;

    let imagePath: string = "heros/" + heroAttribute.basicAttribute.imageName + "/spriteFrame";
    resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
        if (err) {
            console.warn(err);
            return;
        }
        heroImageSprite.spriteFrame = spriteFrame;
    });

    heroLevalLabel.string = `LV.${heroAttribute.basicAttribute.leval}`;

    imagePath = "words/" + heroAttribute.rarity + "/spriteFrame";
    resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
        if (err) {
            console.warn(err);
            return;
        }
        heroRaritySprite.spriteFrame = spriteFrame;
    });

    imagePath = "roles/" + heroAttribute.basicAttribute.role + "/spriteFrame";
    resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
        if (err) {
            console.warn(err);
            return;
        }
        heroRoleSprite.spriteFrame = spriteFrame;
    });


    imagePath = "nations/" + heroAttribute.nation + "/spriteFrame";
    resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
        if (err) {
            console.warn(err);
            return;
        }
        heroNationSprite.spriteFrame = spriteFrame;

    });


    return parentNode;
}
