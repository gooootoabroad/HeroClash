// 数据库与domino结构体互转层

import { deepCopy } from "../utils/copy";
import { CharacterBasicAttribute, DBPlayerHero } from "./database/database";
import { HeroInfo } from "./domino";

// 获取英雄基础属性MAP，
export function getHerosBasicAttMap(heros: CharacterBasicAttribute[]): Map<string, CharacterBasicAttribute> {
    var herosMap = new Map<string, CharacterBasicAttribute>();
    heros.forEach((heroTmp) => {
        herosMap.set(heroTmp.seqID, deepCopy(heroTmp));
    });
    return herosMap;
}

export function dbConvert2Hero(playHero: DBPlayerHero, basicHero: CharacterBasicAttribute): HeroInfo {
    var hero: HeroInfo = {
        // 英雄唯一ID
        id: playHero.id,
        // 英雄图鉴序号ID
        seqID: playHero.seqID,
        // 英雄名字
        name: playHero.name,
        // 英雄等级
        level: playHero.level,
        // 武器强化信息
        weaponEnhancement: playHero.weaponEnhancement,
        // 头盔强化信息
        helmetEnhancement: playHero.helmetEnhancement,
        // 铁甲强化信息
        armorEnhancement: playHero.armorEnhancement,
        // 手镯强化信息
        braceletEnhancement: playHero.braceletEnhancement,
        // 战马强化信息
        horseEnhancementWeapon: playHero.horseEnhancementWeapon,
        // 全属性强化信息
        dragonEnhancementWeapon: playHero.dragonEnhancementWeapon,
        // 上阵情况
        deploy: playHero.deploy,
        basicHeroAttribute: {
            // 人物序号
            seqID: basicHero.seqID,
            // 人物名称
            name: basicHero.name,
            // 职业
            role: basicHero.role,
            // 图像名称
            imageName: basicHero.imageName,
            // 是否远程攻击，法师也有可能是近战法师
            isLong: basicHero.isLong,
            // 稀有度
            rarity: basicHero.rarity,
            // 国家
            nation: basicHero.nation,
            // 人物列传
            introduction: basicHero.introduction,

            // 基础生命值
            basicHealth: basicHero.basicHealth,
            // 基础攻击力
            basicAttack: basicHero.basicAttack,
            // 基础防御力
            basicDefense: basicHero.basicDefense,
            // 基础攻击速度
            basicAttackSpeed: basicHero.basicAttackSpeed,
            // 基础暴击率
            basicCriticalStrikeRate: basicHero.basicCriticalStrikeRate,
            // 基础暴击伤害
            basicCriticalStrike: basicHero.basicCriticalStrike,

            // 技能ID列表
            skillIDs: basicHero.skillIDs,
            // 分值，用于计算战力
            scores: basicHero.scores,
        }
    }
    return hero;
}