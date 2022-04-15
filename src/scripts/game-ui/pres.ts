import { IGameUIView as IGameUIView } from './iview';
import { GameModel, STATES } from '../models/gameModel';

export class GameUIPres {
    private _view: IGameUIView;
    private _gameModel: GameModel;

    public constructor(view: IGameUIView) {
        this._view = view;
        this._view.onPausePressed.on(() => {
            var state = this._gameModel.State;
            this._gameModel.State = state === STATES.PAUSED ? STATES.GAMEPLAY : STATES.PAUSED;
        })

        this._gameModel = new GameModel();
        this._gameModel.subscribe(() => this.onGameChanged());
    }

    private onGameChanged(): void {
        this._view.score = this._gameModel.Score;
        this._view.dist = this._gameModel.Dist;
    }

    onDestroy(): void {
        this._gameModel.unSubscribe();
    }
}