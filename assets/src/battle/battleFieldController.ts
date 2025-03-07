import { _decorator, Component, dragonBones, instantiate, Label, Node, resources, Sprite, SpriteFrame, tween, Vec2, Vec3 } from 'cc';
import { RoleType } from '../resource/character/attribute';
import { deepCopy } from "../utils/copy";
import { characterController } from "./characterController";
import { BattleCharacter, CharacterStateType, CharacterCampType, BattleCharacterAttribute } from "./kind";

const { ccclass, property } = _decorator;

// 单边英雄数量
const GCharacterCount = 5;
let GHerosAttArray: BattleCharacterAttribute[] = [
    {
        id: "1",
        name: "牛马神将1",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 10,
        criticalStrikeRate: 10,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "2",
        name: "牛马神将2",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 11,
        criticalStrikeRate: 20,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "3",
        name: "牛马神将3",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 5,
        criticalStrikeRate: 30,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "4",
        name: "牛马神将4",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 3,
        criticalStrikeRate: 40,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "5",
        name: "牛马神将5",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 88,
        criticalStrikeRate: 50,
        criticalStrike: 150,
        skillIDs: [],
    },
];
let GEnemyAttArray: BattleCharacterAttribute[] = [
    /* ------------------------ */
    {
        id: "6",
        name: "牛马神将6",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 9,
        criticalStrikeRate: 10,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "7",
        name: "牛马神将7",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 66,
        criticalStrikeRate: 20,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "8",
        name: "牛马神将8",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 77,
        criticalStrikeRate: 30,
        criticalStrike: 150,
        skillIDs: [],
    },
    {
        id: "9",
        name: "牛马神将9",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 12,
        criticalStrikeRate: 40,
        criticalStrike: 150,

        skillIDs: [],
    },
    {
        id: "10",
        name: "牛马神将10",
        role: RoleType.warrior,
        imageName: "niuma",
        isLong: false,
        health: 500,
        attack: 100,
        defense: 10,
        attackSpeed: 11,
        criticalStrikeRate: 50,
        criticalStrike: 150,
        skillIDs: [],
    },
];

// 英雄预置点
const GCharacterPosition: Map<string, any> = new Map([
    // 英雄预置点
    ["1", { x: 94, y: 322 }],
    ["2", { x: 191, y: 245 }],
    ["3", { x: -25, y: 289 }],
    ["4", { x: 67.5, y: 193 }],
    ["5", { x: 176, y: 123 }],
    // 敌人预置点
    ["6", { x: -40, y: 349 }],
    ["7", { x: -161, y: -294 }],
    ["8", { x: 77, y: 291.5 }],
    ["9", { x: -50, y: -193 }],
    ["10", { x: -176, y: -154 }],
]);

@ccclass('battleFieldController')
export class battleFieldController extends Component {
    // 攻击顺序
    private gOrderArray: BattleCharacter[] = [];
    // 攻击队列目前运行的角色为止
    private gOrderIndex: number = 0;

    // 被攻击对象节点
    private gTargetNode: Node = null;

    // 战斗英雄信息列表
    private gHerosArray: BattleCharacterAttribute[] = [];

    // 敌人信息列表
    private gEnemiesArray: BattleCharacterAttribute[] = [];

    protected onLoad(): void {
        // TODO 先预设几个英雄和敌人，后面去布阵列表拿取
        this._initCharacterAttribution();

        // 游戏开始
        this.gOrderIndex = 0;
    }

    start() {
        // 攻击开始
        this._nextAttack();
    }

    update(deltaTime: number) {

    }

    private _initCharacterAttribution() {
        this.gHerosArray = deepCopy(GHerosAttArray);
        this.gEnemiesArray = deepCopy(GEnemyAttArray);
        // TODO 临时代码，后续从布阵获取
        for (let i = 0; i < 5; i++) {
            let character1: BattleCharacter = {
                id: this.gHerosArray[i].id,
                state: CharacterStateType.Wait,
                camp: CharacterCampType.Hero,
                attackSpeed: this.gHerosArray[i].attackSpeed,
                node: this.node.getChildByName("Hero" + i)
            };
            character1.node.getComponent(characterController).init(this.gHerosArray[i], CharacterCampType.Hero, CharacterStateType.Wait);
            this.gOrderArray[i] = character1;

            let character2: BattleCharacter = {
                id: this.gEnemiesArray[i].id,
                state: CharacterStateType.Wait,
                camp: CharacterCampType.Enemy,
                attackSpeed: this.gEnemiesArray[i].attackSpeed,
                node: this.node.getChildByName("Enemy" + i)
            };

            character2.node.getComponent(characterController).init(this.gEnemiesArray[i], CharacterCampType.Enemy, CharacterStateType.Wait);
            this.gOrderArray[i + 5] = character2;
        }

        // 降序排序
        function sortFunc(objA: BattleCharacter, objB: BattleCharacter) { return objB.attackSpeed - objA.attackSpeed };
        this.gOrderArray.sort(sortFunc);
    }

    // 下一次攻击
    private _nextAttack() {
        if (this.gOrderIndex > this.gOrderArray.length - 1) {
            this.gOrderIndex = 0;
        }

        var attacker = this.gOrderArray[this.gOrderIndex];

        // 等待情况的攻击者，要发起攻击
        // 如果攻击者此时不是等待状态，则由下一个人发起攻击
        if (attacker.state == CharacterStateType.Wait) {
            this._setAnimationState(attacker, CharacterStateType.Move);
        } else {
            this.gOrderIndex = this.gOrderIndex + 1;
            this._nextAttack();
        }
    }

    // 设置动画状态
    private _setAnimationState(character: BattleCharacter, state: CharacterStateType) {
        // 状态机
        character.state = state;
        switch (state) {
            case CharacterStateType.Wait:
                character.node.getComponent(characterController).wait();
                this.gOrderIndex = this.gOrderIndex + 1;
                this._nextAttack();
                break;
            case CharacterStateType.Move:
                // 确定攻击对象，优先攻击前排，前排位置按照英雄数组顺序固定
                this.gTargetNode = this.getAttackTargetNode(character);
                // TODO:如果没有攻击对象了，那么说明过了关卡，或者英雄死光了
                if (this.gTargetNode == null) {
                    console.log("过关");
                    return;
                }
                // 移动到目标位置
                var targetPosition = this.gTargetNode.getPosition();
                var characterCtl = character.node.getComponent(characterController);

                var callback = function () {
                    this._setAnimationState(character, CharacterStateType.Attack);
                }.bind(this);

                characterCtl.move(new Vec2(targetPosition.x, targetPosition.y), callback);
                
                break;
            case CharacterStateType.Attack:
                // 攻击目标
                var characterCtl = character.node.getComponent(characterController)
                characterCtl.attack(this.gTargetNode);
                // 等待攻击动画完成
                var bodyArmatureDisplay = character.node.getChildByName("Body").getComponent(dragonBones.ArmatureDisplay);
                bodyArmatureDisplay.once(dragonBones.EventObject.COMPLETE, () => {
                    // 处理被攻击目标死亡
                    var targetCtl = this.gTargetNode.getComponent(characterController);
                    var targetState = targetCtl.getState();
                    var targetID = targetCtl.getID();
                    if (targetState == CharacterStateType.Die) {
                        // 循环列表的数据需要置为死亡
                        this.gOrderArray.forEach((target) => {
                            if (target.id != targetID) return;
                            target.state = CharacterStateType.Die;
                        }
                        );
                    }
                    // 攻击完，返回原点，并进行下次攻击
                    var callback = function () {
                        this._setAnimationState(character, CharacterStateType.Wait);
                    }.bind(this);

                    characterCtl.moveBack(callback);
                }, this);

                break;
            case CharacterStateType.Die:

                break;
            default:
                break;
        }
    }

    // 获取被攻击对象节点
    // 当前算法：优先找前排
    private getAttackTargetNode(attacker: BattleCharacter): Node {
        var targetNode: Node = null;
        var targetNodeNamePre = "Hero";
        if (attacker.camp == CharacterCampType.Hero) {
            targetNodeNamePre = "Enemy";
        }
        for (let i = 0; i < GCharacterCount; i++) {
            let targetNodeTmp = this.node.getChildByName(targetNodeNamePre + i);
            let targetState = targetNodeTmp.getComponent(characterController).getState();
            if (targetState != CharacterStateType.Die) {
                targetNode = targetNodeTmp;
                break;
            }
        }

        return targetNode;
    }
}


