import { IMenuView } from './iview';
import { Container, Sprite, Text, Texture } from 'pixi.js';
import { BtnTextures, ResourceManager, UITextures } from '../core/resource-manager';

export class MenuView implements IMenuView {
    private _scene: Container;

    public constructor(scene: Container) {
        this._scene = scene;

        const plate = Sprite.from(UITextures.PLATE);
        plate.scale.set(0.5);
        plate.anchor.set(0.5);
        scene.addChild(plate);

        this.main(plate);
    }

    private main(parent: Container): void {
        parent.removeChildren();

        const score = new Text("Best Score:");
        score.y -= 250;
        score.scale.set(1.9);
        score.anchor.set(0.5);
        parent.addChild(score);

        //Header
        const header = Sprite.from('header_info_plate.png');
        header.anchor.set(0.5);
        header.y -= 405;
        parent.addChild(header);

        const txt_header = new Text("YOU RECORDS:")
        txt_header.anchor.set(0.5);
        header.addChild(txt_header);

        //Name input
        const input = Sprite.from('user_name_bar.png');
        input.anchor.set(0.5);
        // input.scale.set(0.5);
        input.y += 100;
        parent.addChild(input);

        //Login
        let btn = Sprite.from(BtnTextures.BTN_LOGIN_ACTIVE)
        let t_active = Texture.from(BtnTextures.BTN_LOGIN_ACTIVE);
        let t_hover = Texture.from(BtnTextures.BTN_LOGIN_HOVER);
        let t_press = Texture.from(BtnTextures.BTN_LOGIN_PRESS);
        this.createButton(btn, t_active, t_hover, t_press);
        btn.y -= 50;
        parent.addChild(btn);

        //Cup
        btn = Sprite.from(BtnTextures.BTN_CUP_ACTIVE)
        t_active = Texture.from(BtnTextures.BTN_CUP_ACTIVE);
        t_hover = Texture.from(BtnTextures.BTN_CUP_HOVER);
        t_press = Texture.from(BtnTextures.BTN_CUP_PRESS);
        this.createButton(btn, t_active, t_hover, t_press);
        btn.y += 300;
        btn.x -= 180;
        parent.addChild(btn);

        //Play
        btn = Sprite.from(BtnTextures.BTN_PLAY_ACTIVE)
        t_active = Texture.from(BtnTextures.BTN_PLAY_ACTIVE);
        t_hover = Texture.from(BtnTextures.BTN_PLAY_HOVER);
        t_press = Texture.from(BtnTextures.BTN_PLAY_PRESS);
        this.createButton(btn, t_active, t_hover, t_press);
        btn.y += 300;
        btn.x += 180;
        parent.addChild(btn);
    }

    private leaders(parent: Container): void {
        parent.removeChildren();

        //Header
        const header = Sprite.from('header_info_plate.png');
        header.anchor.set(0.5);
        header.y -= 405;
        parent.addChild(header);

        const txt_header = new Text("LEADERBOARD:")
        txt_header.anchor.set(0.5);
        header.addChild(txt_header);
    }

    private createButton(btn: Sprite, active: Texture, hover: Texture, press: Texture): void {
        btn.anchor.set(0.5);
        // btn.scale.set(0.5);
        btn.buttonMode = true;
        btn.interactive = true;

        btn.on('pointerdown', () => this.onBtnDown(btn, press))
            .on('pointerup', () => this.onBtnUp(btn, active))
            .on('pointerover', () => this.onBtnOver(btn, hover))
            .on('pointerout', () => this.onBtnOut(btn, active));
            // .on('pointerupoutside', this.onButtonUp)
    }

    private onBtnDown(btn: Sprite, press: Texture): void {
        btn.texture = press;
    }

    private onBtnUp(btn: Sprite, up: Texture): void {
        btn.texture = up;
    }

    private onBtnOver(btn: Sprite, over: Texture): void {
        btn.texture = over;
    }

    private onBtnOut(btn: Sprite, active: Texture): void {
        btn.texture = active;
    }
}