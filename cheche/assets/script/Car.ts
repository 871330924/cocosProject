import { _decorator, Collider, Component, Input, input, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {

    //绑定小车的碰撞节点
    @property(Collider)
    Player_Collider:Collider = null; //赛车自身的碰撞节点

    //绑定相机节点
    @property(Node)
    Camera_Node :Node = null;

    //小车的移动速度
    @property
    Player_Speed = 30;

    Player_Move = {a:false,d:false};

    protected onLoad(): void {
        //加载函数加载键盘监听
        input.on(Input.EventType.KEY_DOWN,this.Key_Down ,this);
        input.on(Input.EventType.KEY_UP,this.Key_Up ,this);

        //加载碰撞节点
        this.Player_Collider.on("onTriggerEnter",this.Start_Collider,this); 
    }

    protected onDestroy(): void {
        //销毁函数销毁键盘监听
        input.off(Input.EventType.KEY_DOWN,this.Key_Down,this);
        input.off(Input.EventType.KEY_DOWN,this.Key_Up,this);
        this.Player_Collider.off("onTriggerEnter",this.Start_Collider,this); 
    }

    Key_Down(key){
        if(key.keyCode == 65){
            this.Player_Move.a = true;
        }
        if(key.keyCode == 68){
            this.Player_Move.d = true;
        }
    }

    Key_Up(key){
        if(key.keyCode == 65){
            this.Player_Move.a = false;
        }
        if(key.keyCode == 68){
            this.Player_Move.d = false;            
        }
    }

    Start_Collider(){
        console.log("发生碰撞");
    }


    start() {
        
    }

    update(deltaTime: number) {
        //生成时间变量车速
        const DPlayer_Speed = this.Player_Speed * deltaTime;
        //每过一帧，小车移动一定距离
        //获取小车位置
        const pos = this.node.getPosition();
        //根据按键判断左右移动
        if(this.Player_Move.a !== this.Player_Move.d){
            pos.x += (this.Player_Move.d ? 1 : -1) * deltaTime * 10;
        }
        pos.x = Math.max(-2.15,Math.min(2.15,pos.x));
        this.node.setPosition(pos.add(new Vec3(0,0,-0.1*DPlayer_Speed)))
        //相机节点位置跟着移动
        //获取相机位置
        const Camera_Pos = this.Camera_Node.getPosition();
        this.Camera_Node.setPosition(Camera_Pos.x,Camera_Pos.y,Camera_Pos.z - 0.1*DPlayer_Speed);
    }
}


