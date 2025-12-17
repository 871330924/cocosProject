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

    }

    //生成敌机0
    enemyGenerate0() {
        const enemy = instantiate(this.enemy_prefab_0);
        this.node.addChild(enemy);
    }

    //生成敌机1
    enemyGenerate1() {
        const enemy = instantiate(this.enemy_prefab_1);
        this.node.addChild(enemy);
    }
    //生成敌机2
    enemyGenerate2() {
        const enemy = instantiate(this.enemy_prefab_2);
        this.node.addChild(enemy);
    }

    start() {
        // //开启定时器
        this.schedule(this.enemyGenerate0, this.enemy_rate_0);
        this.schedule(this.enemyGenerate1, this.enemy_rate_1);
        this.schedule(this.enemyGenerate2, this.enemy_rate_2);


    }

    protected onDestroy(): void {
        //关闭定时器
        this.unschedule(this.enemyGenerate0);
        this.unschedule(this.enemyGenerate1);
        this.unschedule(this.enemyGenerate2);


    }

    update(deltaTime: number) {

    }
}


