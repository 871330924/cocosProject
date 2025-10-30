import { _decorator, CCInteger, Component, Prefab, Node, instantiate } from 'cc';
import { BLOCK_SIZE } from './PlayerController';

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

@ccclass('GameController')
export class GameController extends Component {

    @property({ type: Prefab })
    public boxPrefab: Prefab | null = null;

    @property({ type: CCInteger })
    public roadLength: number = 50;
    private _road: BlockType[] = [];


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
                break;
            case GameState.GS_END:
                break;
        }
    }

    init() { }


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
        this.generateRoad();
    }

    update(deltaTime: number) {

    }
}


