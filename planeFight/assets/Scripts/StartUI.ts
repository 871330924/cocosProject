import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartUI')
export class StartUi extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public Start_Game(){
        director.loadScene("S2");
    }
}


