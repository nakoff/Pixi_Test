import { BUTTONS, IMenuView } from './iview';
import { GameModel } from '../models/gameModel';
import { SceneManager, Scenes } from '../core/scene-manager';

export class MenuPres {
    private _view: IMenuView;

    public constructor(view: IMenuView) {
        this._view = view;
        const gameModel = new GameModel();

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

        view.showMain();
        // view.showRecord(100, 200);
    }

    public onUpdate(dt: number): void {
        this._view.onUpdate(dt);
    }
}