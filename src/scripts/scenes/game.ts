import { BaseScene } from '../core/base-scene';
import { GamePres } from '../game/pres';
import { GameView } from '../game/view';
import { GameUIPres } from '../game-ui/pres';
import { GameUIView } from '../game-ui/view';

export class SceneGame extends BaseScene {
    private _game: GamePres;
    private _gameUI: GameUIPres;

    onStart(): void {
        const gameView = new GameView(this);
        this._game = new GamePres(gameView);

        const uiView = new GameUIView(this);
        this._gameUI = new GameUIPres(uiView);
    }

    onUpdate(dt: number): void {
        this._game?.onUpdate(dt);
    }

    onDestroy(): void {
        this._game?.onDestroy();
        this._gameUI?.onDestroy();
    }
}