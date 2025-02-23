// 装备定义

import { WeaponryAttribute } from "./base"
import { WeaponryRarityType, WeaponryKind } from "./enum";

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

// 获取抽卡界面展示武器的信息
export function getRecruitShowWeapons(): WeaponryAttribute[] {
    return [...legendWeaponsMap.values()];
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

// 所有装备集合
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


// 传说武器，序号1-50
// 评级默认90分，攻击力乘速度超过40多少就加多少分
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
            basicAttackSpeed: 1.2,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 98,
            description: "刀长九尺五寸，重八十二斤，刀身上镶有蟠龙吞月的图案，因而得名",
            imageName: "qinglongyanyuedao"
        }
    ],
    [
        "2", {
            serialNumber: '2',
            name: '丈八蛇矛',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 55,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 0.8,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 98,
            description: "矛头弯曲如蛇，长一丈八尺，故名丈八蛇矛",
            imageName: "zhangbamaoshe"
        }
    ],
    [
        "3", {
            serialNumber: '3',
            name: '方天画戟',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 60,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 0.9,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 104,
            description: "戟身一侧有月牙形利刃，通过两枚小枝与枪尖相连，可刺可砍，威力极大",
            imageName: "fangtianhuaji"
        }
    ],
    [
        "4", {
            serialNumber: '4',
            name: '古锭刀',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 44,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 94,
            description: "刀身细长且轻薄，两端略高，中间刀背微凹，刀尖上翘",
            imageName: "gudingdao"
        }
    ],
    [
        "5", {
            serialNumber: '5',
            name: '双股剑',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 40,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1.2,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 98,
            description: "由两把剑组成，一长一短，配合使用，威力不凡",
            imageName: "shuanggujian"
        }
    ],
    [
        "6", {
            serialNumber: '6',
            name: '青虹剑',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 58,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1.2,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 120,
            description: "青虹剑，又名青釭剑,与倚天剑齐名的神兵,削铁如泥,锋利无比",
            imageName: "qinghongjian"
        }
    ],
    [
        "7", {
            serialNumber: '7',
            name: '倚天剑',
            kind: WeaponryKind.Weapon,
            rarity: WeaponryRarityType.Legend,
            amplifyLeval: 0,
            basicAttack: 55,
            basicdefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 1.3,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,
            scores: 121,
            description: "长剑耿耿倚天外",
            imageName: "yitianjian"
        }
    ]
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
            scores: 70,
            description: "",
            imageName: "langyabang"
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
            scores: 40,
            description: "",
            imageName: "kaishandafu"
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
            scores: 20,
            description: "",
            imageName: "tiejian"
        }
    ],
]);

