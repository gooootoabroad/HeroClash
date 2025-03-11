// 枚举等类型定义

// 英雄稀有度定义
export enum HeroRarityType {
    normal = "normal",          // 普通
    well = "well",              // 良好
    excellent = "excellent",    // 精良
    epic = "epic",              // 史诗
    legend = "legend",          // 传说
}

// 人物职业定义
export enum RoleType {
    warrior = "warrior",            // 战士
    mage = "mage",                  // 法师
    crossbowman = "crossbowman",    // 射手
    auxiliary = "auxiliary",        // 辅助
}

// 国家定义
export enum NationType {
    weiguo = "wei",     // 魏国
    shuguo = "shu",     // 蜀国
    wuguo = "wu",       // 吴国
    qunxiong = "qun",   //群雄
}

// 上阵情况
export enum DeployType {
    none = -1,      // 未上阵
    position1 = 0,  // 第一个位置
    position2 = 1,  // 第二个位置
    position3 = 2,  // 第三个位置
    position4 = 3,  // 第四个位置
    position5 = 4,  // 第五个位置
}