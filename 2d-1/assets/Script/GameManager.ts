import { _decorator, CCInteger, Component, Prefab, Node, instantiate, Label, Vec3 } from 'cc';
import { BLOCK_SIZE, PlayerController } from './PlayerController';

const { ccclass, property } = _decorator;
enum BlockType {
    BT_NONE = 0,
    BT_STONE = 1,
};

enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END,
};


@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: Prefab })
    public boxPrefab: Prefab | null = null;

    @property({ type: CCInteger })
    public roadLength: number = 50;
    private _road: BlockType[] = [];

    @property({ type: Node })
    public startMenu: Node | null = null; // 开始的 UI
    @property({ type: PlayerController })
    public playerCtrl: PlayerController | null = null; // 角色控制器
    @property({ type: Label })
    public stepsLabel: Label | null = null; // 计步器

    generateRoad() {
        this.node.removeAllChildren();
        this._road = [];
        this._road.push(BlockType.BT_STONE);

        //这个方法只是生成对应的地图的数学结构，并没有真正的生成地图
        for (let i = 1; i < this.roadLength; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {//如果当前为空，那么下个必然是石头
                this._road.push(BlockType.BT_STONE);
            } else {
                //如果当前不为空，那么随机添加空或者石头
                this._road.push(this.generateStone());
            }
        }

        //这个方法按照上面生成的地图的数学结构真实的生成地图块并放到对应的地方
        for (let j = 0; j < this._road.length; j++) {
            let block: Node | null = this.spawnBlockByType(this._road[j]);
            if (block) {
                this.node.addChild(block);
                block.setPosition(j * BLOCK_SIZE, 0, 0);
            }
        }
    }
    //根据随机数生成砖块
    generateStone() {
        return Math.floor(Math.random() * 2);
    }


    setCurState(value: GameState) {
        switch (value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if (this.startMenu) {
                    this.startMenu.active = false;
                }
                if (this.stepsLabel) {
                    this.stepsLabel.string = '0';   // 将步数重置为0
                }
                setTimeout(() => {      //直接设置active会直接开始监听鼠标事件，做了一下延迟处理
                    if (this.playerCtrl) {
                        this.playerCtrl.setInputActive(true);
                    }
                }, 0.1);
                break;
            case GameState.GS_END:
                break;
        }
    }

    init() {
        if (this.startMenu) {
            this.startMenu.active = true;
        }
        this.generateRoad();

        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false);
            this.playerCtrl.node.setPosition(Vec3.ZERO);
            this.playerCtrl.reset();
        }
    }

    onStartButtonClicked() {
        this.setCurState(GameState.GS_PLAYING);
    }
    spawnBlockByType(type: BlockType) {
        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.boxPrefab);
                break;
        }
        return block;
    }

    start() {
        this.setCurState(GameState.GS_INIT); // 第一初始化要在 start 里面调用
    }

    update(deltaTime: number) {

    }
}


