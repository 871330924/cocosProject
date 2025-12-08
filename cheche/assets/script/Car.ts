import { _decorator, Button, Collider, Component, director, Input, input, Label, Node, Vec3 } from 'cc';
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

    //导入UI节点，并控制节点的显示，隐藏和销毁
    @property(Node)
    Tips : Node = null;

    @property(Label)
    Tips_Label : Label = null;
     

    Player_Move = {a:false,d:false};

    Move_Flag = true;

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

    Start_Collider(C){
        //Tips组件激活
        this.Tips.active = true;
        this.Move_Flag = false;
        console.log("发生碰撞");
        const name = C.otherCollider.node.name;
        if(name == "final"){
            this.Tips_Label.string = "win";
            console.log("win");
        }else {
            this.Tips_Label.string = "lose";
            console.log("lose");
        }

    }


    start() {
        
    }

    update(deltaTime: number) {
        if(!this.Move_Flag){
            return;
        }


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

    Restart_Game(){
        // //第一种写法
        // //隐藏提示框
        // this.Tips.active = false;
        // //初始化赛车位置
        // this.node.setPosition(new Vec3(0,0.25,-0.5));
        // //初始化相机位置
        // this.Camera_Node.setPosition(new Vec3(0,4.608,6.919));
        // //开启移动开关
        // this.Move_Flag = true;
        //第二种写法-导演功能
        director.loadScene("cheche");
    }
}


