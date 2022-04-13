import { Application, Container } from 'pixi.js';
import { BaseScene } from './base-scene';
import { SceneIntro } from '../scenes/intro';
import { SceneMainMenu } from '../scenes/main-menu';
import { SceneGame } from '../scenes/game';

export enum Scenes {
    INTRO, MAIN_MENU, GAME,
}

export class SceneManager {
    private static _app: Application;
    private static _curScene: BaseScene | null;
    private static _scenes = new Map<Scenes, BaseScene>();

    public init(app: Application): void {
        SceneManager._app = app;

        SceneManager._scenes.clear();
        this.addScene(Scenes.INTRO, new SceneIntro());
        this.addScene(Scenes.MAIN_MENU, new SceneMainMenu());
        this.addScene(Scenes.GAME, new SceneGame());
    }

    public changeScene(newScene: Scenes): string | undefined {
        const scene = SceneManager._scenes.get(newScene);
        if (!scene) {
            return `scene ${newScene} is not exists`;
        }

        if (SceneManager._curScene) {
            SceneManager._curScene.onDestroy();
            SceneManager._curScene.removeChildren();
        }

        SceneManager._curScene = scene;
        console.log(`Scene ${newScene} was started!`);
        scene.onStart();
    }

    public update(dt: number): void {
        SceneManager._curScene?.onUpdate(dt);
    }

    private addScene(key: Scenes, scene: BaseScene): void {
        SceneManager._scenes.set(key, scene);
        SceneManager._app.stage.addChild(scene);
        scene.x = SceneManager._app.screen.width / 2;
        scene.y = SceneManager._app.screen.height / 2;
    }
}