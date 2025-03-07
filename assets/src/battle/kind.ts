/* 结构体 */

import { Node } from "cc";
import { RoleType } from "../resource/character/attribute";

// 战斗界面英雄信息
export interface BattleCharacter {
    id: string;                 // 英雄ID
    attackSpeed: number;        // 攻击速度，用来列表排序
    state: CharacterStateType;  // 英雄状态
    camp: CharacterCampType;    // 判断敌友
    node: Node;                 // 英雄节点
}

// 战斗界面英雄属性
export interface BattleCharacterAttribute {
    id: string;
    name: string;             // 人物名称
    role: RoleType;           // 职业
    imageName: string;        // 图像名称
    isLong: boolean;           // 是否是远程
    health: number;            // 生命值
    attack: number;            // 攻击力
    defense: number;           // 防御力
    attackSpeed: number;       // 攻击速度
    criticalStrikeRate: number; // 暴击率
    criticalStrike: number;    // 暴击伤害

    skillIDs: string[];        // 技能ID列表
}

// 状态
export enum CharacterStateType {
    Wait,   // 等待
    Move,   // 移动
    Attack, // 攻击
    Die     // 死亡
}

// 阵营
export enum CharacterCampType {
    Hero,   // 英雄
    Enemy   // 敌人
}

// 动画效果
export enum AnimationType {
    Standby = "standby",    // 站立等待
    Attack = "attack",      // 攻击
    Attacked = "attacked",  // 被攻击
    Died = "died",          // 死亡
    Skill1 = "ability1",    // 技能
}
