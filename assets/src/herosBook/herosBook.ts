import { _decorator, Button, Component, HorizontalTextAlignment, Label, Layout, Material, math, Node, resources, Sprite, SpriteAtlas, SpriteFrame, UITransform, VerticalTextAlignment } from 'cc';
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

        // TODO：资源预加载，提升后续load图片效率，这个后续得调到游戏开始界面
        this.preloadHerosImage();

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

    // 预加载英雄图片
    private preloadHerosImage() {
        for (let [_, heroAttribute] of this.gHerosMap) {
            resources.preload("heros/" + heroAttribute.basicAttribute.imageName + "/spriteFrame", SpriteFrame);
        };
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
        size.set(150, 150);
        transform.setContentSize(size);
        // 调整按钮颜色
        let sprite = parentNode.addComponent(Sprite);
        // sprite.customMaterial = new Material;
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        let imagePath: string = "heros/" + heroAttribute.basicAttribute.imageName + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
        });

        let heroButton = parentNode.addComponent(Button);

        // 添加个Label节点
        let labelNode = new Node("LabelNode");
        // 设置label节点大小
        let LabelTransform = labelNode.addComponent(UITransform);
        LabelTransform.setContentSize(size);
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
        parentNode.addChild(labelNode);
        return parentNode;
    }
    update(deltaTime: number) {

    }
}


