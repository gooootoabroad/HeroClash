/* 英雄属性定义 */


// 英雄稀有度定义
export enum HeroRarityType {
    normal = "normal",          // 普通
    well = "well",              // 良好
    excellent = "excellent",    // 精良
    epic = "epic",              // 史诗
    legend = "legend",          // 传说
}

// 英雄职业定义
export enum HeroProfessionType {
    warrior = "warrior",            // 战士
    mage = "mage",                  // 法师
    crossbowman = "crossbowman",    // 弓弩手
}

// 英雄技能定义 TODO：待补充
export enum HeroSkillType {

}

// 英雄属性
export interface HeroAttribute {
    id: string;                     // 英雄ID
    name: string;                   // 英雄名称
    profession: HeroProfessionType; // 职业
    rarity: HeroRarityType;         // 稀有度
    leval: number;                  // 等级

    basicAttack: number;            // 基础攻击力
    basicdefense: number;           // 基础防御力
    basicHealth: number;            // 基础生命值
    basicAttackSpeed: number;       // 基础攻击速度
    basicCriticalStrikeRate: number; // 基础暴击率
    basicCriticalStrike: number;    // 基础暴击伤害

    skills: HeroSkillType[];        // 技能栏
    scores: number;                 // 分值，用于计算战力
}
