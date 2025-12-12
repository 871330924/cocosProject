import { __private, _decorator, Component, EventTouch, Input, input, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }
    onTouchMove (event:EventTouch){
        this.node.setPosition(this.clamp(this.node.position.x + event.getDeltaX(),-230,230),this.clamp(this.node.position.y + event.getDeltaY(),-420,400),this.node.position.z)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }

    start() {
        this.clamp(10,5,6);
    }

    update(deltaTime: number) {
        
    }

    clamp = (value: number, min: number, max: number): number => {
        return Math.min(Math.max(value, min), max);
    };
}


