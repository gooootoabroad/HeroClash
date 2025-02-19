// 抽卡界面模块
import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 抽卡界面菜单
enum recruitMenu {
    // 武将界面
    Hero,
    // 武器界面
    Weapon
}

// 抽卡切换结构体
interface recruitItem {
    button: Button;
    canvas: Node;
}

@ccclass('recruit')
export class recruit extends Component {
    // 武将界面按钮
    @property(Button)
    public heroButton: Button = null;
    // 武将界面画布
    @property(Node)
    public heroCanvas: Node = null;
    // 武器界面按钮
    @property(Button)
    public weaponButton: Button = null;
    // 武器界面画布
    @property(Node)
    public weaponCanvas: Node = null;

    private recruitMap = new Map<recruitMenu, recruitItem>();

    // 展示武将界面
    public change2HeroCanvas() {
        this.changeStore(recruitMenu.Hero);
    }

    // 展示武器界面
    public change2WeaponCanvas() {
        this.changeStore(recruitMenu.Weapon);
    }

    // 切换商城
    private changeStore(menu: recruitMenu) {
        // 先启用其他按钮并隐藏对应的画布
        this.recruitMap.forEach((recruitItem, key) => {
            if (key !== menu) {
                recruitItem.button.interactable = true;
                recruitItem.canvas.active = false;
            }
        });

        // 禁用当前按钮并打开画布
        const currentRecruitItem = this.recruitMap.get(menu);
        if (currentRecruitItem) {
            currentRecruitItem.button.interactable = false;
            currentRecruitItem.canvas.active = true;
        }
    }

    protected onLoad(): void {
        this.recruitMap.set(recruitMenu.Hero, { button: this.heroButton, canvas: this.heroCanvas });
        this.recruitMap.set(recruitMenu.Weapon, { button: this.weaponButton, canvas: this.weaponCanvas });
    }

    start() {
        this.changeStore(recruitMenu.Hero);
    }

    update(deltaTime: number) {

    }
}

