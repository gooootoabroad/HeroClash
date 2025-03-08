import { BasicHeroAttribute } from '../resource/character/attribute';

interface enhancementInfo {
    // 强化等级
    level: number;
    // 强化效果
    effects: number;
}

interface HeroInfo {
    // 英雄唯一ID
    id: string;
    // 英雄图鉴序号ID
    seqID: string;
    // 英雄名字
    name: string;
    // 英雄等级
    level: number;
    // 武器强化信息
    weaponEnhancement: enhancementInfo,
    // 头盔强化信息
    helmetEnhancement: enhancementInfo,
    // 铁甲强化信息
    armorEnhancement: enhancementInfo,
    // 手镯强化信息
    braceletEnhancement: enhancementInfo,
    // 战马强化信息
    horseEnhancementWeapon: enhancementInfo,
    // 全属性强化信息
    dragonEnhancementWeapon: enhancementInfo,
    // 图鉴的基础信息
    basicHeroAttribute?: BasicHeroAttribute
}

// 获取不带基础信息的玩家英雄信息
export function getPlayerHerosInfo(): HeroInfo[] {
    return [{
        id: "1",
        seqID: "1",
        name: "niuma",
        level: 1,
        weaponEnhancement: { level: 0, effects: 0 },
        helmetEnhancement: { level: 0, effects: 0 },
        armorEnhancement: { level: 0, effects: 0 },
        braceletEnhancement: { level: 0, effects: 0 },
        horseEnhancementWeapon: { level: 0, effects: 0 },
        dragonEnhancementWeapon: { level: 0, effects: 0 },
    }]
}