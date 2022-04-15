import { Event } from '../core/event';

export enum BUTTONS {
    PLAY = 1, CUP, OK,
}

export interface IMenuView {
    clickEvent: Event<BUTTONS>;
    onUpdate(dt: number): void;
    showMain(): void;
    showLeaders(leaders: Map<string, number>): void;
    showRecord(score: number, dist: number): void;
}