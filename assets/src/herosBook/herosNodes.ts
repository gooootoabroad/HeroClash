/* 英雄图鉴节点 */
import { getHeroMap } from "../resource/character/heroList";
import { BasicHeroAttribute, NationType } from "../resource/character/attribute";
import { Button, HorizontalTextAlignment, Label, Layers, math, Node, resources, Sprite, SpriteFrame, UITransform, VerticalTextAlignment } from "cc";
import { GHeroLabelNodeName } from "./kind";

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
function createHeroNode(heroAttribute: BasicHeroAttribute): Node {
    let parentNode = new Node("HeroButtonNode");
    let uiTransform = parentNode.addComponent(UITransform);
    let sprite = parentNode.addComponent(Sprite);
    parentNode.addComponent(Button);
    let labelNode = new Node(GHeroLabelNodeName);
    let labelTransform = labelNode.addComponent(UITransform);
    parentNode.addChild(labelNode);

    // 注册事件，无需销毁，跟随程序结束而销毁

    // 设置节点层次
    parentNode.layer = Layers.Enum.UI_2D;

    // 调整按钮大小
    let size = new math.Size;
    size.set(150, 150);
    uiTransform.setContentSize(size);

    // 调整按钮颜色
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    let imagePath: string = "heros/" + heroAttribute.basicAttribute.imageName + "/spriteFrame";
    resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
    });

    // 设置label节点大小
    labelTransform.setContentSize(size);
    let label = labelNode.addComponent(Label);

    // 设置颜色，黑色
    let nameColor = new math.Color;
    nameColor.set(0, 0, 0);
    label.color = nameColor;
    // 设置名称
    label.string = `${heroAttribute.basicAttribute.name}`;
    // 设置大小
    label.fontSize = 10;
    // 设置位置
    label.horizontalAlign = HorizontalTextAlignment.LEFT;
    label.verticalAlign = VerticalTextAlignment.TOP;

    return parentNode;
}

