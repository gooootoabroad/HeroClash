// 英雄基类

import { _decorator, Component, Node } from 'cc';
import {  HeroAttribute } from './attribute';
const { ccclass, property } = _decorator;


@ccclass('heroBase')
export class heroBase extends Component {

    // 英雄属性
    private attribute: HeroAttribute;


    start() {

    }

    update(deltaTime: number) {

    }
}


