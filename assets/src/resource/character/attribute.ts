/* 人物属性定义 */

// 人物属性
export interface CharacterAttribute {
    serialNumber: string            // 人物序号
    name: string;                   // 人物名称
    role: RoleType;                 // 职业
    leval: number;                  // 等级
    imageName: string;              // 图像名称

    basicHealth: number;            // 基础生命值
    basicAttack: number;            // 基础攻击力
    basicDefense: number;           // 基础防御力
    basicAttackSpeed: number;       // 基础攻击速度
    basicCriticalStrikeRate: number; // 基础暴击率
    basicCriticalStrike: number;    // 基础暴击伤害

    skills: HeroSkillType[];        // 技能栏
    scores: number;                 // 分值，用于计算战力
}

export interface BasicHeroAttribute {
    basicAttribute: CharacterAttribute; // 基础属性
    rarity: HeroRarityType;             // 稀有度
    nation: NationType;                 // 国家
    introduction: string;               // 人物列传
}

// 英雄稀有度定义
export enum HeroRarityType {
    normal = "normal",  // 普通
    well = "well",      // 良好
    excellent = "excellent", // 精良
    epic = "epic",      // 史诗
    legend = "legend",      // 传说
}

// 人物职业定义
export enum RoleType {
    warrior = "warrior",            // 战士
    mage = "mage",                  // 法师
    crossbowman = "crossbowman",    // 射手
    auxiliary = "auxiliary",        // 辅助
}

// 国家定义
export enum NationType {
    weiguo = "wei", // 魏国
    shuguo = "shu", // 蜀国
    wuguo = "wu",   // 吴国
    qunxiong = "qun",   //群雄
}

// 人物技能定义 TODO：待补充
export enum HeroSkillType {
    S1 = "S1",
    S2 = "S2",
    S3 = "S3",
    S4 = "S4",
}
