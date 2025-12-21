import { _decorator, BoxCollider, Collider2D, Component, Contact2DType, Node, Vec3, Animation, CCString, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('Enemy')
export class Enemy extends Component {

    //速度
    @property
    speed = 200;

    //导入对象的碰撞器
    collider: Collider2D = null;
    //导入对象动画
    animationComponent: Animation = null;
    //定义动画名称
    @property(CCString)
    animHit: string = "";
    @property(CCString)
    animDie: string = "";

    //定义飞机血量
    @property
    hp = 1;
    //定义飞机状态
    alive = true;

    protected onLoad(): void {
        //开始给飞机一个随机的偏移量
        let a = (Math.random() * 460 - 230);
        this.node.position = this.node.position.add(new Vec3(a, 0, 0));
        //加载碰撞器
        this.collider = this.getComponentInChildren(Collider2D);
        //开启碰撞器监听
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.animationComponent = this.getComponentInChildren(Animation);
        //
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        //血量-1
        this.hp -= 1
        if(this.hp > 0 ){
            //播放被打击的动画
            this.animationComponent.play(this.animHit);
        }else{
            //意味着死亡，关闭各种监听器
            this.alive = false;
            //关闭碰撞器监听
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            //关闭碰撞器
            this.collider.enabled = false;
            //播放爆炸动画
            this.animationComponent.play(this.animDie);
            //延迟一秒后摧毁
            this.scheduleOnce(function () {
                this.node.destroy();
            }, 1)
        }
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.alive) {
            //存活则继续移动
            this.node.position = this.node.position.add(new Vec3(0, -this.speed * deltaTime, 0));
            //如果移动到屏幕外则销毁
            if (this.node.position.y < -700) {
                this.node.destroy();
            }
        }
    }

    protected onDestroy(): void {


    }
}


