import { IGameView } from './iview';
import { InputManager } from '../core/input-manager';

let self: GamePres;

export class GamePres {
    private _view: IGameView;
    private _inputManager: InputManager;

    private _isGameOver: boolean;
    private _gravity = 3;
    private _groundY = 200;
    private _vel = {x: -200, y: 0};
    private _jumpTimer = 0;
    private _onGround: boolean;

    private readonly JUMP_FORCE = 3;
    private readonly JUMP_TIME = 30;

    public constructor(view: IGameView) {
        self = this;
        this._view = view;
        this._view.createObstacle(0, 0, this._groundY);
        this._view.onObstacleCollided.on((id) => {
            this._view.playerPos = {x: -200, y: this._groundY};
            this._view.gameOver(id);
            this._isGameOver = true;
        })

        this._inputManager = new InputManager();
        this._inputManager.mouseEvent.on(this.onMouseEvent);
    }

    onUpdate(dt: number): void {
        if (this._isGameOver) return;

        //Jump
        if (this._jumpTimer > 0) {
            this._jumpTimer -= 1;
            this._vel.y -= this._gravity * this.JUMP_FORCE;
        } else {
            this._vel.y += this._gravity;
        }

        this._vel.y = Math.min(Math.max(this._vel.y, -this._groundY/2), this._groundY);

        //Gravity
        if (this._vel.y >= this._groundY) {
            this._vel.y = this._groundY;
            this._onGround = true;
        } else {
            this._onGround = false;
        }

        //Obstacle
        const pos = this._view.getObstaclePos(0);
        let newX = pos.x - 5;
        if (newX < - 500) newX = 500;
        this._view.setObstaclePos(0, newX, pos.y);

        //Update Viewer
        this._view.playerOnGround = this._onGround;
        this._view.playerPos = this._vel;
        this._view.onUpdate();
    }

    onDestroy(): void {
        this._inputManager.mouseEvent.off(this.onMouseEvent);
    }

    private onMouseEvent(e: MouseEvent): void {
        self._jumpTimer = self.JUMP_TIME;
    }
}