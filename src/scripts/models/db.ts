import { Event } from "../core/event";

export class DataBase {
    private static _gameObj: GameObject

    public get GameObj(): GameObject {
        return DataBase._gameObj;
    }

    public init(): void {
        DataBase._gameObj = new GameObject();
    }
}

export class GameObject {
    public updateEvent = new Event<void>();

    // <name, score>
    public leaders = new Map<string, number>();
    public state: number;
    public score: number;
    public dist: number;
}