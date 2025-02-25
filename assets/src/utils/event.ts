/* 事件使用，全局定义一次即可 */

import { EventTarget } from "cc";

export const GEventTarget = new EventTarget();

/* 自定义事件，通知使用 */
// 图鉴更新英雄属性信息使用
export const GEventUpdateHeroBasicAttributeCanvas = "UpdateHeroBasicAttributeCanvas";
// 抽武器卡时开始播放的动画
export const GEventRecruitWeaponAnimationStart = "RecruitWeaponAnimationStart";
// 抽武器卡时结束播放的动画
export const GEventRecruitWeaponAnimationEnd = "RecruitWeaponAnimationEnd";
// 抽武器卡奖品展示界面结束
export const GEventShowRecruitPrizeEnd = "ShowRecruitPrizeEnd";
