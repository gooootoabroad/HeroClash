/*英雄属性信息 */

import { _decorator, Button, Component, EventTarget, EventTouch, HorizontalTextAlignment, Label, Layers, math, Node, NodeEventType, Overflow, resources, Sprite, SpriteFrame, UITransform, VerticalTextAlignment } from 'cc';
import { BasicHero } from "../resource/character/basicHero";
import { GEventTarget, GEventUpdateHeroBasicAttributeCanvas } from '../utils/event';
import { getSkillMap } from "../resource/skills/skillList";
import { HeroSkill, HeroSkillType } from '../resource/skills/skill';
const { ccclass, property } = _decorator;

@ccclass('heroAttribute')
export class heroAttribute extends Component {
    // 英雄
    private gHero: BasicHero;
    // 技能树
    private skillMap: Map<string, HeroSkill>;

    // 英雄名称
    private heroNameLabel: Label = null;
    // 人物图片
    private heroImageSprite: Sprite = null;
    // 英雄等级
    private heroLevalLabel: Label = null;
    // 英雄所属国家
    private heroNationSprite: Sprite = null;
    // 稀有度
    private heroRaritySprite: Sprite = null;
    // 职业
    private heroRoleSprite: Sprite = null;
    // 人物列传
    private heroIntroductionLabel: Label = null;

    // 基础生命值
    private heroBasicHealthLabel: Label = null;
    // 基础攻击力
    private heroBasicAttackLabel: Label = null;
    // 基础防御力
    private heroBasicDefenseLabel: Label = null;
    // 基础攻击速度
    private heroBasicAttackSpeedLabel: Label = null;
    // 基础暴击率
    private heroBasicCriticalStrikeRateLabel: Label = null;
    // 基础暴击伤害
    private heroBasicCriticalStrikeLabel: Label = null;

    // 技能
    private heroSkillsContentNode: Node = null;

    start() {
        // 刚开始隐藏画布
        this.node.active = false;

        this.skillMap = getSkillMap();

        // 初始化各个组件
        this.heroNameLabel = this.node.getChildByName("Attribute").getChildByName("HeroBody").getChildByName("Name").getComponentInChildren(Label);
        this.heroImageSprite = this.node.getChildByName("Attribute").getChildByName("HeroBody").getChildByName("HeroImage").getComponent(Sprite);
        this.heroLevalLabel = this.node.getChildByName("Attribute").getChildByName("HeroBody").getChildByName("Leval").getComponentInChildren(Label);
        this.heroRaritySprite = this.node.getChildByName("Attribute").getChildByName("HeroBody").getChildByName("Rarity").getComponent(Sprite);
        this.heroRoleSprite = this.node.getChildByName("Attribute").getChildByName("HeroBody").getChildByName("Role").getComponent(Sprite);
        this.heroNationSprite = this.node.getChildByName("Attribute").getChildByName("HeroBody").getChildByName("Nation").getComponent(Sprite);

        this.heroIntroductionLabel = this.node.getChildByName("Attribute").getChildByName("Introduction").getComponentInChildren(Label);

        this.heroBasicHealthLabel = this.node.getChildByName("Attribute").getChildByName("BasicAttribute").getChildByName("BasicHealth").getComponentInChildren(Label);
        this.heroBasicAttackLabel = this.node.getChildByName("Attribute").getChildByName("BasicAttribute").getChildByName("BasicAttack").getComponentInChildren(Label);
        this.heroBasicDefenseLabel = this.node.getChildByName("Attribute").getChildByName("BasicAttribute").getChildByName("BasicDefense").getComponentInChildren(Label);
        this.heroBasicAttackSpeedLabel = this.node.getChildByName("Attribute").getChildByName("BasicAttribute").getChildByName("BasicAttackSpeed").getComponentInChildren(Label);
        this.heroBasicCriticalStrikeRateLabel = this.node.getChildByName("Attribute").getChildByName("BasicAttribute").getChildByName("BasicCriticalStrikeRate").getComponentInChildren(Label);
        this.heroBasicCriticalStrikeLabel = this.node.getChildByName("Attribute").getChildByName("BasicAttribute").getChildByName("BasicCriticalStrike").getComponentInChildren(Label);

        this.heroSkillsContentNode = this.node.getChildByName("Attribute").getChildByName("Skill").getChildByName("view").getChildByName("content");

        // 监听事件，并初始化数值
        GEventTarget.on(GEventUpdateHeroBasicAttributeCanvas, (serialNumber) => {
            this.viewHeroAttribute(serialNumber);
            this.node.active = true;
        },
            this
        );

        this.node.on(NodeEventType.TOUCH_END, this.onFullScreenClick, this);
    }

    protected onDestroy(): void {
        this.node.off(NodeEventType.TOUCH_END, this.onFullScreenClick, this);
    }
    private viewHeroAttribute(serialNumber: string) {
        this.loadHeroAttribute(serialNumber);
        this.node.active = true;
    }

    // 加载英雄信息
    private loadHeroAttribute(serialNumber: string) {
        this.gHero = new BasicHero(serialNumber);
        console.log("new a hero: ", this.gHero);

        this.loadName();
        this.loadImage();
        this.loadLeval();
        this.loadRarity();
        this.loadRole();
        this.loadNation();
        this.loadIntroduction();
        this.loadBasicHealth();
        this.loadBasicAttack();
        this.loadBasicDefense();
        this.loadBasicAttackSpeed();
        this.loadBasicCriticalStrikeRate();
        this.loadBasicCriticalStrike();
        this.loadSkills();
    }

    // 加载人物名称
    private loadName() {
        this.heroNameLabel.string = `${this.gHero.getName()}`;
    }

    // 加载人物图片
    private loadImage() {
        let imagePath: string = "heros/" + this.gHero.getImageName() + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.heroImageSprite.spriteFrame = spriteFrame;
        });
    }

    // 加载英雄等级
    private loadLeval() {
        this.heroLevalLabel.string = `LV.${this.gHero.getLeval()}`;
    }

    // 加载稀有度
    private loadRarity() {
        let imagePath: string = "words/" + this.gHero.getRarity() + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.heroRaritySprite.spriteFrame = spriteFrame;

        });
    }

    // 加载职业
    private loadRole() {
        let imagePath: string = "roles/" + this.gHero.getRole() + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.heroRoleSprite.spriteFrame = spriteFrame;

        });
    }

    // 加载人物所属国家
    private loadNation() {
        let imagePath: string = "nations/" + this.gHero.getNation() + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.heroNationSprite.spriteFrame = spriteFrame;

        });
    }
    // 加载人物列传
    private loadIntroduction() {
        this.heroIntroductionLabel.string = `${this.gHero.getIntroduction()}`;
    }

    // 加载生命值
    private loadBasicHealth() {
        this.heroBasicHealthLabel.string = `${this.gHero.getBasicHealth()}`;
    }
    // 加载基础攻击力
    private loadBasicAttack() {
        this.heroBasicAttackLabel.string = `${this.gHero.getBasicAttack()}`;
    }

    // 加载防御力
    private loadBasicDefense() {
        this.heroBasicDefenseLabel.string = `${this.gHero.getBasicDefense()}`;
    }

    // 加载攻击速度
    private loadBasicAttackSpeed() {
        this.heroBasicAttackSpeedLabel.string = `${this.gHero.getBasicAttackSpeed()}`;
    }

    // 加载暴击率
    private loadBasicCriticalStrikeRate() {
        this.heroBasicCriticalStrikeRateLabel.string = `${this.gHero.getBasicCriticalStrikeRate()}%`;
    }

    // 加载暴击伤害
    private loadBasicCriticalStrike() {
        this.heroBasicCriticalStrikeLabel.string = `${this.gHero.getBasicCriticalStrike()}%`;
    }

    // 加载所有技能
    private loadSkills() {
        // 先销毁已有技能
        this.heroSkillsContentNode.destroyAllChildren();
        // 再加载新技能
        let skillIDs = this.gHero.getSkills();

        for (const skillID of skillIDs) {

            let skill = this.skillMap.get(skillID);
            this.heroSkillsContentNode.addChild(this.loadSkill(skill));
        }
    }

    // 点击到屏幕背景框时，隐藏英雄属性界面
    private onFullScreenClick(event: EventTouch) {
        this.node.active = false;
    }

    // 加载一个技能
    private loadSkill(heroSkill: HeroSkill): Node {
        let parentNode = new Node("SkillNode");
        let uiTransform = parentNode.addComponent(UITransform);
        let parentNodeSprite = parentNode.addComponent(Sprite);
        let textNode = new Node("Text");
        let textNodeTransform = textNode.addComponent(UITransform);
        let textLabel = textNode.addComponent(Label);
        parentNode.addChild(textNode);
        let introductionNode = new Node("Introduction");
        let introductionNodeTransform = introductionNode.addComponent(UITransform);
        let introductionNodeSprite = introductionNode.addComponent(Sprite);
        parentNode.addChild(introductionNode);
        let introductionTextNode = new Node("IntroductionText");
        let introductionTextNodeTransform = introductionTextNode.addComponent(UITransform);
        let introductionLabel = introductionTextNode.addComponent(Label);
        introductionNode.addChild(introductionTextNode);

        // 设置父节点层次
        parentNode.layer = Layers.Enum.UI_2D;
        // 调整父节点大小
        let parentNodeSize = new math.Size;
        parentNodeSize.set(480, 70);
        uiTransform.setContentSize(parentNodeSize);

        // 设置技能名称节点层次
        textNode.layer = Layers.Enum.UI_2D;
        // 设置技能名称节点大小和坐标
        let skillTextNodeSize = new math.Size;
        skillTextNodeSize.set(450, 20);
        textNodeTransform.setContentSize(skillTextNodeSize);
        textNode.setPosition(-6, 22);
        // 左对齐
        textLabel.horizontalAlign = HorizontalTextAlignment.LEFT;
        // 上对齐
        textLabel.verticalAlign = VerticalTextAlignment.TOP;
        // 溢出处理，节点约束框之外的文字会被截断。
        textLabel.overflow = Overflow.CLAMP;
        // 字体大小
        textLabel.fontSize = 15;
        // 字体颜色
        textLabel.color = math.color(0, 0, 0, 255);
        // 技能名称
        let skillTypeDes = heroSkill.type === HeroSkillType.active ? "主动技能" : "被动技能";
        textLabel.string = `${skillTypeDes}        ${heroSkill.name}`
        // 调整父节点图片
        parentNodeSprite.sizeMode = Sprite.SizeMode.CUSTOM;
        let parentNodeImagePath: string = "heroAttribute/" + "skill" + "/spriteFrame";
        resources.load(parentNodeImagePath, SpriteFrame, (err, spriteFrame) => {
            parentNodeSprite.spriteFrame = spriteFrame;
        });

        // 设置节点层次
        introductionNode.layer = Layers.Enum.UI_2D;
        // 调整技能大小和坐标
        let introductionNodeSize = new math.Size;
        introductionNodeSize.set(40, 40);
        introductionNodeTransform.setContentSize(introductionNodeSize);
        introductionNode.setPosition(-205, -12);

        // 调整技能图标
        introductionNodeSprite.sizeMode = Sprite.SizeMode.CUSTOM;
        let introductionNodeImagePath: string = "skills/" + heroSkill.imageName + "/spriteFrame";
        resources.load(introductionNodeImagePath, SpriteFrame, (err, spriteFrame) => {
            introductionNodeSprite.spriteFrame = spriteFrame;
        });

        // 设置节点层次
        introductionTextNode.layer = Layers.Enum.UI_2D;
        // 设置技能描述大小和位置
        let introductionTextNodeSize = new math.Size;
        introductionTextNodeSize.set(400, 40);
        introductionTextNodeTransform.setContentSize(introductionTextNodeSize);
        introductionTextNode.setPosition(238, 0, 0);
        // 左对齐
        introductionLabel.horizontalAlign = HorizontalTextAlignment.LEFT;
        // 中心对齐
        introductionLabel.verticalAlign = VerticalTextAlignment.CENTER;
        // 溢出处理，节点约束框之外的文字会被截断。
        introductionLabel.overflow = Overflow.CLAMP;
        // 字体大小
        introductionLabel.fontSize = 15;
        // 字体颜色
        introductionLabel.color = math.color(0, 0, 0, 255);
        // 字体间隔
        introductionLabel.lineHeight = 16;
        // 自动换行
        introductionLabel.enableWrapText = true;
        // 技能描述
        introductionLabel.string = heroSkill.description;

        return parentNode;
    }
    update(deltaTime: number) {

    }


}


