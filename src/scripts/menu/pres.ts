import { IMenuView } from './iview';

export class MenuPres {
    private _view: IMenuView;

    public constructor(view: IMenuView) {
        this._view = view;
    }

    public onUpdate(dt: number): void {
    }
}