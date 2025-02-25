/* 基础英雄类，用于卡牌展示等 */

import { BasicHeroAttribute, HeroRarityType } from './attribute';

import { getHeroMap, getDefaultHero } from "./heroList";

export class BasicHero {
    private gHeroAttribute: BasicHeroAttribute;

    // 通过英雄序号加载英雄信息
    public constructor(serialNumber: string) {
        this.load(serialNumber);
    }

    // 加载英雄信息
    private load(serialNumber: string) {
        let heroMap = getHeroMap();
        let res = heroMap.get(serialNumber);
        if (res != undefined) {
            this.gHeroAttribute = res;
            return;
        }

        // 出错打条日志，并使用默认数据
        console.warn("Failed to load hero info, serialNumber: %s, res: %s", serialNumber, res);
        this.gHeroAttribute = getDefaultHero();
        return;
    }

    // 获取名称
    public getName(): string {
        return this.gHeroAttribute.basicAttribute.name;
    }

    // 获取图片名称
    public getImageName(): string {
        return this.gHeroAttribute.basicAttribute.imageName;
    }

    // 获取等级
    public getLeval(): number {
        return this.gHeroAttribute.basicAttribute.leval;
    }

    // 获取角色职业
    public getRole(): string {
        return this.gHeroAttribute.basicAttribute.role;
    }

    // 获取英雄所属国家
    public getNation(): string {
        return this.gHeroAttribute.nation;
    }

    // 获取基础生命值
    public getBasicHealth(): number {
        return this.gHeroAttribute.basicAttribute.basicHealth;
    }

    // 获取基础攻击力
    public getBasicAttack(): number {
        return this.gHeroAttribute.basicAttribute.basicAttack;
    }

    // 获取基础防御力
    public getBasicDefense(): number {
        return this.gHeroAttribute.basicAttribute.basicDefense;
    }

    // 获取攻击速度
    public getBasicAttackSpeed(): number {
        return this.gHeroAttribute.basicAttribute.basicAttackSpeed;
    }

    // 获取暴击率
    public getBasicCriticalStrikeRate(): number {
        return this.gHeroAttribute.basicAttribute.basicCriticalStrikeRate;
    }

    // 获取暴击伤害
    public getBasicCriticalStrike(): number {
        return this.gHeroAttribute.basicAttribute.basicCriticalStrike;
    }

    // 获取技能列表
    public getSkills(): string[] {
        return this.gHeroAttribute.basicAttribute.skills;
    }

    // 获取分值
    public getScores(): number {
        return this.gHeroAttribute.basicAttribute.scores;
    }

    // 获取稀有度
    public getRarity(): HeroRarityType {
        return this.gHeroAttribute.rarity;
    }

    // 获取人物列传
    public getIntroduction(): string {
        return this.gHeroAttribute.introduction;
    }

}
