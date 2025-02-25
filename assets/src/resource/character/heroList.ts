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
            imageName: "wuming",
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
                role: RoleType.auxiliary,
                leval: 1,
                imageName: "liubei",
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
            introduction: "刘备，三国时期蜀汉开国皇帝，字玄德，具有远见卓识、勇敢坚韧、仁德宽厚的英雄人物，他的事迹在中国历史上留下了深刻的印记，是一位具有传奇色彩的英雄人物‌。",
        }
    ],
    ["2",
        {
            basicAttribute: {
                serialNumber: "2",
                name: "关羽",
                role: RoleType.warrior,
                leval: 1,
                imageName: "guanyu",
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
            introduction: "关羽，字云长（本字长生），河东郡解县（今山西省运城市附近）人，是刘备的结拜兄弟和蜀汉著名将领‌。在《三国演义》等文学作品中，关羽被描绘为“武圣”，形象高大威猛，英勇无畏，深受民间百姓的爱戴和崇拜。",
        }
    ],
    ["3",
        {
            basicAttribute: {
                serialNumber: "3",
                name: "张飞",
                role: RoleType.warrior,
                leval: 1,
                imageName: "zhangfei",
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
            introduction: "张飞，字益德（也作“翼德”），幽州涿郡（今河北省保定市涿州市）人，三国时期蜀汉名将，性格豪放刚烈，对刘备忠诚无比。他与关羽情同手足，共同守护刘备的事业，三人的深厚情谊被传为佳话。",
        }
    ],
    ["4",
        {
            basicAttribute: {
                serialNumber: "4",
                name: "孙乾",
                role: RoleType.auxiliary,
                leval: 1,
                imageName: "sunqian",
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
            introduction: "孙乾，字公祐，是东汉末年及三国时期蜀汉的著名幕僚和使臣，出生于北海郡（治今山东昌乐西）。自徐州起，孙乾便追随刘备，多次作为刘备的使臣，为刘蜀政权的创建立下了汗马功劳‌。",
        }
    ],
    ["5",
        {
            basicAttribute: {
                serialNumber: "5",
                name: "刘封",
                role: RoleType.warrior,
                leval: 1,
                imageName: "liufeng",
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
            introduction: "‌刘封，东汉末年将领，蜀汉昭烈帝刘备的养子，有武艺，性格刚猛，但最终因多种原因被刘备赐死‌。虽然战功赫赫，但因性格缺陷和人际关系处理不当，最终落得个自尽的下场，令人唏嘘不已。",
        }
    ],
    ["6",
        {
            basicAttribute: {
                serialNumber: "6",
                name: "黄月英",
                role: RoleType.warrior,
                leval: 1,
                imageName: "huangyueying",
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
            introduction: "‌黄月英，三国时期荆州沔南白水人，沔阳名士黄承彦之女，蜀汉丞相诸葛亮的妻子‌。她发明了水车，帮助人们解决了从低处往高处运水的难题。此外，她还发明了帮助做饭的小人，启发了诸葛亮在行军中做出木牛流马。",
        }
    ],
    ["7",
        {
            basicAttribute: {
                serialNumber: "7",
                name: "曹操",
                role: RoleType.auxiliary,
                leval: 1,
                imageName: "caocao",
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
            introduction: "‌曹操，字孟德，东汉末年杰出的政治家、军事家、文学家、书法家，曹魏政权的奠基者‌‌。他自幼聪明过人，性格果敢，少年时便任侠放荡，但很有才华，足智多谋，随机应变‌。其子曹丕称帝后，追尊他为武皇帝，庙号太祖‌。",
        }
    ],
    ["8",
        {
            basicAttribute: {
                serialNumber: "8",
                name: "典韦",
                role: RoleType.warrior,
                leval: 1,
                imageName: "dianwei",
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
            introduction: "‌典韦，东汉末年曹操部将，以勇猛善战著称，被誉为“古之恶来”。在宛城之战中，张绣背叛曹操，典韦为保护曹操而率十余人挡叛军，击杀多人，但最终因寡不敌众而战死。",
        }
    ],
    ["9",
        {
            basicAttribute: {
                serialNumber: "9",
                name: "司马懿",
                role: RoleType.mage,
                leval: 1,
                imageName: "simayi",
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
            introduction: "‌司马懿，字仲达，河内郡温县孝敬里（今河南省焦作市温县）人，是三国时期曹魏的政治家、军事家、战略家，西晋王朝的奠基人‌。司马懿善谋奇策，多次征伐有功，曾率军擒斩孟达，两次率大军成功抵御诸葛亮北伐。",
        }
    ],
    ["10",
        {
            basicAttribute: {
                serialNumber: "10",
                name: "张春华",
                role: RoleType.mage,
                leval: 1,
                imageName: "zhangchunhua",
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
            introduction: "张春华，三国时期历史人物，曹魏粟邑县令张汪之女，晋宣帝司马懿的正妻，晋景帝司马师和晋文帝司马昭的母亲，后被追尊为宣穆皇后。",
        }
    ],
    ["11",
        {
            basicAttribute: {
                serialNumber: "11",
                name: "孙权",
                role: RoleType.mage,
                leval: 1,
                imageName: "sunquan",
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
            introduction: "孙权，三国时期孙吴开国皇帝，字仲谋，生于182年，卒于252年5月21日，吴郡富春县（今浙江省杭州市富阳区）人‌。他是孙坚与吴夫人的次子，在父亲和兄长孙策打下江东基业后，继兄掌事，成为一方诸侯。",
        }
    ],
    ["12",
        {
            basicAttribute: {
                serialNumber: "12",
                name: "黄盖",
                role: RoleType.warrior,
                leval: 1,
                imageName: "huanggai",
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
            introduction: "‌黄盖，东汉末年三国时期孙吴的著名将领，字公覆，零陵郡泉陵县（今湖南省永州市）人‌。他抑制豪强，扶助贫弱，整训军队，使得地方安定有序‌。他的忠诚与牺牲精神深深打动了后人，成为忠诚与英勇的象征‌。",
        }
    ],
    ["13",
        {
            basicAttribute: {
                serialNumber: "13",
                name: "韩当",
                role: RoleType.warrior,
                leval: 1,
                imageName: "handang",
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
            introduction: "‌韩当，三国时期东吴名将，字义公，辽西郡令支县（今河北迁安）人，生年不详，卒于226年‌。韩当为人忠诚正直，在军中深受士兵和将领们的爱戴。",
        }
    ],
    ["14",
        {
            basicAttribute: {
                serialNumber: "14",
                name: "甘宁",
                role: RoleType.crossbowman,
                leval: 1,
                imageName: "ganning",
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
            introduction: "‌甘宁，字兴霸，三国时期孙吴名将，官至西陵太守、折冲将军‌‌。甘宁虽然粗野凶狠，暴躁嗜杀，但他开朗豪爽，有勇有谋，轻视钱财，敬重士人，厚待士卒，并深得士卒拥戴。",
        }
    ],
    ["15",
        {
            basicAttribute: {
                serialNumber: "15",
                name: "太史慈",
                role: RoleType.crossbowman,
                leval: 1,
                imageName: "taishici",
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
            introduction: "‌太史慈，字子义，东汉末年至三国时期吴国名将，弓马熟练，箭法精良，官至建昌都尉。生于166年，卒于206年，东莱黄县（今山东龙口东黄城集）人。",
        }
    ],
    ["16",
        {
            basicAttribute: {
                serialNumber: "16",
                name: "吕蒙",
                role: RoleType.crossbowman,
                leval: 1,
                imageName: "lvmeng",
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
            introduction: "‌吕蒙，字子明，东汉末年名将，汝南富陂（今安徽省阜南东南）人，生于178年，卒于220年初，是三国时期东吴的重要将领‌。以其卓越的军事才能、非凡的战略眼光和坚韧的品格，为东吴的稳固和发展做出了重要贡献。",
        }
    ],
    ["17",
        {
            basicAttribute: {
                serialNumber: "17",
                name: "吕布",
                role: RoleType.warrior,
                leval: 1,
                imageName: "lvbu",
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
            nation: NationType.qunxiong,
            introduction: "‌吕布，字奉先，号称“飞将”，东汉末年名将，汉末群雄之一，五原郡九原（今内蒙古包头西北）人。吕布武艺高强，手持方天画戟，骑乘赤兔马，被誉为“飞将”，堪比西汉的李广，威震天下‌。",
        }
    ],
    ["18",
        {
            basicAttribute: {
                serialNumber: "18",
                name: "貂蝉",
                role: RoleType.mage,
                leval: 1,
                imageName: "diaochan",
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
            nation: NationType.qunxiong,
            introduction: "‌貂蝉是小说《三国演义》中的人物，被誉为中国古代四大美女之一，她的美丽、聪明和勇敢都成为了后人传颂的佳话。",
        }
    ],
    ["19",
        {
            basicAttribute: {
                serialNumber: "19",
                name: "潘凤",
                role: RoleType.warrior,
                leval: 1,
                imageName: "panfeng",
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
            nation: NationType.qunxiong,
            introduction: "‌潘凤，字无双，是《三国演义》中虚构的人物，青州泰安（今山东泰安）人，高九尺，腰大十二围，使一百八十斤开山大斧。他自信而勇猛，却因轻敌而战死，成为了人们茶余饭后的谈资。",
        }
    ],
]);