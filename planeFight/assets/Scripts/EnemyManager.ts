import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    //三个飞机的生成速率
    @property
    enemy_rate_0 = 1;
    @property
    enemy_rate_1 = 3;
    @property
    enemy_rate_2 = 10;

    //导入敌机原型
    @property(Prefab)
    enemy_prefab_0 = null;
    @property(Prefab)
    enemy_prefab_1 = null;
    @property(Prefab)
    enemy_prefab_2 = null;

    protected onLoad(): void {
        //开启定时器
        console.log("1");
        this.schedule(this.enemyGenerate0, this.enemy_rate_0);
    }

    //生成敌机1
    enemyGenerate0() {
        console.log("2");
        const enemy = instantiate(this.enemy_prefab_0);
        this.node.addChild(enemy);
    };
    //

    start() {

    }

    protected onDestroy(): void {
        this.unschedule(this.enemyGenerate0);
    }

    update(deltaTime: number) {

    }
}


