import { BaseScene } from '../core/base-scene';
import { ResourceManager, Sprites } from '../core/resource-manager';

export class SceneMainMenu extends BaseScene {

    onStart(): void {
        const rm = new ResourceManager();
        const sp = rm.createSprite(Sprites.PLATE);
        sp.scale.set(0.5);
        sp.anchor.set(0.5);
        this.addChild(sp);
    }
}