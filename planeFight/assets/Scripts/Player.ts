import { __private, _decorator, Animation, CCInteger, Collider2D, Component, Contact2DType, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, Vec3 } from 'cc';
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

    //定义动画
    @property(String)
    plane_down: string = "";
    @property(String)
    plane_hit: string = "";

    //规划血量
    @property(CCInteger)
    hp = 3;

    //定义飞机存活状态
    alive = true;

    //导入对象的碰撞器
    collider: Collider2D = null;

    //引入子弹父节点
    @property(Node)
    bulletParent: Node = null;
    //导入对象动画
    animationComponent: Animation = null;


    protected onLoad(): void {
        //开启触摸监听
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        //加载碰撞器
        this.collider = this.getComponentInChildren(Collider2D);
        //加载动画组件
        this.animationComponent = this.getComponentInChildren(Animation);
        //开启碰撞器监听
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

    }

    onBeginContact() {
        //每次碰撞减少一滴血
        this.hp -= 1;
        console.log("1")
        if (this.hp <= 0) {
            //播放死亡动画
            this.animationComponent.play("Plane_down");
            this.alive = false;

        } else {
            //播放碰撞动画
            this.animationComponent.play("Plane_hit");
            //执行无敌时间

        }
    }
    onTouchMove(event: EventTouch) {
        if (this.alive) {
            this.node.setPosition(this.clamp(this.node.position.x + event.getDeltaX(), -230, 230), this.clamp(this.node.position.y + event.getDeltaY(), -420, 400), this.node.position.z)
        }
    }

    protected onDestroy(): void {
        //关闭触摸监听
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        //关闭碰撞监听
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
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


