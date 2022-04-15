import { Event } from "./event";

export class InputManager {
    private static readonly _onMouseEvent = new Event<MouseEvent>();
    private static readonly _onKeyEvent = new Event<KeyboardEvent>();

    public get mouseEvent(): Event<MouseEvent> {
        return InputManager._onMouseEvent;
    }

    public get keyboardEvent(): Event<KeyboardEvent> {
        return InputManager._onKeyEvent;
    }
}