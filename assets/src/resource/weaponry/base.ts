// 武器装备基础属性

import { WeaponryRarityType, WeaponryKind } from "./enum";

export interface WeaponryAttribute {
    serialNumber: string; // 装备ID
    name: string; // 装备名称
    kind: WeaponryKind; // 装备类型
    rarity: WeaponryRarityType; // 稀有度
    amplifyLeval: number; // 增幅等级
    basicAttack: number; // 基础攻击力
    basicdefense: number; // 基础防御力
    basicHealth: number; // 基础生命值
    basicAttackSpeed: number; // 基础攻击速度
    basicCriticalStrikeRate: number; // 基础暴击率
    basicCriticalStrike: number; // 基础暴击伤害
    scores: number; // 分值，用于计算战力
    description: string // 描述
    imageName: string; // 图像名称
}