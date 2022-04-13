import { BaseScene } from '../core/base-scene';
import { Loader, Sprite } from 'pixi.js';
import { SceneManager, Scenes } from '../core/scene-manager';

export class SceneIntro extends BaseScene {
    private sceneTime = 5;
    private _timer = 0;

    onStart(): void {

    }

    onLoaded(loader: Loader): void {

    }

    onUpdate(dt: number): void {
        this._timer += 0.01 * dt;
        
        if (this._timer >= this.sceneTime) {
            this._timer = 0;
            new SceneManager().changeScene(Scenes.MAIN_MENU);
        }
    }
}