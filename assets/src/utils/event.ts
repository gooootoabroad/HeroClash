/* 事件使用，全局定义一次即可 */

import { EventTarget } from "cc";

export const GEventTarget = new EventTarget();

/* 自定义事件，通知使用 */
// 图鉴更新英雄属性信息使用
export const GEventUpdateHeroBasicAttributeCanvas = "UpdateHeroBasicAttributeCanvas";
// 布阵界面：图鉴通知布阵更新信息中的布阵图像使用
export const GEventHerosBookUpdateDeploy = "HerosBookUpdateDeploy";
// 布阵界面：布阵更新图鉴信息使用
export const GEventDeployUpdateHerosBook = "DeployUpdateHerosBook";
// 抽武器卡时开始播放的动画
export const GEventRecruitWeaponAnimationStart = "RecruitWeaponAnimationStart";
// 抽武器卡时结束播放的动画
export const GEventRecruitWeaponAnimationEnd = "RecruitWeaponAnimationEnd";
// 抽武器卡奖品展示界面结束
export const GEventShowRecruitPrizeEnd = "ShowRecruitPrizeEnd";
