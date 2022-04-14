import { Event } from '../core/event';

export enum BUTTONS {
    PLAY = 1, CUP, OK,
}

export interface IMenuView {
    clickEvent: Event<BUTTONS>;
    showMain(): void;
    showLeaders(leaders: Map<string, number>): void;
}