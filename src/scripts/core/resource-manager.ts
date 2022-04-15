import { Loader, Application, Sprite, Texture } from 'pixi.js';
import dragonBones from "pixi5-dragonbones";

enum ATLASES {
    ui_atlas = 'ui_atlas', buttons_atlas = 'buttons_atlas',
}

export enum BtnTextures {
    BTN_ARROW_ACTIVE = 'arrow_btn_active.png',
    BTN_ARROW_HOVER = "arrow_btn_hover.png",
    BTN_ARROW_PRESS = "arrow_btn_press.png",

    BTN_FULL_ACTIVE = 'btn_fullscreen_active.png',
    BTN_FULL_HOVER = 'btn_fullscreen_hover.png',
    BTN_FULL_PRESS = 'btn_fullscreen_press.png',

    BTN_PAUSE_ACTIVE = 'btn_pause_active.png',
    BTN_PAUSE_HOVER = 'btn_pause_hover.png',
    BTN_PAUSE_PRESS = 'btn_pause_press.png',

    BTN_SOUND0_ACTIVE = 'btn_sound0_active.png',
    BTN_SOUND0_HOVER = 'btn_sound0_hover.png',
    BTN_SOUND0_PRESS = 'btn_sound0_press.png',

    BTN_SOUND1_ACTIVE = 'btn_sound1_active.png',
    BTN_SOUND1_HOVER = 'btn_sound1_hover.png',
    BTN_SOUND1_PRESS = 'btn_sound1_press.png',

    BTN_CUP_ACTIVE = 'leadboard_button_active.png',
    BTN_CUP_HOVER = 'leadboard_button_hover.png',
    BTN_CUP_PRESS = 'leadboard_button_press.png',
 
    BTN_LOGIN_ACTIVE = 'login_button_active.png',
    BTN_LOGIN_HOVER = 'login_button_hover.png',
    BTN_LOGIN_PRESS = 'login_button_press.png',   
 
    BTN_OK_ACTIVE = 'ok_button_active.png',
    BTN_OK_HOVER = 'ok_button_hover.png',
    BTN_OK_PRESS = 'ok_button_press.png', 
 
    BTN_PLAY_ACTIVE = 'play_button_active.png',
    BTN_PLAY_HOVER = 'play_button_hover.png',
    BTN_PLAY_PRESS = 'play_button_press.png', 
}

export enum UITextures {
    PLATE = 'info_plate_big',
    RAYS = 'rays',
}

export enum DragonTextures {
    BUNNY = 'mi_bunny',
}

export enum GameTextures {
    STOPPER = 'stopper_idle',
    STOPPER_CRUSH = 'stopper_crush',
}

export class ResourceManager {
    private static _app: Application;
    private static _finished: () => void;
    private static _factories: Map<DragonTextures, dragonBones.PixiFactory>;

    public init(app: Application, onLoaded: () => void): void {
        ResourceManager._app = app;
        ResourceManager._finished = onLoaded;
        ResourceManager._factories = new Map<DragonTextures, dragonBones.PixiFactory>();

        Loader.shared
            //Load Bunny
            .add("bunny_sk", "assets/bunny/mi_bunny_ske.json")
            .add("bunny_json", "assets/bunny/mi_bunny_tex.json")
            .add(DragonTextures.BUNNY, "assets/bunny/mi_bunny_tex.png")

            //Load UI
            .add(ATLASES.ui_atlas, "assets/ui/ui_atlas.json")
            .add(ATLASES.buttons_atlas, "assets/ui/buttons.json")
            .add(UITextures.RAYS, "assets/ui/rays.png")
            .add(UITextures.PLATE, "assets/ui/info_plate_big.png")
            .add(GameTextures.STOPPER, "assets/stopper_idle.png")
            .add(GameTextures.STOPPER_CRUSH, "assets/stopper_crush.png")
            .load(this.loadFinished);
        
        Loader.shared
    }
    
    private loadFinished(loader: Loader, res: any): void {
        //Bunny
        const factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(res.bunny_sk.data);
        factory.parseTextureAtlasData(res.bunny_json.data, res[DragonTextures.BUNNY].texture);
        ResourceManager._factories.set(DragonTextures.BUNNY, factory);

        ResourceManager._finished();
    }

    public createDragonSprite(name: DragonTextures): dragonBones.PixiArmatureDisplay|undefined {
        const factory = ResourceManager._factories.get(name);
        if (factory) {
            const dSprite = factory.buildArmatureDisplay(name) as dragonBones.PixiArmatureDisplay;
            return dSprite;
        }
    }
}