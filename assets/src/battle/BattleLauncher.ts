import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('battleLauncher')
export class battleLauncher extends Component {
    
    // 单例
    static Instance: battleLauncher = null;

    @property(Prefab)
    CharacterPrefab: Prefab = null;
    

    protected onLoad(): void {
        if (battleLauncher.Instance == null) {
            battleLauncher.Instance = this;
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


