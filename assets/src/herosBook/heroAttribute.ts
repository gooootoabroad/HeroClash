/*英雄属性信息 */

import { _decorator, Button, Component, EventTarget, EventTouch, Label, Node, NodeEventType, resources, Sprite, SpriteFrame } from 'cc';
import { BasicHero } from "../resource/character/basicHero";
import { GEventTarget, GEventUpdateHeroBasicAttributeCanvas } from '../utils/event';
import { NationType } from '../resource/character/attribute';
const { ccclass, property } = _decorator;

@ccclass('heroAttribute')
export class heroAttribute extends Component {
    // 英雄
    private gHero: BasicHero;

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

    // 第一个技能
    private heroFirstSkillLabel: Label = null;
    // 第二个技能
    private heroSecondSkillLabel: Label = null;
    // 第三个技能
    private heroThridSkillLabel: Label = null;
    // 第四个技能
    private heroFourthSkillLabel: Label = null;

    start() {
        // 刚开始隐藏画布
        this.node.active = false;

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

        this.heroFirstSkillLabel = this.node.getChildByName("Attribute").getChildByName("Skill").getChildByName("Skill1").getComponentInChildren(Label);
        this.heroSecondSkillLabel = this.node.getChildByName("Attribute").getChildByName("Skill").getChildByName("Skill2").getComponentInChildren(Label);
        this.heroThridSkillLabel = this.node.getChildByName("Attribute").getChildByName("Skill").getChildByName("Skill3").getComponentInChildren(Label);
        this.heroFourthSkillLabel = this.node.getChildByName("Attribute").getChildByName("Skill").getChildByName("Skill4").getComponentInChildren(Label);

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
        this.loadSkill1();
        this.loadSkill2();
        this.loadSkill3();
        this.loadSkill4();
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

    // 加载第一个技能
    private loadSkill1() {
        this.heroFirstSkillLabel.string = `${this.gHero.getSkills()[0]}`;
    }
    // 加载第二个技能
    private loadSkill2() {
        this.heroSecondSkillLabel.string = `${this.gHero.getSkills()[1]}`;
    }

    // 加载第三个技能
    private loadSkill3() {
        this.heroThridSkillLabel.string = `${this.gHero.getSkills()[2]}`;
    }
    // 加载第四个技能
    private loadSkill4() {
        this.heroFourthSkillLabel.string = `${this.gHero.getSkills()[3]}`;
    }

    // 点击到屏幕背景框时，隐藏英雄属性界面
    private onFullScreenClick(event: EventTouch) {
        this.node.active = false;
    }

    update(deltaTime: number) {

    }


}


