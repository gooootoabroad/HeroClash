/* 英雄图鉴节点 */
import { getHeroMap } from "../resource/character/heroList";
import { BasicHeroAttribute, NationType } from "../resource/character/attribute";
import { instantiate, Label, Node, Prefab, resources, Sprite, SpriteFrame } from "cc";

export type HeroNodesMap = Map<string, Node>;

// 全英雄图鉴节点列表
export let GAllHeroNodesMap: HeroNodesMap = null;
// 魏国英雄图鉴节点列表
export let GWeiHeroNodesMap: HeroNodesMap = null;
// 蜀国英雄图鉴节点列表
export let GShuHeroNodesMap: HeroNodesMap = null;
// 吴国英雄图鉴节点列表
export let GWuHeroNodesMap: HeroNodesMap = null;
// 群雄英雄图鉴节点列表
export let GQunHeroNodesMap: HeroNodesMap = null;

// 英雄节点初始化
export function herosNodesInit() {
    GAllHeroNodesMap = new Map<string, Node>();
    allHerosNodesInit();
    GWeiHeroNodesMap = new Map<string, Node>();
    weiHerosNodesInit();
    GShuHeroNodesMap = new Map<string, Node>();
    shuHerosNodesInit();
    GWuHeroNodesMap = new Map<string, Node>();
    wuHerosNodesInit();
    GQunHeroNodesMap = new Map<string, Node>();
    qunHerosNodesInit();
}

// 初始化全英雄节点
function allHerosNodesInit() {
    // 英雄列表
    let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
    for (let [serialNumber, attribute] of gHerosMap) {
        GAllHeroNodesMap.set(serialNumber, createHeroNode(attribute));
    }
}

// 初始化魏国英雄节点
function weiHerosNodesInit() {
    // 英雄列表
    let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
    for (let [serialNumber, attribute] of gHerosMap) {
        if (attribute.nation != NationType.weiguo) continue;
        GWeiHeroNodesMap.set(serialNumber, createHeroNode(attribute));
    }
}

// 初始化蜀国英雄节点
function shuHerosNodesInit() {
    // 英雄列表
    let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
    for (let [serialNumber, attribute] of gHerosMap) {
        if (attribute.nation != NationType.shuguo) continue;
        GShuHeroNodesMap.set(serialNumber, createHeroNode(attribute));
    }
}

// 初始化吴国英雄节点
function wuHerosNodesInit() {
    // 英雄列表
    let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
    for (let [serialNumber, attribute] of gHerosMap) {
        if (attribute.nation != NationType.wuguo) continue;
        GWuHeroNodesMap.set(serialNumber, createHeroNode(attribute));
    }
}

// 初始化群雄英雄节点
function qunHerosNodesInit() {
    // 英雄列表
    let gHerosMap: Map<string, BasicHeroAttribute> = getHeroMap();
    for (let [serialNumber, attribute] of gHerosMap) {
        if (attribute.nation !== NationType.qunxiong) continue;
        GQunHeroNodesMap.set(serialNumber, createHeroNode(attribute));
    }
}

// 加载一个英雄
function createHeroNode(parentNode: Node, heroAttribute: BasicHeroAttribute): Node {
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
