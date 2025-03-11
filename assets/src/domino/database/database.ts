import { DeployType, HeroRarityType, NationType, RoleType } from "../../types/type";

export interface EnhancementInfo {
    // 强化等级
    level: number;
    // 强化效果
    value: number;
}

// 用户拥有的英雄
export interface DBPlayerHero {
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
    // 上阵情况
    deploy: DeployType,
}

export function getDBPlayerHerosInfo(): DBPlayerHero[] {
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
        deploy: DeployType.position1,
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
        deploy: DeployType.position2,
    },
    {
        id: "3",
        seqID: "1",
        name: "niuma",
        level: 5,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        deploy: DeployType.position3,
    },
    {
        id: "4",
        seqID: "1",
        name: "niuma",
        level: 7,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        deploy: DeployType.position4,
    },
    {
        id: "5",
        seqID: "1",
        name: "niuma",
        level: 8,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        deploy: DeployType.position5,
    },
    {
        id: "6",
        seqID: "1",
        name: "niuma",
        level: 10,
        weaponEnhancement: { level: 2, value: 2 },
        helmetEnhancement: { level: 0, value: 0 },
        armorEnhancement: { level: 0, value: 0 },
        braceletEnhancement: { level: 0, value: 0 },
        horseEnhancementWeapon: { level: 0, value: 0 },
        dragonEnhancementWeapon: { level: 0, value: 0 },
        deploy: DeployType.none,
    },
    ]
}

// 更新单个英雄信息
export function updateDBPlayerHeroInfo(heroInfo: DBPlayerHero) {
    return;
}

// 人物图鉴基础属性
export interface CharacterBasicAttribute {
    // 人物序号
    seqID: string;                   
    // 人物名称
    name: string;                   
    // 职业
    role: RoleType;                 
    // 图像名称
    imageName: string;              
    // 是否远程攻击，法师也有可能是近战法师
    isLong: boolean;                
    // 稀有度
    rarity: HeroRarityType;         
    // 国家
    nation: NationType;             
    // 人物列传
    introduction: string;           

    // 基础生命值
    basicHealth: number;            
    // 基础攻击力
    basicAttack: number;            
    // 基础防御力
    basicDefense: number;           
    // 基础攻击速度
    basicAttackSpeed: number;       
    // 基础暴击率
    basicCriticalStrikeRate: number; 
    // 基础暴击伤害
    basicCriticalStrike: number;    

    // 技能ID列表
    skillIDs: string[];             
    // 分值，用于计算战力
    scores: number;                 
}

// 英雄图鉴
export function getDBHerosBasicAttribute(): CharacterBasicAttribute[] {
    return [
        {
            seqID: "1",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            rarity: HeroRarityType.legend,
            nation: NationType.shuguo,
            introduction: "",
            basicAttack: 85,
            basicDefense: 10,
            basicHealth: 500,
            basicAttackSpeed: 5,
            basicCriticalStrikeRate: 1,
            basicCriticalStrike: 150,
            skillIDs: [
                "1",
            ],
            scores: 100,
        },
        {
            seqID: "2",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            rarity: HeroRarityType.legend,
            nation: NationType.shuguo,
            introduction: "关羽，字云长（本字长生），河东郡解县（今山西省运城市附近）人，是刘备的结拜兄弟和蜀汉著名将领‌。在《三国演义》等文学作品中，关羽被描绘为“武圣”，形象高大威猛，英勇无畏，深受民间百姓的爱戴和崇拜。",
            basicAttack: 95,
            basicDefense: 10,
            basicHealth: 500,
            basicAttackSpeed: 5,
            basicCriticalStrikeRate: 1,
            basicCriticalStrike: 150,
            skillIDs: [
                "11",
            ],
            scores: 100,
        },
        {
            seqID: "3",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            rarity: HeroRarityType.legend,
            nation: NationType.shuguo,
            introduction: "张飞，字益德（也作“翼德”），幽州涿郡（今河北省保定市涿州市）人，三国时期蜀汉名将，性格豪放刚烈，对刘备忠诚无比。他与关羽情同手足，共同守护刘备的事业，三人的深厚情谊被传为佳话。",
            basicAttack: 95,
            basicDefense: 10,
            basicHealth: 500,
            basicAttackSpeed: 5,
            basicCriticalStrikeRate: 1,
            basicCriticalStrike: 150,
            skillIDs: [
                "21",
            ],
            scores: 100,
        },
        {
            seqID: "4",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: true,
            rarity: HeroRarityType.excellent,
            nation: NationType.shuguo,
            introduction: "孙乾，字公祐，是东汉末年及三国时期蜀汉的著名幕僚和使臣，出生于北海郡（治今山东昌乐西）。自徐州起，孙乾便追随刘备，多次作为刘备的使臣，为刘蜀政权的创建立下了汗马功劳‌。",
            basicAttack: 95,
            basicDefense: 10,
            basicHealth: 500,
            basicAttackSpeed: 5,
            basicCriticalStrikeRate: 1,
            basicCriticalStrike: 150,
            skillIDs: [
                "31",
            ],
            scores: 100,
        },
        {
            seqID: "5",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: true,
            rarity: HeroRarityType.well,
            nation: NationType.shuguo,
            introduction: "‌刘封，东汉末年将领，蜀汉昭烈帝刘备的养子，有武艺，性格刚猛，但最终因多种原因被刘备赐死‌。虽然战功赫赫，但因性格缺陷和人际关系处理不当，最终落得个自尽的下场，令人唏嘘不已。",
            basicAttack: 60,
            basicDefense: 10,
            basicHealth: 500,
            basicAttackSpeed: 5,
            basicCriticalStrikeRate: 1,
            basicCriticalStrike: 150,
            skillIDs: [
                "41",
            ],
            scores: 80,
        },
        {
            seqID: "6",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: true,
            rarity: HeroRarityType.normal,
            nation: NationType.shuguo,
            introduction: "‌黄月英，三国时期荆州沔南白水人，沔阳名士黄承彦之女，蜀汉丞相诸葛亮的妻子‌。她发明了水车，帮助人们解决了从低处往高处运水的难题。此外，她还发明了帮助做饭的小人，启发了诸葛亮在行军中做出木牛流马。",
            basicAttack: 60,
            basicDefense: 10,
            basicHealth: 500,
            basicAttackSpeed: 5,
            basicCriticalStrikeRate: 1,
            basicCriticalStrike: 150,
            skillIDs: [
                "51",
            ],
            scores: 80,
        }
    ]
}
