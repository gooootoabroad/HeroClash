// 英雄基类

import { _decorator, Component, Node } from 'cc';
import { HeroRarityType } from './rarity';
const { ccclass, property } = _decorator;

// 英雄属性
interface HeroAttribute {
    name: string; // 英雄名称
    rarity: HeroRarityType; // 稀有度
    leval: number; // 等级
    basicAttack: number; // 基础攻击力
    basicdefense: number; // 基础防御力
    basicHealth: number; // 基础生命值
    basicAttackSpeed: number; // 基础攻击速度
    basicCriticalStrikeRate: number; // 基础暴击率
    basicCriticalStrike: number; // 基础暴击伤害
    skills: number[]; // 技能栏
    scores: number; // 分值，用于计算战力
}

@ccclass('heroBase')
export class heroBase extends Component {

    // 英雄属性
    private attribute: HeroAttribute;


    start() {

    }

    update(deltaTime: number) {

    }
}


