// 英雄图鉴

import { _decorator, Button, Canvas, Component, director, HorizontalTextAlignment, Label, Layout, Material, math, Node, resources, Script, Sprite, SpriteAtlas, SpriteFrame, UITransform, VerticalTextAlignment } from 'cc';
import { BasicHeroAttribute, NationType } from "../resource/character/attribute";
import { herosNodesInit } from './herosNodes';
const { ccclass, property } = _decorator;

enum HerosButtonType {
    All,
    Wei,
    Shu,
    Wu,
    Qun,
}

// 英雄画布-按钮
interface HerosCanvasType {
    button: Button;
    canvas: Node;
}

@ccclass('herosBook')
export class herosBook extends Component {
    // 画布列表
    private canvasMap: Map<HerosButtonType, HerosCanvasType> = null;

    // 按钮列表
    @property(Button)
    public allHerosButton: Button = null;
    @property(Button)
    public weiGuoHerosButton: Button = null;
    @property(Button)
    public shuGuoHerosButton: Button = null;
    @property(Button)
    public wuGuoHerosButton: Button = null;
    @property(Button)
    public qunHerosButton: Button = null;

    // 画布列表
    @property(Node)
    public allHerosCanvas: Node = null;
    @property(Node)
    public weiHerosCanvas: Node = null;
    @property(Node)
    public shuHerosCanvas: Node = null;
    @property(Node)
    public wuHerosCanvas: Node = null;
    @property(Node)
    public qunHerosCanvas: Node = null;

    protected onLoad(): void {
        // TODO: 后续放游戏加载时初始化
        herosNodesInit();

        this.canvasMap = new Map<HerosButtonType, HerosCanvasType>();
        this.canvasMap.set(HerosButtonType.All, { button: this.allHerosButton, canvas: this.allHerosCanvas });
        this.canvasMap.set(HerosButtonType.Wei, { button: this.allHerosButton, canvas: this.allHerosCanvas });
        this.canvasMap.set(HerosButtonType.Shu, { button: this.allHerosButton, canvas: this.allHerosCanvas });
        this.canvasMap.set(HerosButtonType.Wu, { button: this.allHerosButton, canvas: this.allHerosCanvas });
        this.canvasMap.set(HerosButtonType.Qun, { button: this.allHerosButton, canvas: this.allHerosCanvas });
    }

    start() {
        this.canvasMap.forEach((canvasItem, keyButtonType) => {

            canvasItem.button.interactable = true;
            canvasItem.canvas.active = false;

        });
        this.change2AllHerosCanvas();
    }


    update(deltaTime: number) {

    }

    public change2AllHerosCanvas() {
        this.changeCanvas(HerosButtonType.All);
    }

    public change2WeiHerosCanvas() {
        this.changeCanvas(HerosButtonType.Wei);
    }

    public change2ShuHerosCanvas() {
        this.changeCanvas(HerosButtonType.Shu);
    }

    public change2WuHerosCanvas() {
        this.changeCanvas(HerosButtonType.Wu);
    }

    public change2QunHerosCanvas() {
        this.changeCanvas(HerosButtonType.Qun);
    }

    private changeCanvas(buttonType: HerosButtonType) {
        // 先启用其他按钮并隐藏对应的画布
        this.canvasMap.forEach((canvasItem, keyButtonType) => {
            if (keyButtonType !== buttonType) {
                canvasItem.button.interactable = true;
                canvasItem.canvas.active = false;
            }
        });

        // 禁用当前按钮并打开画布
        const currentStoreItem = this.canvasMap.get(buttonType);
        if (currentStoreItem) {
            currentStoreItem.button.interactable = false;
            currentStoreItem.canvas.active = true;
        }
    }
}


