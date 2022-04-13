import { Container } from 'pixi.js'

export abstract class BaseScene extends Container {
    onStart() {};
    onUpdate(dt: number) {};
    onDestroy() {};
}