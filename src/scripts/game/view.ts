import { IGameView } from './iview';
import { Container, Sprite, Texture } from 'pixi.js';
import { Animations, Bunny } from '../entities/bunny';
import { GameTextures } from '../core/resource-manager';
import { Event } from '../core/event';

export class GameView implements IGameView {
    public readonly onObstacleCollided = new Event<number>();

    private _scene: Container;
    private _player: Bunny;
    private _playerOnGround: boolean;
    private _lastPlayerY = 0;

    private _obstacles = new Map<number, Sprite>();

    public constructor(scene: Container) {
        this._scene = scene;
        this._player = new Bunny(this._scene);
        this._player.sprite.scale.set(0.4);
    }

    onUpdate() {
        for (const [id, o] of this._obstacles) {
            if (this.overlaps(o, this._player.sprite)) {
                this.onObstacleCollided.trigger(id);
            }
        }
    }

    public set playerPos(val: {x: number, y: number}) {
        this._player.position = val;
        const dir = val.y - this._lastPlayerY;

        // if (dir > 0 && this._player.anim === Animations.FLY_IDLE)
            // this._player.playAnim(Animations.FLY_FALL_LOOP, true);
        
            this._lastPlayerY = val.y;
    }

    public set playerOnGround(val: boolean) {
        if (this._playerOnGround === val) return;

        this._playerOnGround = val;
        const anim = val ? Animations.FLY_LAND_SLIDE : Animations.FLY_IDLE;
        this._player.playAnim(anim, true);
    }

    public gameOver(id: number): void {
        const obst = this._obstacles.get(id);
        if (obst) {
            obst.texture = Texture.from(GameTextures.STOPPER_CRUSH);
        }

        this._player.playAnim(Animations.FLY_LOSE, false);
    }

    public createObstacle(id: number, x: number, y: number): void {
        const sp = Sprite.from(GameTextures.STOPPER);
        sp.x = x;
        sp.y = y;
        sp.anchor.set(0.5, 1);
        sp.scale.set(0.4);
        this._obstacles.set(id, sp);
        this._scene.addChild(sp);
    }

    public getObstaclePos(id: number): { x: number; y: number; } {
        const pos = {x: 0, y: 0};
        const sp = this._obstacles.get(id);
        if (sp) {
            pos.x = sp.x;
            pos.y = sp.y;
        }
        return pos;
    }

    public setObstaclePos(id: number, x: number, y: number): void {
        const sp = this._obstacles.get(id);
        if (sp) {
            sp.x = x;
            sp.y = y;
        }
    }

    public overlaps(spriteA: Sprite, spriteB: Sprite): boolean {
        const b1 = spriteA.getBounds();
        const b2 = spriteB.getBounds();
        return b1.x + b1.width > b2.x && b1.x < b2.x + b2.width && b1.y + b1.height > b2.y && b1.y < b2.y + b2.height;
    }
}