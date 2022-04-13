import { BaseScene } from '../core/base-scene';
import { SceneManager, Scenes } from '../core/scene-manager';
import { Animations, Bunny } from '../entities/bunny';

export class SceneIntro extends BaseScene {
    private sceneTime = 3;
    private _timer = 0;

    onStart(): void {
        const bunny = new Bunny(this);
        bunny.anim = Animations.FLY_IDLE;
    }

    onUpdate(dt: number): void {
        this._timer += 0.01 * dt;
        
        if (this._timer >= this.sceneTime) {
            this._timer = 0;
            new SceneManager().changeScene(Scenes.MAIN_MENU);
        }
    }
}