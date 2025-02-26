// 技能列表

import { HeroSkill, HeroSkillAttackType, HeroSpecialAttackType, HeroSkillType } from "./skill";

export function getSkillMap(): Map<string, HeroSkill> {
    return heroSkillMap;
}

const heroSkillMap: Map<string, HeroSkill> = new Map([
    // 刘备
    ["1",
        {
            id: "1",
            name: "圣光术",
            imageName: "shengguangshu",
            type: HeroSkillType.active,
            description: "可以医疗友方活生生的部队或伤害敌方部队。一级时治疗300点生命点数，耗魔100；二级治疗400点，耗魔125；三级治疗500点，耗魔150；四级治疗600点，耗魔175。冷却时间为22秒‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 关羽
    ["11",
        {
            id: "11",
            name: "龙卷风暴‌",
            imageName: "longjuanfengbao",
            type: HeroSkillType.active,
            description: "召唤疾风力量赋予刀身，蓄力后向前方范围敌人释放一道龙卷风（或挥出强力的一刀），造成高额伤害。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 张飞
    ["21",
        {
            id: "21",
            name: "霸阳",
            imageName: "bayang",
            type: HeroSkillType.active,
            description: "在战斗中，张飞的伤害加成可以提升4%。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 孙乾
    ["31",
        {
            id: "31",
            name: "治疗术",
            imageName: "zhiliaoshu",
            type: HeroSkillType.active,
            description: "全体生命值恢复10%，冷却时间10秒。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 刘封
    ["41",
        {
            id: "41",
            name: "陷阵",
            imageName: "xianzhen",
            type: HeroSkillType.active,
            description: "生命高于50%时释放该技能，损失自身5%生命值，造成敌方群体伤害。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 黄月英
    ["51",
        {
            id: "51",
            name: "散华",
            imageName: "sanhua",
            type: HeroSkillType.active,
            description: "能够对群体敌军造成自身攻击力的300%伤害。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 曹操
    ["61",
        {
            id: "61",
            name: "‌枭雄",
            imageName: "xiaoxiong",
            type: HeroSkillType.active,
            description: "在战斗中提升一定百分比的防御力，增强友方的生存能力‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 典韦
    ["71",
        {
            id: "71",
            name: "‌强袭",
            imageName: "qiangxi",
            type: HeroSkillType.active,
            description: "战斗中触发暴击时，暴击伤害提升一定比例‌‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 司马懿
    ["81",
        {
            id: "81",
            name: "鹰视狼顾",
            imageName: "yingshilanggu",
            type: HeroSkillType.active,
            description: "在战斗前四回合有80%的概率使得司马懿自身获得7%的攻心或奇谋几率，第五回合后有80%的概率对1-2个敌军单体造成谋略伤害，并且身为主将时还能获得额外的奇谋加成‌‌‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 张春华
    ["91",
        {
            id: "91",
            name: "冰刃",
            imageName: "bingren",
            type: HeroSkillType.active,
            description: "普通攻击不会暴击，技能会暴击，但暴击伤害降低30%，每1%生命偷取转化为0.5%全能吸血。向指定方向发射冰刃，造成物理伤害，冰刃的宽度和伤害随技能等级提升。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 孙权
    ["101",
        {
            id: "101",
            name: "君威",
            imageName: "junwei",
            type: HeroSkillType.active,
            description: "‌提升孙权在战斗中的攻击力，最高可达8%。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 黄盖
    ["111",
        {
            id: "111",
            name: "遁甲",
            imageName: "dunjia",
            type: HeroSkillType.active,
            description: "使目标获得额外的盾牌护甲，提高防御力。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 韩当
    ["121",
        {
            id: "121",
            name: "追云逐电",
            imageName: "zhuiyunzhudian",
            type: HeroSkillType.active,
            description: "对敌方群体目标射出闪电箭矢，造成275%伤害，并触发麻痹效果（减少100%攻击速度）。麻痹状态下目标每秒恢复25%的攻击速度，直至恢复至正常状态‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 甘宁
    ["131",
        {
            id: "131",
            name: "恶沼‌",
            imageName: "ezhao",
            type: HeroSkillType.active,
            description: "范围内的所有敌军被减速并受到伤害。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 太史慈
    ["141",
        {
            id: "141",
            name: "叫阵‌",
            imageName: "jiaozhen",
            type: HeroSkillType.active,
            description: "群体限制技能，强制范围内的敌人对太史慈进行普通攻击。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 吕蒙
    ["151",
        {
            id: "151",
            name: "攻心",
            imageName: "gongxin",
            type: HeroSkillType.active,
            description: "可以瞬移到指定目标身边并造成法术伤害。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 吕布
    ["161",
        {
            id: "161",
            name: "鬼戟突击",
            imageName: "gongxin",
            type: HeroSkillType.active,
            description: "吕布向目标方向突击，对突击路线上的敌人造成伤害并减速。冷却时间逐渐减少，从20秒到14秒不等，心力消耗和伤害也随之变化‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 貂蝉
    ["171",
        {
            id: "171",
            name: "毒镖",
            imageName: "dubiao",
            type: HeroSkillType.active,
            description: "向目标敌人射出淬毒的飞镖，造成一定的起始伤害，并不断造成后续伤害，中毒12秒，中毒时间内降低目标的移动速度。不同等级的毒镖造成的伤害和减速效果不同，冷却时间为10秒，消耗魔法从70到100不等‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
    // 潘凤
    ["181",
        {
            id: "181",
            name: "影斩",
            imageName: "yingzhan",
            type: HeroSkillType.active,
            description: "向目标地点释放一个残影，并对地面周围的敌人造成巨大的伤害‌‌。",
            doTimeSecond: 0,
            cdTimeSecond: 1,
            attackType: HeroSkillAttackType.singleAttack,
            specialAttack: HeroSpecialAttackType.null,
            basicAttack: 50,
        }
    ],
]);

