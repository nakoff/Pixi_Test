import { IMenuView, BUTTONS } from './iview';
import { Container, Sprite, Text, Texture } from 'pixi.js';
import { BtnTextures, UITextures } from '../core/resource-manager';
import { Event } from '../core/event';

export class MenuView implements IMenuView {
    public clickEvent = new Event<BUTTONS>();

    private _scene: Container;
    private _plate: Sprite;

    public constructor(scene: Container) {
        this._scene = scene;

        this._plate = Sprite.from(UITextures.PLATE);
        this._plate.scale.set(0.5);
        this._plate.anchor.set(0.5);
        scene.addChild(this._plate);
    }

    public showMain(): void {
        this.main(this._plate);
    }

    public showLeaders(leaders: Map<string, number>): void {
        this.leaders(this._plate);

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
        this.createButton(btn, t_active, t_hover, t_press, BUTTONS.CUP);
        btn.y += 300;
        btn.x -= 180;
        parent.addChild(btn);

        //Play
        btn = Sprite.from(BtnTextures.BTN_PLAY_ACTIVE)
        t_active = Texture.from(BtnTextures.BTN_PLAY_ACTIVE);
        t_hover = Texture.from(BtnTextures.BTN_PLAY_HOVER);
        t_press = Texture.from(BtnTextures.BTN_PLAY_PRESS);
        this.createButton(btn, t_active, t_hover, t_press, BUTTONS.PLAY);
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

        //Play
        const btn = Sprite.from(BtnTextures.BTN_OK_ACTIVE)
        const t_active = Texture.from(BtnTextures.BTN_OK_ACTIVE);
        const t_hover = Texture.from(BtnTextures.BTN_OK_HOVER);
        const t_press = Texture.from(BtnTextures.BTN_OK_PRESS);
        this.createButton(btn, t_active, t_hover, t_press, BUTTONS.OK);
        btn.y += 350;
        parent.addChild(btn);
    }

    private createButton(btn: Sprite, active: Texture, hover: Texture, press: Texture, type?: BUTTONS): void {
        btn.anchor.set(0.5);
        btn.buttonMode = true;
        btn.interactive = true;

        btn.on('pointerdown', () => this.onBtnDown(btn, press))
            .on('pointerup', () => this.onBtnUp(btn, active, type))
            .on('pointerover', () => this.onBtnOver(btn, hover))
            .on('pointerout', () => this.onBtnOut(btn, active));
    }

    private onBtnDown(btn: Sprite, press: Texture): void {
        btn.texture = press;
    }

    private onBtnUp(btn: Sprite, up: Texture, type?: BUTTONS): void {
        btn.texture = up;
        if (type)
            this.clickEvent.trigger(type);
    }

    private onBtnOver(btn: Sprite, over: Texture): void {
        btn.texture = over;
    }

    private onBtnOut(btn: Sprite, active: Texture): void {
        btn.texture = active;
    }
}