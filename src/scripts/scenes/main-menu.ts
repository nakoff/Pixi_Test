import { BaseScene } from '../core/base-scene';
import { MenuPres } from '../menu/pres';
import { MenuView } from '../menu/view';

export class SceneMainMenu extends BaseScene {
    private _menu: MenuPres;

    onStart(): void {
        const view = new MenuView(this);
        this._menu = new MenuPres(view);
    }

    onUpdate(dt: number): void {
        this._menu.onUpdate(dt);
    }
}