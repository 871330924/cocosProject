import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    //速度
    @property
    speed = 200;

    protected onLoad(): void {
        //开始给飞机一个随机的偏移量
        let a = (Math.random() * 460 -230);
        console.log(a);
        this.node.position = this.node.position.add(new Vec3(a,0,0));
    }

    start() {

    }

    update(deltaTime: number) {
        this.node.position = this.node.position.add(new Vec3(0,-this.speed*deltaTime,0));
    }
}


