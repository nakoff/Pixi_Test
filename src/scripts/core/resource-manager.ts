import { Loader, Application } from 'pixi.js';
import dragonBones from "pixi5-dragonbones";

export enum Sprites {
}

export enum DragonSprites {
    BUNNY = "mi_bunny",
}

export class ResourceManager {
    private static _app: Application;
    private static _finished: () => void;
    private static _factories: Map<DragonSprites, dragonBones.PixiFactory>;

    public init(app: Application, onLoaded: () => void): void {
        ResourceManager._app = app;
        ResourceManager._finished = onLoaded;
        ResourceManager._factories = new Map<DragonSprites, dragonBones.PixiFactory>();

        Loader.shared
            .add("skeleton", "assets/bunny/mi_bunny_ske.json")
            .add("texture_json", "assets/bunny/mi_bunny_tex.json")
            .add("texture_png", "assets/bunny/mi_bunny_tex.png")
            .load(this.onBunnyLoaded);
    }
    
    onBunnyLoaded(loader: Loader, res: any): void {
        const factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(res.skeleton.data);
        factory.parseTextureAtlasData(res.texture_json.data, res.texture_png.texture);
        ResourceManager._factories.set(DragonSprites.BUNNY, factory);

        ResourceManager._finished();
    }

    public createDragonSprite(name: DragonSprites): dragonBones.PixiArmatureDisplay|undefined {
        const factory = ResourceManager._factories.get(name);
        if (factory) {
            const dSprite = factory.buildArmatureDisplay(DragonSprites.BUNNY) as dragonBones.PixiArmatureDisplay;
            return dSprite;
        }
    }
}