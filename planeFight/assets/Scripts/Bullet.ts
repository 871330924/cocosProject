import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    speed = 500;

    start() {

    }

    update(deltaTime: number) {
        this.node.position = this.node.position.add(new Vec3(0,this.speed*deltaTime,0));
        if(this.node.position.y > 435){
            this.node.destroy();
        }
    }

}


