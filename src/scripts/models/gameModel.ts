import { GameObject, DataBase } from './db';

export class GameModel {
    private _obj: GameObject;

    public constructor() {
        const db = new DataBase();
        this._obj = db.GameObj;
    }

    public addLeader(name: string, score: number): void {
        this._obj.leaders.set(name, score);
    }

    public get leaders(): Map<string, number> {
        const map = new Map<string, number>();
        for (const [k, v] of this._obj.leaders) {
            map.set(k, v);
        }
        return map;
    }
}