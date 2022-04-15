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
    private _isAnimLoop: boolean;

    public constructor(scene: Container) {
        const rm = new ResourceManager();
        const dSprite = rm.createDragonSprite(DragonTextures.BUNNY);
        if (!dSprite) return;

        dSprite.addDBEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.onAnimLoopComplete, this);
        this._armature = dSprite;
        this._sprite = this._armature as unknown as Sprite;

        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);

        scene.addChild(this.sprite);
    }

    public get position(): {x: number, y: number} {
        return {x: this.sprite.x, y: this.sprite.y};
    }

    public set position(val: {x: number, y: number}) {
        this.sprite.position.set(val.x, val.y);
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public get anim(): Animations {
        return this._curAnim;
    }

    public playAnim(anim: Animations, loop: boolean): void {
        this._curAnim = anim;
        this._isAnimLoop = loop;
        this._armature.animation.play(anim);
    }

    private onAnimLoopComplete(e: dragonBones.EventObject): void {
        if (!this._isAnimLoop || !this._sprite.parent) {
            e.animationState.stop();
            e.animationState.currentTime = 1;
        }
    }
}