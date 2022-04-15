import { IGameView } from './iview';
import { InputManager } from '../core/input-manager';

let self: GamePres;

export class GamePres {
    private _view: IGameView;
    private _inputManager: InputManager;

    private _gravity = 10;
    private _groundY = 200;
    private _vel = {x: -200, y: 0};
    private _jumpTimer = 0;
    private _onGround: boolean;

    private readonly JUMP_FORCE = 3;

    public constructor(view: IGameView) {
        self = this;
        this._view = view;
        this._inputManager = new InputManager();
        this._inputManager.mouseEvent.on(this.onMouseEvent);
    }

    private t = 0;
    onUpdate(dt: number): void {
        if (this._jumpTimer > 0) {
            this._jumpTimer -= 1;
            this._vel.y -= this._gravity * this.JUMP_FORCE;
        } else {
            this._vel.y += this._gravity;
        }

        if (this._vel.y >= this._groundY) {
            this._vel.y = this._groundY;
            this._onGround = true;
        } else {
            this._onGround = false;
        }

        this._view.playerOnGround = this._onGround;
        this._view.playerPos = this._vel;
    }

    onMouseEvent(e: MouseEvent): void {
        self._jumpTimer = 10;
    }

    onDestroy(): void {
        this._inputManager.mouseEvent.off(this.onMouseEvent);
    }
}