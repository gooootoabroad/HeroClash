import { _decorator, Button, Component, Label, Layout, Material, math, Node, Sprite, SpriteAtlas, SpriteFrame, UITransform } from 'cc';
import { BasicHeroAttribute, NationType } from "../resource/character/attribute";
import { getHeroMap } from "../resource/character/heroList";
const { ccclass, property } = _decorator;

@ccclass('herosBook')
export class herosBook extends Component {

    // 滚动列表内容
    private gContentNode: Node = null;

    // 英雄列表
    private gHerosMap: Map<string, BasicHeroAttribute> = null

    start() {
        this.gContentNode = this.node.getChildByName("HerosScrollView").getChildByName("view").getChildByName("content");
        this.gHerosMap = getHeroMap();
        // 注册Button事件
        let allHerosButton = this.node.getChildByName("HerosAllButton").getComponent(Button);
        allHerosButton.node.on(Button.EventType.CLICK, this.onAllHerosButtonClick, this);

        let weiGuoHerosButton = this.node.getChildByName("HerosWeiButton").getComponent(Button);
        weiGuoHerosButton.node.on(Button.EventType.CLICK, this.onWeiHerosButtonClick, this);

        let shuGuoHerosButton = this.node.getChildByName("HerosShuButton").getComponent(Button);
        shuGuoHerosButton.node.on(Button.EventType.CLICK, this.onShuHerosButtonClick, this);

        let wuGuoHerosButton = this.node.getChildByName("HerosWuButton").getComponent(Button);
        wuGuoHerosButton.node.on(Button.EventType.CLICK, this.onWuHerosButtonClick, this);

        let qunHerosButton = this.node.getChildByName("HerosQunButton").getComponent(Button);
        qunHerosButton.node.on(Button.EventType.CLICK, this.onQunHerosButtonClick, this);

        // 聚焦“全”英雄按钮

        // 加载所有英雄
        this.loadAllHeros();
    }

    private onAllHerosButtonClick(button: Button) {
        // 先删除挂载在父节点的其他英雄节点信息
        this.gContentNode.destroyAllChildren();
        // 加载英雄信息
        this.loadAllHeros();
    }

    private onWeiHerosButtonClick(button: Button) {
        // 先删除挂载在父节点的其他英雄节点信息
        this.gContentNode.destroyAllChildren();
        // 加载英雄信息
        this.loadWeiHeros();
    }
    private onShuHerosButtonClick(button: Button) {
        // 先删除挂载在父节点的其他英雄节点信息
        this.gContentNode.destroyAllChildren();
        // 加载英雄信息
        this.loadShuHeros();
    }
    private onWuHerosButtonClick(button: Button) {
        // 先删除挂载在父节点的其他英雄节点信息
        this.gContentNode.destroyAllChildren();
        // 加载英雄信息
        this.loadWuHeros();
    }
    private onQunHerosButtonClick(button: Button) {
        // 先删除挂载在父节点的其他英雄节点信息
        this.gContentNode.destroyAllChildren();
        // 加载英雄信息
        this.loadQunHeros();
    }
    // 加载所有英雄
    private loadAllHeros() {
        for (let [_, heroAttribute] of this.gHerosMap) {
            let heroNode = this.loadOneHero(heroAttribute);
            this.gContentNode.addChild(heroNode);
        };
    }

    // 加载魏国英雄
    private loadWeiHeros() {
        for (let [_, heroAttribute] of this.gHerosMap) {
            if (heroAttribute.nation !== NationType.weiguo) continue;
            let heroNode = this.loadOneHero(heroAttribute);
            this.gContentNode.addChild(heroNode);
        };
    }
    // 加载蜀国英雄
    private loadShuHeros() {
        for (let [_, heroAttribute] of this.gHerosMap) {
            if (heroAttribute.nation !== NationType.shuguo) continue;
            let heroNode = this.loadOneHero(heroAttribute);
            this.gContentNode.addChild(heroNode);
        };
    }
    // 加载吴国英雄
    private loadWuHeros() {
        for (let [_, heroAttribute] of this.gHerosMap) {
            if (heroAttribute.nation !== NationType.wuguo) continue;
            let heroNode = this.loadOneHero(heroAttribute);
            this.gContentNode.addChild(heroNode);
        };
    }
    // 加载群雄英雄
    private loadQunHeros() {
        for (let [_, heroAttribute] of this.gHerosMap) {
            if (heroAttribute.nation !== NationType.qunxiong) continue;
            let heroNode = this.loadOneHero(heroAttribute);
            this.gContentNode.addChild(heroNode);
        };
    }

    // 加载一个英雄
    private loadOneHero(heroAttribute: BasicHeroAttribute): Node {
        let parentNode = new Node("HeroButtonNode");
        // 调整按钮大小
        let transform = parentNode.addComponent(UITransform);
        let size = new math.Size;
        size.set(50, 50);
        transform.setContentSize(size);
        transform.enabled = true;
        // 调整按钮颜色
        // let sprite = parentNode.addComponent(Sprite);
        // sprite.customMaterial = new Material;
        // let color = new math.Color;
        // color.set(255, 255, 255);
        // sprite.color = color;
        // sprite.spriteAtlas = new SpriteAtlas;
        // let img = new  SpriteFrame;
        // sprite.spriteFrame = new SpriteFrame();

        let heroButton = parentNode.addComponent(Button);

        // 添加个Label节点
        let labelNode = new Node("LabelNode");

        let label = labelNode.addComponent(Label);
        // 设置颜色，黑色
        let nameColor = new math.Color;
        nameColor.set(0, 0, 0);
        label.color = nameColor;
        // 设置名称
        label.string = `${heroAttribute.basicAttribute.name}`;

        parentNode.addChild(labelNode);
        return parentNode;
    }
    update(deltaTime: number) {

    }
}


