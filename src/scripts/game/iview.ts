import { Event } from '../core/event';

export interface IGameView {
    onObstacleCollided: Event<number>;
    onUpdate(): void;
    gameOver(id: number): void;
    createObstacle(id: number, x: number, y: number): void;
    getObstaclePos(id: number): {x: number, y: number};
    setObstaclePos(id: number, x: number, y: number): void;
    playerOnGround: boolean;
    playerPos: {x: number, y: number};
}