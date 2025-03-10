
export interface EnhancementInfo {
    // 强化等级
    level: number;
    // 强化效果
    value: number;
}

export interface DBHeroInfo {
    // 英雄唯一ID
    id: string;
    // 英雄图鉴序号ID
    seqID: string;
    // 英雄名字
    name: string;
    // 英雄等级
    level: number;
    // 武器强化信息
    weaponEnhancement: EnhancementInfo,
    // 头盔强化信息
    helmetEnhancement: EnhancementInfo,
    // 铁甲强化信息
    armorEnhancement: EnhancementInfo,
    // 手镯强化信息
    braceletEnhancement: EnhancementInfo,
    // 战马强化信息
    horseEnhancementWeapon: EnhancementInfo,
    // 全属性强化信息
    dragonEnhancementWeapon: EnhancementInfo,
    // 是否上阵
    isDeployed: boolean,
}

export function getDBPlayerHerosInfo(): DBHeroInfo[] {
    return [{
        id: "1",
        seqID: "1",
        name: "niuma",
        level: 1,
        weaponEnhancement: { level: 0, value: 0 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        isDeployed: true,
    },
    {
        id: "2",
        seqID: "1",
        name: "niuma",
        level: 2,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        isDeployed: true,
    },
    {
        id: "3",
        seqID: "1",
        name: "niuma",
        level: 2,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        isDeployed: true,
    },
    {
        id: "4",
        seqID: "1",
        name: "niuma",
        level: 2,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        isDeployed: true,
    },
    {
        id: "5",
        seqID: "1",
        name: "niuma",
        level: 2,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        isDeployed: true,
    },
    {
        id: "6",
        seqID: "1",
        name: "niuma",
        level: 2,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        isDeployed: true,
    },
    ]
}

// 更新单个英雄信息
export function updateDBPlayerHeroInfo(heroInfo: DBHeroInfo) {
    return;
}