// 装备定义

import { WeaponryAttribute } from "./base"
import { WeaponryRarityType, WeaponryKind } from "./enum";

// 传说武器，序号1-50
const legendWeaponsMap = new Map<string, WeaponryAttribute>([
    [
        "1", {
            serialNumber: '1',
            name: '青龙偃月刀',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 40,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 100
        }
    ],
]);

// 史诗武器，序号51-100
const epicWeaponsMap = new Map<string, WeaponryAttribute>([
    [
        "51", {
            serialNumber: '51',
            name: '狼牙棒',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Epic,
            amplifyLeval: 0,
            basicAttack: 25,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 2,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 70
        }
    ],
]);

// 精良武器，序号101-150
const execllentWeaponsMap = new Map<string, WeaponryAttribute>([
    [
        "101", {
            serialNumber: '101',
            name: '开山大斧',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Excellent,
            amplifyLeval: 0,
            basicAttack: 20,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 40
        }
    ],
]);

// 良好武器，序号151-200
const wellWeaponsMap = new Map<string, WeaponryAttribute>([
    [
        "151", {
            serialNumber: '151',
            name: '铁剑',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Well,
            amplifyLeval: 0,
            basicAttack: 10,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 20
        }
    ],
]);

// 创建 Map 来存储所有武器
const weaponsMap = new Map<string, WeaponryAttribute>();

export function getWeaponsByRarity(rarity: WeaponryRarityType): Map<string, WeaponryAttribute> {
    switch (rarity) {
        case WeaponryRarityType.Legend:
            return legendWeaponsMap;
        case WeaponryRarityType.Epic:
            return epicWeaponsMap;
        case WeaponryRarityType.Excellent:
            return execllentWeaponsMap;
        case WeaponryRarityType.Well:
            return wellWeaponsMap;
    }
}

export function getAllWeapons(): Map<string, WeaponryAttribute> {
    if (!weaponsMap.size) {
        // 合并多个 Map
        [legendWeaponsMap, epicWeaponsMap, execllentWeaponsMap, wellWeaponsMap].forEach(map => {
            map.forEach((value, key) => {
                weaponsMap.set(key, value);  // 将每个 Map 的 key-value 对添加到 weaponsMap
            });
        });
    }

    return weaponsMap;
}

// 所有装备集合，需要放最后
const weaponrysMap = new Map<string, WeaponryAttribute>();

// 获取指定装备信息
export function getWeaponryBySerialNumber(serialNumber: string): WeaponryAttribute {
    if (!weaponrysMap.size) {
        [getAllWeapons()].forEach(map => {
            map.forEach((value, key) => {
                weaponrysMap.set(key, value);  // 将每个 Map 的 key-value 对添加到 weaponsMap
            });
        });
    }

    return weaponrysMap.get(serialNumber);
}