// 角色控制，包括英雄和敌军

import { _decorator, Component, dragonBones, Label, Node, resources, Sprite, SpriteFrame, tween, Vec2, Vec3 } from 'cc';
import { AnimationType, BattleCharacterAttribute, CharacterCampType, CharacterStateType } from './kind';
const { ccclass, property } = _decorator;


@ccclass('characterController')
export class characterController extends Component {
    // 英雄属性
    private gAttribute: BattleCharacterAttribute = null;
    // 英雄阵营
    private gCamp: CharacterCampType = null;
    // 英雄状态
    private gState: CharacterStateType = null;
    // 英雄最初的血条，用来进行血条比例显示
    private gOriginHealth: number = 0;
    // 角色初始位置，用于攻击后回原来位置
    private gOriginPosition: Vec2 = null;
    // 怒气值
    private gAnger: number = 0;

    // 人物名称节点
    @property(Node)
    private gNameNode: Node = null;

    // 血条节点
    @property(Node)
    private gBloodBarNode: Node = null;

    // 怒气节点
    @property(Node)
    private gAngerNode: Node = null;

    // 受到的伤害
    @property(Node)
    private gHurtNode: Node = null;

    // 动画所在节点
    @property(Node)
    private gBodyNode: Node = null;
    // 动画
    private gBodyArmatureDisplay: dragonBones.ArmatureDisplay = null;

    // 运行时间
    private gElapsedTime = 0;

    protected onLoad(): void {
        this.gOriginPosition = new Vec2(this.node.position.x, this.node.position.y);
        this.gBodyArmatureDisplay = this.gBodyNode.getComponent(dragonBones.ArmatureDisplay);
    }

    update(deltaTime: number) {
        this.gElapsedTime += deltaTime;
        if (this.gElapsedTime > 0.3) {
            this.setAnger(this.gAnger + 1);
        }
    }

    // 设置英雄属性，一般用于初始化人物使用
    public init(attribute: BattleCharacterAttribute, camp: CharacterCampType, state: CharacterStateType) {
        // 初始化属性
        this.gAttribute = {
            id: attribute.id,
            name: attribute.name,
            role: attribute.role,
            imageName: attribute.imageName,
            isLong: attribute.isLong,
            health: attribute.health,
            attack: attribute.attack,
            defense: attribute.defense,
            attackSpeed: attribute.attackSpeed,
            criticalStrikeRate: attribute.criticalStrikeRate,
            criticalStrike: attribute.criticalStrike,
            skillIDs: attribute.skillIDs,
        }
        this.gOriginHealth = attribute.health;
        this.gState = state;
        this.gCamp = camp;

        // 初始化动画
        let skePath = "dragon/" + this.gAttribute.imageName + "/" + this.gAttribute.imageName + "_ske";
        resources.load(skePath, dragonBones.DragonBonesAsset, (err, skeAsset) => {
            if (err) {
                console.error("Failed to load ske.json:", err);
                return;
            }
            // 2. 加载纹理数据：tes.json
            let texPath = "dragon/" + this.gAttribute.imageName + "/" + this.gAttribute.imageName + "_tex";
            resources.load(texPath, dragonBones.DragonBonesAtlasAsset, (err, atlasAsset) => {
                if (err) {
                    console.error("Failed to load tes.json:", err);
                    return;
                }
                // 设置加载的资源到 ArmatureDisplay
                this.gBodyArmatureDisplay.dragonAsset = skeAsset;
                this.gBodyArmatureDisplay.dragonAtlasAsset = atlasAsset;

                // 骨骼名称
                this.gBodyArmatureDisplay.armatureName = "Armature";
                // 播放动画
                this.wait();
            })
        })
        // 设置人物名称

        this.gNameNode.getComponent(Label).string = this.gAttribute.name;

        // 设置人物血条
        let imagePath = "battle/" + "blood-green" + "/spriteFrame";
        if (this.gCamp == CharacterCampType.Enemy) {
            imagePath = "battle/" + "blood-red" + "/spriteFrame";
        }
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.warn(err);
                return;
            }
            this.gBloodBarNode.getComponent(Sprite).spriteFrame = spriteFrame;
        });
        // 怒气条清空
        this.gAnger = 0;
        this.gAngerNode.getComponent(Sprite).fillRange = 0;
        // 左右对称旋转敌人图画
        if (this.gCamp == CharacterCampType.Enemy) {
            let originScale = this.gBodyNode.scale;
            this.gBodyNode.setScale(new Vec3(-originScale.x, originScale.y, originScale.z));
        }

    }

    // 获取人物ID
    public getID() {
        return this.gAttribute.id;
    }
    // 获取防御值
    public getDefense() {
        return this.gAttribute.defense;
    }

    // 获取状态
    public getState() {
        return this.gState;
    }

    // 英雄等待
    public wait() {
        this.gBodyArmatureDisplay.playAnimation(AnimationType.Standby, 0);
    }

    // 英雄移动，远程英雄不移动
    public move(targetPos: Vec2, callbackFunc: () => void) {
        if (this.gAttribute.isLong) {
            return;
        }

        if (this.gCamp == CharacterCampType.Hero) {
            tween(this.node).to(0.3, { position: new Vec3(targetPos.x - 80, targetPos.y, 0) }).call(callbackFunc).start();
        } else {
            tween(this.node).to(0.3, { position: new Vec3(targetPos.x + 80, targetPos.y, 0) }).call(callbackFunc).start();
        }
    }

    // 英雄攻击
    public attack(targetNode: Node) {
        var attack = 0;
        var targetCharacterController = targetNode.getComponent(characterController);
        // 怒气值满放大招
        if (this.gAnger == 100) {
            // 播放大招动画
            this.gBodyArmatureDisplay.playAnimation(AnimationType.Skill1, 1);
            attack = this.gAttribute.attack * 3;
        } else {
            // 播放攻击动画
            this.gBodyArmatureDisplay.playAnimation(AnimationType.Attack, 1);
            // 计算血量
            // 是否暴击
            var isCritical = Math.random() < parseFloat((this.gAttribute.criticalStrikeRate / 100).toFixed(2));
            // 最终攻击力 = 攻击力-防御力
            var targetDefense = targetCharacterController.getDefense();
            var attack = isCritical ? (this.gAttribute.attack * parseFloat((this.gAttribute.criticalStrike / 100).toFixed(2)) - targetDefense) : (this.gAttribute.attack - targetDefense);
            if (attack <= 0) attack = 0;

        }

        this.gBodyArmatureDisplay.once(dragonBones.EventObject.COMPLETE, () => {
            // 敌方扣血
            targetCharacterController.attacked(attack);
            // 重置怒气
            if (this.gAnger == 100) {
                this.gAngerNode.getComponent(Sprite).fillRange = 0;
                this.gAnger = 0;
            }
        }, this);

    }

    // 英雄回位
    public moveBack(callbackFunc: () => void) {
        // callbackFunc.bind(this);
        tween(this.node).to(0.3, { position: new Vec3(this.gOriginPosition.x, this.gOriginPosition.y, 0) }).call(callbackFunc).start();
    }
    // 被攻击，包括受伤显示，生命衰减，血条比例
    // @param hurt：受到的伤害值
    public attacked(hurt: number): CharacterStateType {
        // 动画效果先做
        this.gBodyArmatureDisplay.playAnimation(AnimationType.Attacked, 1);
        // 生命值受损
        this.gAttribute.health = this.gAttribute.health - hurt;
        if (this.gAttribute.health <= 0) {
            this.gAttribute.health = 0;
        }

        // 受伤值显示
        this.gHurtNode.getComponent(Label).string = hurt.toString();
        this.gHurtNode.active = true;
        let timeOutID = setTimeout(() => {
            this.gHurtNode.getComponent(Label).string = "";
            this.gHurtNode.active = false;
            clearTimeout(timeOutID);
        }, 500);
        // 血条比例缩减
        var healthRate = 0;
        if (this.gOriginHealth > 0) {
            healthRate = this.gAttribute.health / this.gOriginHealth;
        }
        if (healthRate <= 0) {
            this.gBloodBarNode.getComponent(Sprite).fillRange = 0
        } else if (healthRate > 1) {
            this.gBloodBarNode.getComponent(Sprite).fillRange = 1;
        } else {
            this.gBloodBarNode.getComponent(Sprite).fillRange = healthRate;
        }
        // 角色死亡
        if (this.gAttribute.health == 0) {
            this.died();
        } else {
            this.gBodyArmatureDisplay.once(dragonBones.EventObject.COMPLETE, () => {
                this.wait();
            }, this);
        }

        return this.gState;
    }

    // 设置死亡情况，3秒后隐藏该节点
    public died() {
        this.gState = CharacterStateType.Die;
        this.gBodyArmatureDisplay.playAnimation(AnimationType.Died, 1);
        this.gBodyArmatureDisplay.once(dragonBones.EventObject.COMPLETE, () => {
            let timeOutID = setTimeout(() => {
                this.node.active = false;
                clearTimeout(timeOutID);
            }, 3000);
        }, this);
    }

    private setAnger(anger: number) {
        this.gAnger = anger;
        if (this.gAnger <= 0) {
            this.gAnger = 0;
        } else if (this.gAnger > 100) {
            this.gAnger = 100;
        }
        this.gAngerNode.getComponent(Sprite).fillRange = this.gAnger / 100;
    }
}


