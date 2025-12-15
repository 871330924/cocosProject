import { _decorator, CCInteger, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BG')
export class BG extends Component {

    //加载两张图片
    @property(Node)
    bg : Node = null;

    @property(CCInteger)
    speed = 200;

    start() {

    }

    update(deltaTime: number) {
        //滚动图片
        this.bg.position = this.bg.position.add(new Vec3(0,-deltaTime*this.speed,0));
        //当图片滚到头就重置位置
        if(this.bg.position.y <= -426){
            this.bg.position = this.bg.position.add(new Vec3(0,852,0));
        }
    }
}


