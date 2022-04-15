import { Sprite, Texture } from 'pixi.js';
import { Event } from '../core/event';

export class Button extends Sprite {
    public readonly onPressedEvent = new Event<this>();
    public readonly onReleaseddEvent = new Event<this>();

    public hoverTexture: Texture;
    public pressTexture: Texture;
    private normalTexture: Texture;

    public constructor(texture: Texture) {
        super();

        this.normalTexture = texture;
        this.texture = texture;
        this.anchor.set(0.5);
        this.buttonMode = true;
        this.interactive = true;

        this.on('pointerdown', this.onBtnDown)
            .on('pointerup', this.onBtnUp)
            .on('pointerover', this.onBtnOver)
            .on('pointerout', this.onBtnOut);
    }

    private onBtnDown(): void {
        if (this.pressTexture) this.texture = this.pressTexture;
        this.onPressedEvent.trigger(this);
    }

    private onBtnUp(): void {
        this.texture = this.normalTexture;
        this.onReleaseddEvent.trigger(this);
    }

    private onBtnOver(btn: Sprite, over: Texture): void {
        if (this.pressTexture) this.texture = this.hoverTexture;
    }

    private onBtnOut(btn: Sprite, active: Texture): void {
        this.texture = this.normalTexture;
    }
}