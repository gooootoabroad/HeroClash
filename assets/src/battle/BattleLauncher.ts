import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BattleLauncher')
export class BattleLauncher extends Component {
    
    // 单例
    static Instance: BattleLauncher = null;

    @property(Prefab)
    CharacterPrefab: Prefab = null;
    

    protected onLoad(): void {
        if (BattleLauncher.Instance == null) {
            BattleLauncher.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


