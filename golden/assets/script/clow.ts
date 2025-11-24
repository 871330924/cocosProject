import { _decorator, Component, Node,tween, Quat, Vec3, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('clow')
export class clow extends Component {
    // 摆动幅度（角度）
    @property
    swingRange: number = 30;
    
    // 摆动速度（弧度/秒）
    @property
    swingSpeed: number = 3;
    
    // 初始角度偏移（用于多个爪子错开节奏）
    @property
    startPhase: number = 0;
    
    // 是否启用摆动
    @property
    isSwinging: boolean = true;

    // 初始角度（记录摆动中心点）
    private _startAngle: number = 0;
    // 累计时间
    private _elapsedTime: number = 0;

    // 旋转速度（弧度/秒）
    private rotateSpeed: number = math.toRadian(30); 

    start(){
        // this.isSwinging = true;
    }

    update(deltaTime: number) {
        // // if (!this.isSwinging) return;
        
        // // 累计时间
        // this._elapsedTime += deltaTime;
        
        // // 使用正弦函数计算当前帧的角度
        // // Math.sin 返回值在 -1 到 1 之间，乘以 swingRange 得到实际摆动角度
        // let currentSwing = Math.sin(this._elapsedTime * this.swingSpeed) * this.swingRange;
        
        // // 设置节点角度：初始角度 + 摆动偏移
        // this.node.angle = this._startAngle + currentSwing;
        //         Quat.rotateY(newRotation, currentRotation, this.rotateSpeed * deltaTime);
// 获取当前旋转
        let currentRotation = this.node.rotation;
        // 创建新四元数存储结果
        let newRotation = new Quat();
        // 绕Y轴旋转
        Quat.rotateY(newRotation, currentRotation, this.rotateSpeed * deltaTime);
        this.node.rotation =    Quat.rotateY(newRotation, currentRotation, this.rotateSpeed * deltaTime);

        console.log(this.node.angle);
    }











    // 开始摆动
    startSwing() {
        this.isSwinging = true;
    }

    // 停止摆动（停在当前角度）
    stopSwing() {
        this.isSwinging = false;
    }

    // 停止摆动并回到中心位置
    stopSwingAndReturn() {
        this.isSwinging = false;
        this.node.angle = this._startAngle;
    }

    // 重置摆动状态
    resetSwing() {
        this._elapsedTime = this.startPhase;
        this.node.angle = this._startAngle;
    }
}
