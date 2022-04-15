import { BUTTONS, IMenuView } from './iview';
import { GameModel, STATES } from '../models/gameModel';
import { SceneManager, Scenes } from '../core/scene-manager';

export class MenuPres {
    private _view: IMenuView;

    public constructor(view: IMenuView) {
        this._view = view;
        const gameModel = new GameModel();
        gameModel.addLeader("NumberOne", 999);
        gameModel.addLeader("Anonim", 670);
        gameModel.addLeader("SomeOne", 543);
        gameModel.addLeader("CoolMan", 390);
        gameModel.addLeader("Noname", 200);

        view.clickEvent.on((btn) => {
            switch (btn) {
                case BUTTONS.CUP: 
                    view.showLeaders(gameModel.leaders); 
                    break;
                case BUTTONS.OK: 
                    view.showMain();
                    break;
                case BUTTONS.PLAY:
                    new SceneManager().changeScene(Scenes.GAME);
                    break;
            }
        })

        if (gameModel.State === STATES.GAME_OVER) {
            view.showRecord(gameModel.Score, gameModel.Dist);
            gameModel.State = STATES.MAIN_MENU;
            return;
        }

        view.showMain();
    }

    public onUpdate(dt: number): void {
        this._view.onUpdate(dt);
    }
}