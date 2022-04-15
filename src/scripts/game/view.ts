import { IGameView } from './iview';
import { Container } from 'pixi.js';
import { Animations, Bunny } from '../entities/bunny';

export class GameView implements IGameView {
    private _scene: Container;
    private _player: Bunny;
    private _playerOnGround: boolean;
    private _lastPlayerY = 0;

    public constructor(scene: Container) {
        this._scene = scene;
        this._player = new Bunny(this._scene);
    }

    public set playerPos(val: {x: number, y: number}) {
        this._player.position = val;
        const dir = val.y - this._lastPlayerY;

        if (dir > 0 && this._player.anim === Animations.FLY_IDLE)
            this._player.anim = Animations.FLY_FALL_LOOP;
        
            this._lastPlayerY = val.y;
    }

    public set playerOnGround(val: boolean) {
        if (this._playerOnGround === val) return;

        this._playerOnGround = val;
        this._player.anim = val ? Animations.FLY_LAND_SLIDE : Animations.FLY_IDLE;
    }
}