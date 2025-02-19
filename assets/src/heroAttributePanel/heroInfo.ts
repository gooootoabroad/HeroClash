import { _decorator, Button, Component, Label, Node } from 'cc';
import { BasicHero } from "../resource/character/basicHero";
const { ccclass, property } = _decorator;

@ccclass('heroInfo')
export class heroInfo extends Component {
    // 英雄序号 TODO：传入ID
    private gHeroSerialNumber: string = "4";

    // 英雄
    private gHero: BasicHero;


    protected onLoad(): void {

    }

    start() {
        this.gHero = new BasicHero(this.gHeroSerialNumber);
        console.log("new a hero: ", this.gHero);

        this.loadName();
        this.loadImage();
        this.loadLeval();
        this.loadRarity();
        this.loadRole();
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
        let label = this.node.getChildByName("Name").getComponent(Label);
        label.string = `人物名称：${this.gHero.getName()}`;
    }

    // 加载人物图片
    private loadImage() {
        // TODO待补充
    }

    // 加载等级
    private loadLeval() {
        let button = this.node.getChildByName("Leval").getComponent(Button);
        button.getComponentInChildren(Label).string = `LV.${this.gHero.getLeval()}`;
    }

    // 加载稀有度
    private loadRarity() {
        let button = this.node.getChildByName("Rarity").getComponent(Button);
        button.getComponentInChildren(Label).string = `稀有度：${this.gHero.getRarity()}`;
    }

    // 加载职业
    private loadRole() {
        let button = this.node.getChildByName("Role").getComponent(Button);
        button.getComponentInChildren(Label).string = `职业：${this.gHero.getRole()}`;
    }

    // 加载人物列传
    private loadIntroduction() {
        let label = this.node.getChildByName("Introduction").getComponent(Label);
        label.string = `人物列传：${this.gHero.getIntroduction()}`;
    }

    // 加载生命值
    private loadBasicHealth() {
        let button = this.node.getChildByName("BasicHealth").getComponent(Button);
        button.getComponentInChildren(Label).string = `生命值：${this.gHero.getBasicHealth()}`;
    }
    // 加载基础攻击力
    private loadBasicAttack() {
        let button = this.node.getChildByName("BasicAttack").getComponent(Button);
        button.getComponentInChildren(Label).string = `攻击力：${this.gHero.getBasicAttack()}`;
    }

    // 加载防御力
    private loadBasicDefense() {
        let button = this.node.getChildByName("BasicDefense").getComponent(Button);
        button.getComponentInChildren(Label).string = `防御力：${this.gHero.getBasicDefense()}`;
    }

    // 加载攻击速度
    private loadBasicAttackSpeed() {
        let button = this.node.getChildByName("BasicAttackSpeed").getComponent(Button);
        button.getComponentInChildren(Label).string = `攻击速度：${this.gHero.getBasicAttackSpeed()}`;
    }

    // 加载暴击率
    private loadBasicCriticalStrikeRate() {
        let button = this.node.getChildByName("BasicCriticalStrikeRate").getComponent(Button);
        button.getComponentInChildren(Label).string = `暴击：${this.gHero.getBasicCriticalStrikeRate()}%`;
    }

    // 加载暴击伤害
    private loadBasicCriticalStrike() {
        let button = this.node.getChildByName("BasicCriticalStrike").getComponent(Button);
        button.getComponentInChildren(Label).string = `暴伤：${this.gHero.getBasicCriticalStrike()}%`;
    }

    // 加载第一个技能
    private loadSkill1() {
        let button = this.node.getChildByName("Skill1").getComponent(Button);
        button.getComponentInChildren(Label).string = `${this.gHero.getSkills()[0]}`;
    }
    // 加载第二个技能
    private loadSkill2() {
        let button = this.node.getChildByName("Skill2").getComponent(Button);
        button.getComponentInChildren(Label).string = `${this.gHero.getSkills()[1]}`;
    }

    // 加载第三个技能
    private loadSkill3() {
        let button = this.node.getChildByName("Skill3").getComponent(Button);
        button.getComponentInChildren(Label).string = `${this.gHero.getSkills()[2]}`;
    }
    // 加载第四个技能
    private loadSkill4() {
        let button = this.node.getChildByName("Skill4").getComponent(Button);
        button.getComponentInChildren(Label).string = `${this.gHero.getSkills()[3]}`;
    }

    update(deltaTime: number) {

    }


}


