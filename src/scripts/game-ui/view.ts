import { Event } from '../core/event';
import { IGameUIView } from './iview';
import { Container, Text, Sprite, Texture, BaseTexture } from 'pixi.js';
import { Button } from '../core/button';
import { BtnTextures } from '../core/resource-manager';

export class GameUIView implements IGameUIView {
    public readonly onPausePressed = new Event<void>();

    private _scene: Container;
    private _btnPause: Button;
    private _txtScore: Text;
    private _txtDist: Text;

    public constructor(scene: Container) {
        this._scene = scene;

        //Score view
        const coinPlate = Sprite.from('coin_score_plate.png');
        coinPlate.anchor.set(0.5);
        coinPlate.scale.set(0.7);
        coinPlate.x = -400;
        coinPlate.y = -200;
        this._scene.addChild(coinPlate);

        const coin = Sprite.from('collect_coin_icon.png');
        coin.anchor.set(0.5);
        coin.x = -100;
        coinPlate.addChild(coin);

        this._txtScore = new Text('0');
        this._txtScore.anchor.set(0.5);
        coinPlate.addChild(this._txtScore);

        //Dist view
        const distPlate = Sprite.from('coin_score_plate.png');
        distPlate.anchor.set(0.5);
        distPlate.scale.set(0.7);
        distPlate.x = -200;
        distPlate.y = -200;
        this._scene.addChild(distPlate);

        const dist = Sprite.from('collect_distance_icon.png');
        dist.anchor.set(0.5);
        dist.x = -100;
        distPlate.addChild(dist);

        this._txtDist = new Text('0');
        this._txtDist.anchor.set(0.5);
        distPlate.addChild(this._txtDist);

        //Pause button
        const t_norm = Texture.from(BtnTextures.BTN_PAUSE_ACTIVE);
        const t_hover = Texture.from(BtnTextures.BTN_PAUSE_HOVER);
        const t_press = Texture.from(BtnTextures.BTN_PAUSE_PRESS);
        this._btnPause = new Button(t_norm);
        this._btnPause.hoverTexture = t_hover;
        this._btnPause.pressTexture = t_press;
        this._btnPause.x = 400;
        this._btnPause.y = -200;
        this._btnPause.scale.set(0.7);
        this._btnPause.onReleaseddEvent.on((btn) => this.onPausePressed.trigger());
        this._scene.addChild(this._btnPause);
    }

    public set score(val: number) {
        this._txtScore.text = val.toString();
    }

    public set dist(val: number) {
        this._txtDist.text = val.toString();
    }
}