// 商城模块
import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 商城菜单
enum storeMenu {
    // 资源商城
    Resource,
    // 武将商城
    Role,
    // 武器商城
    Weapon
}

// 商城切换结构体
interface storeItem {
    button: Button;
    canvas: Node;
}

@ccclass('store')
export class store extends Component {
    // 资源商城按钮
    @property(Button)
    public resourceButton: Button = null;
    // 资源商城画布
    @property(Node)
    public resourceCanvas: Node = null;
    // 武将商城按钮
    @property(Button)
    public roleButton: Button = null;
    // 武将商城画布
    @property(Node)
    public roleCanvas: Node = null;
    // 武器商城按钮
    @property(Button)
    public weaponButton: Button = null;
    // 武器商城画布
    @property(Node)
    public weaponCanvas: Node = null;

    private storeMap = new Map<storeMenu, storeItem>();

    // 展示资源商城
    public change2ResourceStore() {
        this.changeStore(storeMenu.Resource);
    }

    // 展示武将商城
    public change2RoleStore() {
        this.changeStore(storeMenu.Role);
    }

    // 展示武器商城
    public change2WeaponStore() {
        this.changeStore(storeMenu.Weapon);
    }

    // 切换商城
    private changeStore(store: storeMenu) {
        // 先启用其他按钮并隐藏对应的画布
        this.storeMap.forEach((storeItem, key) => {
            if (key !== store) {
                storeItem.button.interactable = true;
                storeItem.canvas.active = false;
            }
        });

        // 禁用当前按钮并打开画布
        const currentStoreItem = this.storeMap.get(store);
        if (currentStoreItem) {
            currentStoreItem.button.interactable = false;
            currentStoreItem.canvas.active = true;
        }
    }

    protected onLoad(): void {
        this.storeMap.set(storeMenu.Resource, { button: this.resourceButton, canvas: this.resourceCanvas });
        this.storeMap.set(storeMenu.Role, { button: this.roleButton, canvas: this.roleCanvas });
        this.storeMap.set(storeMenu.Weapon, { button: this.weaponButton, canvas: this.weaponCanvas });
    }

    start() {
        this.changeStore(storeMenu.Resource);
    }

    update(deltaTime: number) {

    }
}

