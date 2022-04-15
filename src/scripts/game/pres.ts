import { IGameView } from './iview';
import { InputManager } from '../core/input-manager';
import { GameModel, STATES } from '../models/gameModel';
import { SceneManager, Scenes } from '../core/scene-manager';

let self: GamePres;

export class GamePres {
    private _view: IGameView;
    private _inputManager: InputManager;
    private _gameModel: GameModel;

    private _isGameOver: boolean;
    private _gameOverTimer = 0;

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
        this._view.createObstacle(0, 1000, this._groundY);
        this._view.onObstacleCollided.on((id) => {
            this._view.playerPos = {x: -200, y: this._groundY};
            this._view.gameOver(id);
            this._isGameOver = true;
            this._gameModel.addLeader("YOU", this._gameModel.Score);
        })

        this._gameModel = new GameModel(); 
        this._gameModel.State = STATES.GAMEPLAY;
        this._gameModel.Score = 0;
        this._gameModel.Dist = 0;

        this._inputManager = new InputManager();
        this._inputManager.mouseEvent.on(this.onMouseEvent);
    }

    private stepTimer = 0;
    onUpdate(dt: number): void {
        //Pause mode
        if (this._gameModel.State === STATES.PAUSED) {
            return;
        }

        //Game over
        if (this._isGameOver) {
            this._gameOverTimer += 1;
            if (this._gameOverTimer > 100) {
                this._gameModel.State = STATES.GAME_OVER;
                new SceneManager().changeScene(Scenes.MAIN_MENU);
            }
            return;
        }

        //Jump
        if (this._jumpTimer > 0) {
            this._jumpTimer -= 1;
            this._vel.y -= this._gravity * this.JUMP_FORCE;
        } else {
            this._vel.y += this._gravity;
        }

        //Update distance
        this.stepTimer++;
        if (this.stepTimer > 10) {
            this.stepTimer = 0;
            this._gameModel.Dist += 1;
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
        this._inputManager.mouseEvent.off((e) => this.onMouseEvent(e));
    }

    private onMouseEvent(e: MouseEvent): void {
        if (!self._onGround) return;
        self._jumpTimer = self.JUMP_TIME;
        self._gameModel.Score += 5;
    }
}