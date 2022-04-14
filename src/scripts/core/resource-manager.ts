import { Loader, Application, Sprite, Texture } from 'pixi.js';
import dragonBones from "pixi5-dragonbones";

enum ATLASES {
    ui_atlas = 'ui_atlas', buttons_atlas = 'buttons_atlas',
}

export enum Sprites {
    BUNNY = 'mi_bunny',
    PLATE = 'info_plate_big',
    RAYS = 'rays',

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

    BTN_CUP_ACTIVE = 'btn_leadboard_button_active.png',
    BTN_CUP_HOVER = 'btn_leadboard_button_hover.png',
    BTN_CUP_PRESS = 'btn_leadboard_button_press.png',
 
    BTN_LOGIN_ACTIVE = 'btn_login_button_active.png',
    BTN_LOGIN_HOVER = 'btn_login_button_hover.png',
    BTN_LOGIN_PRESS = 'btn_login_button_press.png',   
 
    BTN_OK_ACTIVE = 'btn_ok_button_active.png',
    BTN_OK_HOVER = 'btn_ok_button_hover.png',
    BTN_OK_PRESS = 'btn_ok_button_press.png', 
 
    BTN_PLAY_ACTIVE = 'btn_play_button_active.png',
    BTN_PLAY_HOVER = 'btn_play_button_hover.png',
    BTN_PLAY_PRESS = 'btn_play_button_press.png', 
}

export class ResourceManager {
    private static _app: Application;
    private static _finished: () => void;
    private static _factories: Map<Sprites, dragonBones.PixiFactory>;
    private static _res: Map<string, any>;

    public init(app: Application, onLoaded: () => void): void {
        ResourceManager._app = app;
        ResourceManager._finished = onLoaded;
        ResourceManager._factories = new Map<Sprites, dragonBones.PixiFactory>();
        ResourceManager._res = new Map<string, any>();

        Loader.shared
            //Load Bunny
            .add("bunny_sk", "assets/bunny/mi_bunny_ske.json")
            .add("bunny_json", "assets/bunny/mi_bunny_tex.json")
            .add(Sprites.BUNNY, "assets/bunny/mi_bunny_tex.png")

            //Load UI
            .add(ATLASES.ui_atlas, "assets/ui/ui_atlas.json")
            .add(ATLASES.buttons_atlas, "assets/ui/buttons.json")
            .add(Sprites.RAYS, "assets/ui/rays.png")
            .add(Sprites.PLATE, "assets/ui/info_plate_big.png")
            .load(this.loadFinished);
        
        Loader.shared
    }
    
    private loadFinished(loader: Loader, res: any): void {
        // ResourceManager._res = res;

        //Bunny
        const factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(res.bunny_sk.data);
        factory.parseTextureAtlasData(res.bunny_json.data, res[Sprites.BUNNY].texture);
        ResourceManager._factories.set(Sprites.BUNNY, factory);
        ResourceManager.saveRes(Sprites.BUNNY, res[Sprites.BUNNY].texture);

        ResourceManager.saveRes(Sprites.RAYS, res[Sprites.RAYS].texture);
        ResourceManager.saveRes(Sprites.PLATE, res[Sprites.PLATE].texture);

        //Atlases
        for (const key in ATLASES) {
            const textures = res[key].textures;
            const val = Object.keys(textures);
            for (const k of val) {
                ResourceManager.saveRes(k, textures[k]);
            }
        }

        ResourceManager._finished();
    }

    public createDragonSprite(name: Sprites): dragonBones.PixiArmatureDisplay|undefined {
        const factory = ResourceManager._factories.get(name);
        if (factory) {
            const dSprite = factory.buildArmatureDisplay(Sprites.BUNNY) as dragonBones.PixiArmatureDisplay;
            return dSprite;
        }
    }

    public createSprite(name: Sprites): Sprite {
        return Sprite.from(ResourceManager._res.get(name));
    }

    private static saveRes(name: string, res: any): void {
        ResourceManager._res.set(name, res);
    }
}