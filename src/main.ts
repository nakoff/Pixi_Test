import { Application, Loader, LoaderResource, Resource, Sprite } from 'pixi.js'
import dragonBones from 'pixi5-dragonbones';
import { SceneManager, Scenes } from './scripts/core/scene-manager';
import * as PIXI from "pixi.js";

// window.PIXI = PIXI;

const app = new Application({
    view: document.getElementById("scene") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: 800,
    height: 480
});

document.addEventListener("DOMContentLoaded", (e) => {
    document.body.appendChild(app.view);

    Loader.shared
        .add("skeleton", "assets/bunny/mi_bunny_ske.json")
        .add("texture_json", "assets/bunny/mi_bunny_tex.json")
        .add("texture_png", "assets/bunny/mi_bunny_tex.png")
        .load(onLoaded);

})

function onLoaded(loader: Loader, res: any): void {

    const factory = dragonBones.PixiFactory.factory;
    factory.parseDragonBonesData(res.skeleton.data);
    factory.parseTextureAtlasData(res.texture_json.data, res.texture_png.texture);
    console.log("RES: ",factory);

    onStart();
}

function onStart(): void {
    const sceneManager = new SceneManager();
    sceneManager.init(app);
    const err = sceneManager.changeScene(Scenes.INTRO);
    if (err) {
        console.log("ERR: ", err);
    }

    app.render();

    app.ticker.add((delta) => {
        sceneManager.update(delta);
    });
}
