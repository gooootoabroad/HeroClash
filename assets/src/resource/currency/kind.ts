// 货币资源类型定义

export enum CurrencyType {
    Copper = "copper",      // 铜钱
    EvolutionStone = "evolutionStone", // 进阶石
    IronOre = "ironOre",    // 铁矿
    BattleSoulStone = "battleSoulStone", // 战魂石
    HetianJade = "hetianJade" // 和田玉
}

// 货币资源数据结构
export interface Currency {
    copper?: number;
    evolutionStone?: number;
    ironOre?: number;
    battleSoulStone?: number;
    hetianJade?: number;
}