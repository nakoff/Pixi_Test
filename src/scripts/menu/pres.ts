import { BUTTONS, IMenuView } from './iview';
import { GameModel } from '../models/gameModel';

export class MenuPres {

    public constructor(view: IMenuView) {
        const gameModel = new GameModel();

        view.clickEvent.on((btn) => {
            switch (btn) {
                case BUTTONS.CUP: 
                    view.showLeaders(gameModel.leaders); 
                    break;
                case BUTTONS.OK: 
                    view.showMain();
                    break;
            }
        })

        view.showMain();
    }

    public onUpdate(dt: number): void {
    }
}