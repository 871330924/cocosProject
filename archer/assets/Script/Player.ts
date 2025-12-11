import { _decorator, Collider, Collider2D, Component, Contact2DType, Input, input, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bazi')
export class bazi extends Component {

    @property(Node)
    Bazi : Node = null;

    @property
    Angle_Speed = 1;//旋转速度

    @property(Prefab)//加载箭的预制体节点
    Arrow_Prefab : Prefab = null;

    @property(Node)//加载箭的父节点
    Arrow_Parent_Node = null;

    protected onLoad(): void {
        //开启监听触摸事件
        input.on(Input.EventType.TOUCH_START,this.TOUCH_START ,this);
    }

    protected onDestroy(): void {
         //关闭监听触摸事件
        input.off(Input.EventType.TOUCH_START,this.TOUCH_START ,this);
    }

    TOUCH_START(){
        const Arrow_Node = instantiate(this.Arrow_Prefab);//从预制体初始化
        Arrow_Node.setParent(this.Arrow_Parent_Node);//设置父节点
        //开启组件监听
        Arrow_Node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.Begin_Contact,this);
        
        //执行缓动逻辑
        tween(Arrow_Node).to(1,new Vec3(0,610,0)).call(()=>{
            this.Arrow_To_Bazi(Arrow_Node);
            //关闭组件监听
            Arrow_Node.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT,this.Begin_Contact,this);
        }).start();
        
    }

    Begin_Contact(){
        console.log("碰撞");
    }

    Arrow_To_Bazi(Arrow_Node:Node){
            const World_Pos = Arrow_Node.getWorldPosition();//获取世界坐标
            Arrow_Node.setParent(this.Bazi);//设置父节点为箭靶节点
            Arrow_Node.setWorldPosition(World_Pos);//重设世界坐标
            //搞不懂为什么会有这个设置旋转角度的问题
            Arrow_Node.angle = -this.Bazi.angle;//设置旋转角度
    }

    start() {        
    }



    update(deltaTime: number) {
        this.Bazi.angle = (this.Bazi.angle + this.Angle_Speed*deltaTime) % 360;//自增并取模
    }

}


