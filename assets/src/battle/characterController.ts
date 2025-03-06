// 角色控制，包括英雄和敌军

import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('characterController')
export class characterController extends Component {
    // 血条
    private gBloodBarSprite: Sprite = null;

    // 受到的伤害
    private gHurtLabel: Label = null;

    protected onLoad(): void {
        this.gBloodBarSprite = this.node.getChildByName("BloodBackground").getChildByName("Blood").getComponent(Sprite);
        this.gHurtLabel = this.node.getChildByName("Hurt").getComponent(Label);
    }

    start() {

    }

    update(deltaTime: number) {

    }

    // 设置受伤值
    public setHurt(attack: number) {
        this.gHurtLabel.string = attack.toString();
        this.gHurtLabel.node.active = true;
        let timeOutID = setTimeout(() => {
            this.gHurtLabel.node.active = false;
            clearTimeout(timeOutID);
        }, 500);
    }

    // 设置血条比例
    public setBlood(healthRate: number) {
        if (healthRate <= 0) {
            this.gBloodBarSprite.fillRange = 0
        } else if (healthRate > 1) {
            this.gBloodBarSprite.fillRange = 1;
        } else {
            this.gBloodBarSprite.fillRange = healthRate;
        }
    }
}


