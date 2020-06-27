import { Message } from "ataraxia";

export interface Event extends Message {
    type: "event"
}

export type EventListener = (event: Event) => void;
