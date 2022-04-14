
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
    // <name, score>
    public leaders = new Map<string, number>([
        ["Name1", 292],
        ["Aninim", 332],
        ["SomeBody", 100],
        ["ThisIsMan", 593],
    ]);
}