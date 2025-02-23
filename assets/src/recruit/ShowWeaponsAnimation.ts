// 抽武器卡界面滚动展示武器
import { _decorator, Component, EventTouch, Node, UITransform, Vec3, resources, SpriteFrame, Sprite, Label } from 'cc';
import { WeaponryAttribute } from '../resource/weaponry/base';
import { getRecruitShowWeapons } from '../resource/weaponry/weaponry';
const { ccclass, property } = _decorator;

// 图片节点与武器信息结构体
interface imageNodeInfo {
    imageNode: Node;
    weaponInfo: WeaponryAttribute
}

@ccclass('ShowWeaponsAnimation')
export class ShowWeaponsAnimation extends Component {
    // 动画所包含的图片节点列表
    private imageNodeList: imageNodeInfo[] = [];
    // 每个图片的缝隙
    private imageDistance = 10;
    // 每个图片的宽度
    private imageWidth = 0;
    // 展示武器的UI
    @property(Node)
    private weaponUI: Node = null;

    protected onLoad(): void {
        // 本次展示武器的信息
        let showWeaponsList = getRecruitShowWeapons();
        this.preloadWeaponsImage(showWeaponsList);

        // 初始化图片节点位置以及加载武器图片
        this.initImageNode(showWeaponsList);
        // 先隐藏展示武器UI界面
        this.weaponUI.active = false;
    }

    // 预加载武器图片
    private preloadWeaponsImage(showWeaponsList: WeaponryAttribute[]) {
        for (const weaponInfo of showWeaponsList) {
            resources.preload("weapons/" + weaponInfo.imageName + "/spriteFrame", SpriteFrame);
        };
    }

    // 初始化节点与武器关联信息
    private initImageNode(showWeaponsList: WeaponryAttribute[]) {
        // 每个图片的宽度，默认都是一样大小的宽度，不扩展了
        this.imageWidth = this.node.children[0].getComponent(UITransform).width;
        for (let i = 0, j = 0; i < this.node.children.length && j < showWeaponsList.length; i++, j++) {
            let item = this.node.children[i];
            item.setPosition(new Vec3(i * (this.imageWidth + this.imageDistance), item.position.y));
            this.imageNodeList.push({ imageNode: item, weaponInfo: showWeaponsList[j] });
            // 添加武器图片
            let sprite = item.getComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.type = Sprite.Type.SIMPLE;
            let imagePath: string = "weapons/" + showWeaponsList[j].imageName + "/spriteFrame";
            console.log("image path %s", imagePath);
            resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.error('load weapon image failed, err: %s', err);
                    return;
                }
                // 使用加载的 SpriteFrame
                sprite.spriteFrame = spriteFrame;
            });
        }
    }

    // 是否滚动图标。用户按下后需要停止滚动
    private isRollingImages = true;
    // 用户点击滚动装备图片获取详细信息
    private onTouch(event: EventTouch) {
        this.isRollingImages = false;
        // 计算出点的是那个图标。绑定的是节点事件，所以只需要获取x坐标进行计算就行
        let xPosition = event.getUILocation().x;
        let targetImageInfo: imageNodeInfo = null;
        for (let i = 0; i < this.imageNodeList.length; i++) {
            // 触摸坐标大于图片的x坐标并且小于图片宽度即为目标图标
            if (this.imageNodeList[i].imageNode.position.x < xPosition && xPosition <= this.imageNodeList[i].imageNode.position.x + this.imageWidth + this.imageDistance) {
                targetImageInfo = this.imageNodeList[i];
                break;
            }
        }

        if (!targetImageInfo) {
            console.warn("not find user touch image info");
            return;
        }

        this.showWeaponInfo(targetImageInfo.weaponInfo);
    }

    private endTouch(event: EventTouch) {
        this.weaponUI.active = false;
        this.isRollingImages = true;
    }

    private showWeaponInfo(weaponInfo: WeaponryAttribute) {
        // 基础信息展示
        let basicInfoNode = this.weaponUI.getChildByName("BasicInfo");
        let weaponImageNode = basicInfoNode.getChildByName("WeaponImage");
        // 添加武器图片
        let sprite = weaponImageNode.getComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.type = Sprite.Type.SIMPLE;
        let imagePath: string = "weapons/" + weaponInfo.imageName + "/spriteFrame";
        resources.load(imagePath, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error('load weapon image failed, err: %s', err);
                return;
            }
            // 使用加载的 SpriteFrame
            sprite.spriteFrame = spriteFrame;
        });

        // 添加名字
        basicInfoNode.getChildByName("Name").getComponent(Label).string = weaponInfo.name;
        // 稀有度
        basicInfoNode.getChildByName("Rarity").getComponent(Label).string = weaponInfo.rarity.toString();
        // 分数
        basicInfoNode.getChildByName("Score").getComponent(Label).string = weaponInfo.scores.toString();
        // 类型
        basicInfoNode.getChildByName("Kind").getComponent(Label).string = weaponInfo.kind.toString();

        // 基础属性展示
        let basicAttribute = this.weaponUI.getChildByName("BasicAttribute");
        // 攻击力
        basicAttribute.getChildByName("AttackValue").getComponent(Label).string = weaponInfo.basicAttack.toString();
        // 攻击速度
        basicAttribute.getChildByName("AttackSpeedValue").getComponent(Label).string = weaponInfo.basicAttackSpeed.toString();

        // 默认没有增幅信息
        let amplifyAttribute = this.weaponUI.getChildByName("AmplifyAttribute");
        // 攻击力
        amplifyAttribute.getChildByName("AttackValue").getComponent(Label).string = "0";
        // 攻击速度
        amplifyAttribute.getChildByName("AttackSpeedValue").getComponent(Label).string = "0";

        // 描述信息
        this.weaponUI.getChildByName("Description").getComponent(Label).string = weaponInfo.description;
        this.weaponUI.active = true;
    }



    // 每秒移动速度
    private speed = 50;
    // 指定移动图片距离
    private moveImage(distance: number) {
        for (const nodeInfo of this.imageNodeList) {
            nodeInfo.imageNode.setPosition(new Vec3(nodeInfo.imageNode.position.x - distance, nodeInfo.imageNode.position.y));
        }

        // 判断第一张图片是否超出了视野
        let firstImageNode = this.imageNodeList[0].imageNode;
        if (firstImageNode.position.x < -this.imageWidth) {
            // 修改第一个元素的位置，并放入数组末尾
            let item = this.imageNodeList.shift();
            let endNode = this.imageNodeList[this.imageNodeList.length - 1].imageNode;
            item.imageNode.setPosition(new Vec3(endNode.position.x + this.imageDistance + this.imageWidth, item.imageNode.position.y));
            this.imageNodeList.push(item);
        }
    }


    start() {
        // 监听武器展示事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.on(Node.EventType.TOUCH_END, this.endTouch, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.endTouch, this);
    }

    update(deltaTime: number) {
        if (this.isRollingImages) {
            this.moveImage(deltaTime * this.speed);
        }
    }

    protected onDestroy(): void {
        // 取消武器展示事件
        this.node.off(Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.off(Node.EventType.TOUCH_END, this.endTouch, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.endTouch, this);
    }
}

