import { Event } from "../core/event";

export interface IGameUIView {
    onPausePressed: Event<void>;
    dist: number;
    score: number;
}