// 装备定义

import { WeaponryAttribute } from "./base"
import { WeaponryRarityType, WeaponryKind } from "./enum";

// 武器 序号从0-200
const fan: WeaponryAttribute = {
    serialNumber: '1',
    name: '羽扇',
    kind: WeaponryKind.Weapon,
    rarity: WeaponryRarityType.Epic,
    amplifyLeval: 0,
    basicAttack: 10,
    basicdefense: 0,
    basicHealth: 0,
    basicAttackSpeed: 1.2,
    basicCriticalStrikeRate: 0,
    basicCriticalStrike: 0,
    scores: 50
};

const qingLongYanYueDao: WeaponryAttribute = {
    serialNumber: '2',
    name: '青龙偃月刀',
    kind: WeaponryKind.Weapon,
    rarity: WeaponryRarityType.Legend,
    amplifyLeval: 0,
    basicAttack: 20,
    basicdefense: 0,
    basicHealth: 0,
    basicAttackSpeed: 1,
    basicCriticalStrikeRate: 0,
    basicCriticalStrike: 0,
    scores: 100
};

const sheMao: WeaponryAttribute = {
    serialNumber: '3',
    name: '蛇矛',
    kind: WeaponryKind.Weapon,
    rarity: WeaponryRarityType.Excellent,
    amplifyLeval: 0,
    basicAttack: 5,
    basicdefense: 0,
    basicHealth: 0,
    basicAttackSpeed: 2,
    basicCriticalStrikeRate: 0,
    basicCriticalStrike: 0,
    scores: 30
};

// 创建 Map 来存储所有武器
const weaponsMap = new Map<string, WeaponryAttribute>([
    [fan.serialNumber, fan],
    [qingLongYanYueDao.serialNumber, qingLongYanYueDao],
    [sheMao.serialNumber, sheMao]
]);

export function getAllWeapons(): Map<string, WeaponryAttribute> {
    return weaponsMap;
}

// 所有装备集合，需要放最后
const weaponrysMap = new Map<string, WeaponryAttribute>([
    ...weaponsMap
]);

// 获取指定装备信息
export function getWeaponryBySerialNumber(serialNumber: string): WeaponryAttribute {
    return weaponrysMap[serialNumber];
}