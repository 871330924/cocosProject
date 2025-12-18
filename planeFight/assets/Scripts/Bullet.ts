import { _decorator, Collider2D, Component, Contact2DType, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    speed = 500;

    //导入对象的碰撞器
    collider: Collider2D = null;

    protected onLoad(): void {
        //加载碰撞器
        this.collider = this.getComponent(Collider2D);
        //开启碰撞器监听
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    onBeginContact() {
        //碰撞则销毁子弹
        this.node.destroy();
    }

    start() {

    }

    update(deltaTime: number) {
        this.node.position = this.node.position.add(new Vec3(0, this.speed * deltaTime, 0));
        if (this.node.position.y > 435) {
            this.node.destroy();
        }
    }

}


