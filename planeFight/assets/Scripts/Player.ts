import { __private, _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

//添加子弹类型枚举
enum ShootType {
    OneShoot,
    TwoShoot
};

@ccclass('Player')
export class Player extends Component {


    //子弹生成速度-0.3秒生成一个子弹
    @property
    bulletRate = 0.3;
    //子弹计时器
    bulletTimer = 0;
    //引入子弹原型1&2
    @property(Prefab)
    bulletPrefab1: Prefab = null;
    @property(Prefab)
    bulletPrefab2: Prefab = null;




    //引入子弹父节点
    @property(Node)
    bulletParent: Node = null;


    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    onTouchMove(event: EventTouch) {
        this.node.setPosition(this.clamp(this.node.position.x + event.getDeltaX(), -230, 230), this.clamp(this.node.position.y + event.getDeltaY(), -420, 400), this.node.position.z)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    start() {
    }

    update(deltaTime: number) {
        this.bulletTimer += deltaTime;
        if (this.bulletTimer > this.bulletRate) {
            this.bulletCreate(ShootType.OneShoot);
            this.bulletTimer -= this.bulletRate;
        }

    }

    bulletCreate(shootType: ShootType) {

        switch (shootType) {
            case ShootType.OneShoot:
                this.oneShoot();
                break;
            case ShootType.TwoShoot:
                this.twoShoot();
                break;
        }

    }

    oneShoot() {
        let bulletInstance = null;
        //生成子弹实例
        bulletInstance = instantiate(this.bulletPrefab1);
        //设置子弹父节点
        bulletInstance.setParent(this.bulletParent);
        //设置子弹位置
        bulletInstance.setWorldPosition(this.node.worldPositionX, this.node.worldPositionY + 60, this.node.worldPositionZ);
    }

    twoShoot() {
        let bulletInstance1 = null;
        let bulletInstance2 = null;

        //生成两个子弹实例
        bulletInstance1 = instantiate(this.bulletPrefab2);
        bulletInstance2 = instantiate(this.bulletPrefab2);

        //设置子弹父节点
        bulletInstance1.setParent(this.bulletParent);
        bulletInstance2.setParent(this.bulletParent);
        //设置子弹位置
        bulletInstance1.setWorldPosition(this.node.worldPositionX - 20, this.node.worldPositionY + 60, this.node.worldPositionZ);
        bulletInstance2.setWorldPosition(this.node.worldPositionX + 20, this.node.worldPositionY + 60, this.node.worldPositionZ);



    }




























    //限制范围的公共方法
    clamp = (value: number, min: number, max: number): number => {
        return Math.min(Math.max(value, min), max);
    };
}


