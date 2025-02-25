// 

export interface HeroSkill {
    id: string,             // ID
    name: string,           // 技能名称
    imageName: string,      // 技能图片名称
    type: HeroSkillType,    // 技能类型，主动还是被动技能
    description: string,    // 技能描述
    doTimeSecond: number,   // 预留，动作施法时间
    cdTimeSecond: number,   // 技能冷却时间
    attackType: HeroSkillAttackType, // 攻击类型，单体攻击还是群攻
    specialAttack: HeroSpecialAttackType,  // 特殊攻击效果，例如回血、减防、击飞
    basicAttack: number,    // 基础攻击力
}

// 技能类型
export enum HeroSkillType {
    active,     // 主动技能
    passive     // 被动技能
}

// 技能攻击类型
export enum HeroSkillAttackType {
    singleAttack = "singleAttack",  // 单体攻击
    groupAttack = "groupAttack",    // 群体攻击
}

// 特殊技能类型
export enum HeroSpecialAttackType {
    null = "", // 无特殊技能
    recoverHealth = "recoverHealth", // 恢复血量
}


// export enum HeroSkillType {

// }
