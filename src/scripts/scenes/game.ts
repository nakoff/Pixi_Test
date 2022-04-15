import { BaseScene } from '../core/base-scene';
import { GamePres } from '../game/pres';
import { GameView } from '../game/view';

export class SceneGame extends BaseScene {
    private _game: GamePres;

    onStart(): void {
        const gameView = new GameView(this);
        this._game = new GamePres(gameView);
    }

    onUpdate(dt: number): void {
        this._game?.onUpdate(dt);
    }

    onDestroy(): void {
        this._game?.onDestroy();
    }
}