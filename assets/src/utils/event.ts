/* 事件使用，全局定义一次即可 */

import { EventTarget } from "cc";

export const GEventTarget = new EventTarget();

/* 自定义事件，通知使用 */
// 图鉴更新英雄属性信息使用
export const GEventUpdateHeroBasicAttributeCanvas = "UpdateHeroBasicAttributeCanvas";
