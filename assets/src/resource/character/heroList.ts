import { BasicHeroAttribute, CharacterAttribute, HeroSkillType, HeroRarityType, RoleType, NationType } from './attribute';

// 获取英雄列表
// @return map<序号，属性>
export function getHeroMap(): Map<string, BasicHeroAttribute> {
    return heroMap;
}

// 获取默认英雄信息
export function getDefaultHero(): BasicHeroAttribute {
    return {
        basicAttribute: {
            serialNumber: "0",
            name: "无名",
            role: RoleType.warrior,
            leval: 1,
            basicAttack: 0,
            basicDefense: 0,
            basicHealth: 0,
            basicAttackSpeed: 0,
            basicCriticalStrikeRate: 0,
            basicCriticalStrike: 0,

            skills: [
                HeroSkillType.S1,
                HeroSkillType.S2,
                HeroSkillType.S3,
                HeroSkillType.S4
            ],
            scores: 0,
        },
        rarity: HeroRarityType.epic,
        nation: NationType.shuguo,
        introduction: "",
    };
}

// 英雄图鉴
const heroMap: Map<string, BasicHeroAttribute> = new Map([
    ["1",
        {
            basicAttribute: {
                serialNumber: "1",
                name: "刘备",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 85,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 100,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.shuguo,
            introduction: "待补充",
        }
    ],
    ["2",
        {
            basicAttribute: {
                serialNumber: "2",
                name: "关羽",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 95,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 100,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.shuguo,
            introduction: "待补充",
        }
    ],
    ["3",
        {
            basicAttribute: {
                serialNumber: "3",
                name: "张飞",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 95,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 100,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.shuguo,
            introduction: "待补充",
        }
    ],
    ["4",
        {
            basicAttribute: {
                serialNumber: "4",
                name: "孙乾",
                role: RoleType.mage,
                leval: 1,
                basicAttack: 95,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 100,
            },
            rarity: HeroRarityType.excellent,
            nation: NationType.shuguo,
            introduction: "待补充",
        }
    ],
    ["5",
        {
            basicAttribute: {
                serialNumber: "5",
                name: "刘封",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.well,
            nation: NationType.shuguo,
            introduction: "待补充",
        }
    ],
    ["6",
        {
            basicAttribute: {
                serialNumber: "6",
                name: "黄月英",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.normal,
            nation: NationType.shuguo,
            introduction: "待补充",
        }
    ],
    ["7",
        {
            basicAttribute: {
                serialNumber: "7",
                name: "曹操",
                role: RoleType.mage,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.epic,
            nation: NationType.weiguo,
            introduction: "待补充",
        }
    ],
    ["8",
        {
            basicAttribute: {
                serialNumber: "8",
                name: "典韦",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.weiguo,
            introduction: "待补充",
        }
    ],
    ["9",
        {
            basicAttribute: {
                serialNumber: "9",
                name: "司马懿",
                role: RoleType.mage,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.weiguo,
            introduction: "待补充",
        }
    ],
    ["10",
        {
            basicAttribute: {
                serialNumber: "10",
                name: "曹豹",
                role: RoleType.crossbowman,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.well,
            nation: NationType.weiguo,
            introduction: "待补充",
        }
    ],
    ["11",
        {
            basicAttribute: {
                serialNumber: "11",
                name: "张颌",
                role: RoleType.crossbowman,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.epic,
            nation: NationType.weiguo,
            introduction: "待补充",
        }
    ],
    ["12",
        {
            basicAttribute: {
                serialNumber: "12",
                name: "张春华",
                role: RoleType.mage,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.normal,
            nation: NationType.weiguo,
            introduction: "待补充",
        }
    ],
    ["13",
        {
            basicAttribute: {
                serialNumber: "13",
                name: "孙权",
                role: RoleType.mage,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.epic,
            nation: NationType.wuguo,
            introduction: "待补充",
        }
    ],
    ["14",
        {
            basicAttribute: {
                serialNumber: "14",
                name: "黄盖",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.epic,
            nation: NationType.wuguo,
            introduction: "待补充",
        }
    ],
    ["15",
        {
            basicAttribute: {
                serialNumber: "15",
                name: "黄盖",
                role: RoleType.warrior,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.epic,
            nation: NationType.wuguo,
            introduction: "待补充",
        }
    ],
    ["16",
        {
            basicAttribute: {
                serialNumber: "16",
                name: "甘宁",
                role: RoleType.crossbowman,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.wuguo,
            introduction: "待补充",
        }
    ],
    ["17",
        {
            basicAttribute: {
                serialNumber: "17",
                name: "太史慈",
                role: RoleType.crossbowman,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.legend,
            nation: NationType.wuguo,
            introduction: "待补充",
        }
    ],
    ["18",
        {
            basicAttribute: {
                serialNumber: "18",
                name: "吕蒙",
                role: RoleType.crossbowman,
                leval: 1,
                basicAttack: 60,
                basicDefense: 10,
                basicHealth: 100,
                basicAttackSpeed: 5,
                basicCriticalStrikeRate: 1,
                basicCriticalStrike: 150,

                skills: [
                    HeroSkillType.S1,
                    HeroSkillType.S2,
                    HeroSkillType.S3,
                    HeroSkillType.S4
                ],
                scores: 80,
            },
            rarity: HeroRarityType.epic,
            nation: NationType.wuguo,
            introduction: "待补充",
        }
    ],
]);