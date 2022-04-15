import { IMenuView, BUTTONS } from './iview';
import { Container, Sprite, Text, Texture } from 'pixi.js';
import { BtnTextures, UITextures } from '../core/resource-manager';
import { Event } from '../core/event';
import { Button } from '../core/button';

export class MenuView implements IMenuView {
    public clickEvent = new Event<BUTTONS>();

    private _scene: Container;
    private _plate: Sprite;
    private _txtHeader: Text;
    private _rays: Sprite | null;

    public constructor(scene: Container) {
        this._scene = scene;

        this._plate = Sprite.from(UITextures.PLATE);
        this._plate.scale.set(0.5);
        this._plate.anchor.set(0.5);
        scene.addChild(this._plate);

        //Header
        const header = Sprite.from('header_info_plate.png');
        header.anchor.set(0.5);
        header.scale.set(0.5);
        header.y -= 205;
        scene.addChild(header);

        //Text header
        const txt_header = new Text("HEADER");
        txt_header.scale.set(2);
        txt_header.anchor.set(0.5);
        header.addChild(txt_header);
        this._txtHeader = txt_header;
    }

    public onUpdate(dt: number): void {
        if (this._rays) {
            this._rays.rotation += dt * 0.01;
        }
    }

    public showMain(): void {
        if (this._rays) {
            this._rays.destroy();
            this._rays = null;
        }

        this._plate.removeChildren();
        this._txtHeader.text = 'You records:'

        const score = new Text("Best Score:");
        score.y -= 250;
        score.scale.set(1.9);
        score.anchor.set(0.5);
        this._plate.addChild(score);

        //Name input
        const input = Sprite.from('user_name_bar.png');
        input.anchor.set(0.5);
        input.y += 100;
        this._plate.addChild(input);

        //Login
        let t_active = Texture.from(BtnTextures.BTN_LOGIN_ACTIVE);
        let t_hover = Texture.from(BtnTextures.BTN_LOGIN_HOVER);
        let t_press = Texture.from(BtnTextures.BTN_LOGIN_PRESS);
        let btn = new Button(t_active);
        btn.hoverTexture = t_hover;
        btn.pressTexture = t_press;
        btn.y -= 50;
        this._plate.addChild(btn);

        //Cup
        t_active = Texture.from(BtnTextures.BTN_CUP_ACTIVE);
        t_hover = Texture.from(BtnTextures.BTN_CUP_HOVER);
        t_press = Texture.from(BtnTextures.BTN_CUP_PRESS);
        btn = new Button(t_active);
        btn.hoverTexture = t_hover;
        btn.pressTexture = t_press;
        btn.onReleaseddEvent.on((b) => this.onButtonPressed(BUTTONS.CUP));
        btn.y += 300;
        btn.x -= 180;
        this._plate.addChild(btn);

        //Play
        t_active = Texture.from(BtnTextures.BTN_PLAY_ACTIVE);
        t_hover = Texture.from(BtnTextures.BTN_PLAY_HOVER);
        t_press = Texture.from(BtnTextures.BTN_PLAY_PRESS);
        btn = new Button(t_active);
        btn.hoverTexture = t_hover;
        btn.pressTexture = t_press;
        btn.onReleaseddEvent.on((b) => this.onButtonPressed(BUTTONS.PLAY));
        btn.y += 300;
        btn.x += 180;
        this._plate.addChild(btn);
    }

    public showLeaders(leaders: Map<string, number>): void {
        if (this._rays) {
            this._rays.destroy();
            this._rays = null;
        }

        this._plate.removeChildren();
        this._txtHeader.text = 'Leaderbord:'

        //Leaders
        let k = 0;
        const yOffset = -200;
        for (const [name, score] of leaders) {
            const sp = Sprite.from('midleader_name_plate.png');
            sp.y += yOffset + 50 * k;
            sp.x -= 70;
            sp.anchor.set(0.5);
            this._plate.addChild(sp);

            const score_plate = Sprite.from('midleader_scores_plate.png');
            score_plate.anchor.set(0.5);
            score_plate.x += 320;
            sp.addChild(score_plate);

            k++;
            const text = new Text(k.toString());
            text.anchor.set(0.5);
            text.x -= 230;
            sp.addChild(text);

            const txtName = new Text(name);
            txtName.anchor.set(0, 0.5);
            txtName.x -= 200;
            sp.addChild(txtName);

            const txtScore = new Text(score.toString());
            txtScore.anchor.set(0.5);
            score_plate.addChild(txtScore);
        }

        //Ok
        const t_active = Texture.from(BtnTextures.BTN_OK_ACTIVE);
        const t_hover = Texture.from(BtnTextures.BTN_OK_HOVER);
        const t_press = Texture.from(BtnTextures.BTN_OK_PRESS);
        const btn = new Button(t_active);
        btn.hoverTexture = t_hover;
        btn.pressTexture = t_press;
        btn.onReleaseddEvent.on((b) => this.onButtonPressed(BUTTONS.OK));
        btn.y += 350;
        this._plate.addChild(btn);
    }

    public showRecord(score: number, dist: number): void {
        this._plate.removeChildren();
        this._txtHeader.text = 'New Record:'

        //Rays
        const rays = Sprite.from(UITextures.RAYS);
        rays.anchor.set(0.5);
        rays.scale.set(0.5);
        this._scene.addChild(rays);
        this._scene.setChildIndex(rays, 0);
        this._rays = rays;

        //Text Score
        const txt_score = new Text(score.toString());
        txt_score.y -= 250;
        txt_score.scale.set(3.9);
        txt_score.anchor.set(0.5);
        this._plate.addChild(txt_score);

        //Ok
        // const btn = Sprite.from(BtnTextures.BTN_OK_ACTIVE)
        const t_active = Texture.from(BtnTextures.BTN_OK_ACTIVE);
        const t_hover = Texture.from(BtnTextures.BTN_OK_HOVER);
        const t_press = Texture.from(BtnTextures.BTN_OK_PRESS);
        const btn = new Button(t_active);
        btn.hoverTexture = t_hover;
        btn.pressTexture = t_press;
        btn.onReleaseddEvent.on((b) => this.onButtonPressed(BUTTONS.OK));
        btn.y += 350;
        this._plate.addChild(btn);
    }

    private onButtonPressed(btn: BUTTONS): void {
        this.clickEvent.trigger(btn);
    }
}