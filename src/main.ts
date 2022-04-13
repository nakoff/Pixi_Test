import { Application, } from 'pixi.js'
import { SceneManager, Scenes } from './scripts/core/scene-manager';
import { ResourceManager } from './scripts/core/resource-manager';

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

    const resourceManager = new ResourceManager();
    resourceManager.init(app, () => onStart());
})

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
