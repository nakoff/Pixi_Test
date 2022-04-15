import { Event } from '../core/event';
import { GameObject, DataBase } from './db';

export enum STATES {
    MAIN_MENU, GAMEPLAY, GAME_OVER, PAUSED,
}

export class GameModel {
    private _obj: GameObject;
    private updateEvent = new Event<void>();

    public constructor() {
        const db = new DataBase();
        this._obj = db.GameObj;
    }

    public subscribe(listener: ()=> void): void {
        this._obj.updateEvent.on(() => this.onDataChanged());
        this.updateEvent.on(listener)
    }

    public unSubscribe(): void {
        this._obj.updateEvent.off(() => this.onDataChanged());
    }

    private onDataChanged(): void {
        this.updateEvent.trigger();
    }

    public addLeader(name: string, score: number): void {
        this._obj.leaders.set(name, score);
        this._obj.updateEvent.trigger();
    }

    public get leaders(): Map<string, number> {
        const map = new Map<string, number>();
        for (const [k, v] of this._obj.leaders) {
            map.set(k, v);
        }
        return map;
    }

    public get State(): STATES {
        return this._obj.state;
    }

    public set State(state: STATES) {
        this._obj.state = state;
        this._obj.updateEvent.trigger();
    }

    public get Score(): number {
        return this._obj.score;
    }

    public set Score(score: number) {
        this._obj.score = score;
        this._obj.updateEvent.trigger();
    }

    public set Dist(dist: number) {
        this._obj.dist = dist;
        this._obj.updateEvent.trigger();
    }

    public get Dist(): number {
        return this._obj.dist;
    }
}