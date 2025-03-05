import { _decorator, Component, instantiate, Label, Node, resources, Sprite, SpriteFrame, tween, Vec2, Vec3 } from 'cc';
import { RoleType } from '../resource/character/attribute';
import { play } from '../heroAnimation/play';
import { deepCopy } from "../utils/copy";

const { ccclass, property } = _decorator;



enum CharacterStateType {
    WAIT,
    RUN,
    ATTACK,
    DIE
}

// 战斗界面英雄信息
interface BattleCharacter {
    index: number, // 序号，用于标注位置
    attribute: BattleCharacterAttribute, // 英雄属性
    state: CharacterStateType,   // 英雄状态
    camp: CharacterCampType, // 判断敌人
}

// 战斗界面英雄属性
interface BattleCharacterAttribute {
    id: string;
    name: string;             // 人物名称
    role: RoleType;           // 职业
    imageName: string;        // 图像名称
    isLong: boolean;            // 是否是远程
    health: number;            // 生命值
    attack: number;            // 攻击力
    defense: number;           // 防御力
    attackSpeed: number;       // 攻击速度
    criticalStrikeRate: number; // 暴击率
    criticalStrike: number;    // 暴击伤害

    skillIDs: string[];        // 技能ID列表
}

// 阵营
enum CharacterCampType {
    Role,
    Enemy
}
let GHerosArray: BattleCharacter[] = [
    {
        index: 0,
        attribute: {
            id: "1",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 10,
            criticalStrikeRate: 10,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Role
    },
    {
        index: 1,
        attribute: {
            id: "2",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 11,
            criticalStrikeRate: 20,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Role
    },
    {
        index: 2,
        attribute: {
            id: "3",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 5,
            criticalStrikeRate: 30,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Role
    },
    {
        index: 3,
        attribute: {
            id: "4",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 3,
            criticalStrikeRate: 40,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Role
    },
    {
        index: 4,
        attribute: {
            id: "5",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 88,
            criticalStrikeRate: 50,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Role
    },
];
let GEnemyArray: BattleCharacter[] = [
    /* ------------------------ */
    {
        index: 0,
        attribute: {
            id: "6",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 9,
            criticalStrikeRate: 10,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Enemy
    },
    {
        index: 1,
        attribute: {
            id: "7",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 66,
            criticalStrikeRate: 20,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Enemy
    },
    {
        index: 2,
        attribute: {
            id: "8",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 77,
            criticalStrikeRate: 30,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Enemy
    },
    {
        index: 3,
        attribute: {
            id: "9",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 12,
            criticalStrikeRate: 40,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Enemy
    },
    {
        index: 4,
        attribute: {
            id: "10",
            name: "牛马神将",
            role: RoleType.warrior,
            imageName: "niuma",
            isLong: false,
            health: 1000,
            attack: 100,
            defense: 10,
            attackSpeed: 11,
            criticalStrikeRate: 50,
            criticalStrike: 150,

            skillIDs: [],
        },
        state: CharacterStateType.WAIT,
        camp: CharacterCampType.Enemy
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

@ccclass('BattleFieldController')
export class BattleFieldController extends Component {
    // 攻击顺序
    private gOrderArray: BattleCharacter[] = [];
    // 攻击队列目前运行的角色为止
    private gOrderIndex: number = 0;
    // 攻击队列被攻击者位置
    private gOrderTargetIndex: number = 0;

    // 战斗英雄信息列表
    private gHerosArray: BattleCharacter[] = [];
    // 战斗英雄节点列表
    private gHeroNodesArray: Node[] = [];
    // 敌人信息列表
    private gEnemiesArray: BattleCharacter[] = [];
    // 敌人节点列表
    private gEnemyNodesArray: Node[] = [];
    // 目标所处的索引位置
    private gTargetCharacterIndex: number = 0;

    // 原始节点位置
    private gOriginPosition = new Vec2(0, 0);

    // 角色数量
    private gCharacterCount: number = 0;

    protected onLoad(): void {
        // TODO 先预设几个英雄和敌人，后面去布阵列表拿取
        this._initCharacterAttribution();

        // 初始化英雄动画
        this._initHerosAnimation();
        // 初始化敌人动画
        this._initEnemiesAnimation();

        // 游戏开始
        this.gOrderIndex = 0;

        // 攻击开始
        this._nextAttack();
    }

    start() {

    }

    update(deltaTime: number) {

    }

    private _initCharacterAttribution() {
        this.gHerosArray = deepCopy(GHerosArray);
        this.gEnemiesArray = deepCopy(GEnemyArray);
        console.log(this.gHerosArray)
        console.log(GHerosArray)
        for (let i = 0; i < 5; i++) {
            this.gOrderArray[i] = this.gHerosArray[i];
            this.gOrderArray[i + 5] = this.gEnemiesArray[i];
        }

        this.gCharacterCount = this.gOrderArray.length;

        function sortFunc(speedA: BattleCharacter, speedB: BattleCharacter) { return speedB.attribute.attackSpeed - speedA.attribute.attackSpeed };
        // 降序排序
        this.gOrderArray.sort(sortFunc);
    }

    // 初始化英雄动画
    private _initHerosAnimation() {
        this.gHerosArray.forEach((character) => {
            let characterNode = this.node.getChildByName("Hero" + character.index);
            this.gHeroNodesArray[character.index] = characterNode;

            // 初始化动画
            let bodyNode = characterNode.getChildByName("Body");
            let bodySprite = bodyNode.getComponent(Sprite);
            bodySprite.spriteFrame = null;
            bodyNode.getComponent(play).Init(character.attribute.imageName);
        
            // 设置人物名称
            let nameLabel = characterNode.getChildByName("Name").getComponent(Label);
            nameLabel.string = character.attribute.name;
            // 设置人物血条
            let bloodSprite = characterNode.getChildByName("BloodBackground").getChildByName("Blood").getComponent(Sprite);
            let imagePath = "battle/" + "blood-green" + "/spriteFrame";
            resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                bloodSprite.spriteFrame = spriteFrame;
            });
        }
        );
    }

    // 初始化敌人动画
    private _initEnemiesAnimation() {
        this.gEnemiesArray.forEach((character) => {
            let characterNode = this.node.getChildByName("Enemy" + character.index);
            this.gEnemyNodesArray[character.index] = characterNode;

            // 初始化动画
            let bodyNode = characterNode.getChildByName("Body");
            let bodySprite = bodyNode.getComponent(Sprite);
            bodySprite.spriteFrame = null;
            bodyNode.getComponent(play).Init(character.attribute.imageName);
            
            // 设置人物名称
            let nameLabel = characterNode.getChildByName("Name").getComponent(Label);
            nameLabel.string = character.attribute.name;
            // 左右对称旋转人物图片，但是血条等不对称
            let originScale = bodyNode.scale;
            bodyNode.setScale(new Vec3(-originScale.x, originScale.y, originScale.z));

            // 设置人物血条
            let bloodSprite = characterNode.getChildByName("BloodBackground").getChildByName("Blood").getComponent(Sprite);
            let imagePath = "battle/" + "blood-red" + "/spriteFrame";
            resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                bloodSprite.spriteFrame = spriteFrame;
            });
        }
        );
    }
    // 下一次攻击
    private _nextAttack() {
        if (this.gOrderIndex > this.gCharacterCount - 1) {
            this.gOrderIndex = 0;
        }

        var attacker = this.gOrderArray[this.gOrderIndex];

        // 等待情况的攻击者，要发起攻击
        // 如果攻击者此时不是等待状态，则由下一个人发起攻击
        if (attacker.state == CharacterStateType.WAIT) {
            this._setAnimationState(attacker, CharacterStateType.RUN);
        } else {
            this.gOrderIndex = this.gOrderIndex + 1;
            this._nextAttack();
        }
    }

    // 设置动画状态
    private _setAnimationState(attacker: BattleCharacter, state: CharacterStateType) {
        // 状态机
        attacker.state = state;
        switch (state) {
            case CharacterStateType.WAIT:
                this.gOrderIndex = this.gOrderIndex + 1;
                this._nextAttack();
                break;
            case CharacterStateType.RUN:
                // 确定攻击对象，优先攻击前排，前排位置按照英雄数组顺序固定
                var targetCharacter: BattleCharacter = null;
                var targetNode: Node = null;
                if (attacker.camp == CharacterCampType.Role) {
                    for (let i = 0; i < this.gEnemiesArray.length; i++) {
                        if (this.gEnemiesArray[i].state != CharacterStateType.DIE) {
                            targetCharacter = this.gEnemiesArray[i];
                            targetNode = this.gEnemyNodesArray[i];
                            this.gTargetCharacterIndex = i;
                            for (let j = 0; j < this.gOrderArray.length; j++) {
                                if (this.gOrderArray[j].attribute.id == targetCharacter.attribute.id) {
                                    this.gOrderTargetIndex = j;
                                }
                            }
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < this.gHerosArray.length; i++) {
                        if (this.gHerosArray[i].state != CharacterStateType.DIE) {
                            targetCharacter = this.gHerosArray[i];
                            targetNode = this.gHeroNodesArray[i];
                            this.gTargetCharacterIndex = i;
                            for (let j = 0; j < this.gOrderArray.length; j++) {
                                if (this.gOrderArray[j].attribute.id == targetCharacter.attribute.id) {
                                    this.gOrderTargetIndex = j;
                                }
                            }
                            break;
                        }
                    }
                }

                // TODO:如果没有攻击对象了，那么说明过了关卡，或者英雄死光了
                if (targetCharacter == null) {
                    console.log("过关");
                    return;
                }

                // 移动到目标位置，远程攻击不需要移动
                var isLong = attacker.attribute.isLong;
                // var characterNode = null;
                if (isLong) {
                    this._setAnimationState(attacker, CharacterStateType.ATTACK);
                    return;
                }
                // 近战攻击要移动位置
                var attackerNode = this.gHeroNodesArray[attacker.index];
                if (attacker.camp == CharacterCampType.Enemy) {
                    attackerNode = this.gEnemyNodesArray[attacker.index];
                }

                this.gOriginPosition.x = attackerNode.getPosition().x;
                this.gOriginPosition.y = attackerNode.getPosition().y;

                var targetPos = new Vec2(0, 0);
                targetPos.x = targetNode.getPosition().x;
                targetPos.y = targetNode.getPosition().y;

                var callback = function () {
                    this._setAnimationState(attacker, CharacterStateType.ATTACK);
                }.bind(this);

                if (attacker.camp == CharacterCampType.Role) {
                    tween(attackerNode).to(0.5, { position: new Vec3(targetPos.x-40, targetPos.y, 0) }).call(callback).start();
                } else {
                    tween(attackerNode).to(0.5, { position: new Vec3(targetPos.x + 40, targetPos.y, 0) }).call(callback).start();
                }
                break;
            case CharacterStateType.ATTACK:
                var attackerNode = this.gHeroNodesArray[attacker.index];
                if (attacker.camp == CharacterCampType.Enemy) {
                    attackerNode = this.gEnemyNodesArray[attacker.index];
                }
                // 开始播放攻击动画
                attackerNode.getChildByName("Body").getComponent(play).playAnimation("attack");
                // 计算血量
                // 攻击者攻击力
                var attack = 0;
                // 是否暴击
                var isCritical = Math.random() < parseFloat((attacker.attribute.criticalStrikeRate / 100).toFixed(2));
                // 暴击的攻击
                var addAttack = isCritical ? attacker.attribute.attack * parseFloat((attacker.attribute.criticalStrike / 100).toFixed(2)) : 0;

                // 原始属性
                var originTargetCharacter = GHerosArray[this.gTargetCharacterIndex]
                // 被攻击者
                var targetCharacter = this.gHerosArray[this.gTargetCharacterIndex];
                var targetNode = this.gHeroNodesArray[this.gTargetCharacterIndex];

                if (attacker.camp == CharacterCampType.Role) {
                    targetCharacter = this.gEnemiesArray[this.gTargetCharacterIndex];
                    targetNode = this.gEnemyNodesArray[this.gTargetCharacterIndex];
                    originTargetCharacter = GEnemyArray[this.gTargetCharacterIndex];
                }
                // 被攻击者防御力
                var targetDenfence = 0;
                targetDenfence = targetCharacter.attribute.defense;
                // 最终的攻击力 = 攻击者攻击力 + 暴击 - 被攻击者防御力
                attack = attacker.attribute.attack + addAttack - targetDenfence;
                if (attack <= 0) attack = 0;

                // 扣血
                targetCharacter.attribute.health = targetCharacter.attribute.health - attack;
                // 设置受伤值
                targetNode.getComponent("CharacterController").setHurt(attack);
                // 设置血条
                targetNode.getComponent("CharacterController").setBlood(targetCharacter.attribute.health / originTargetCharacter.attribute.health);

                console.log("targetCharacter :%s ,_tmptargetCharacter: %s", targetCharacter.attribute.health, originTargetCharacter.attribute.health)
                if (targetCharacter.attribute.health <= 0) {
                    // 角色死亡
                    targetCharacter.attribute.health = 0;
                    targetCharacter.state = CharacterStateType.DIE;
                    this.gOrderArray[this.gOrderTargetIndex].state = CharacterStateType.DIE;
                    this._setAnimationState(targetCharacter, CharacterStateType.DIE);

                    targetNode.active = false;
                }
                // 回到原来位置
                var callback = function () {
                    // 进入等待状态
                    this._setAnimationState(attacker, CharacterStateType.WAIT);
                }.bind(this);
                tween(attackerNode).to(0.5, { position: new Vec3(this.gOriginPosition.x, this.gOriginPosition.y, 0) }).call(callback).start();


                break;
            case CharacterStateType.DIE:

                break;
            default:
                break;
        }
    }
}


