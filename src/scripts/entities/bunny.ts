import { ResourceManager, UITextures, DragonTextures } from '../core/resource-manager';
import dragonBones from 'pixi5-dragonbones';
import { Container, Sprite } from 'pixi.js';

export enum Animations {
    FLY_IDLE = "bunny_fly_idle",
    FLY_START = "bunny_fly_start",
    FLY_FALL_START = "bunny_fly_fall_start",
    FLY_FALL_LOOP = "bunny_fly_fall_loop",
    FLY_LAND_SLIDE = "bunny_land_slide",
    FLY_LOSE = "bunny_lose",
}

export class Bunny {
    private _armature: dragonBones.PixiArmatureDisplay;
    private _curAnim: Animations;
    private _sprite: Sprite;

    public constructor(scene: Container) {
        const rm = new ResourceManager();
        const dSprite = rm.createDragonSprite(DragonTextures.BUNNY);
        if (!dSprite) return;

        this._armature = dSprite;
        this._sprite = this._armature as unknown as Sprite;

        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);

        scene.addChild(this.sprite);
        this.anim = Animations.FLY_LAND_SLIDE;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public set anim(value: Animations) {
        this._curAnim = value;
        this._armature.animation.play(value);
    }

    public get anim(): Animations {
        return this._curAnim;
    }
}