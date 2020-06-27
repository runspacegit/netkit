import NetKit from "..";
import { EventEmitter } from "events";
import { Message } from "ataraxia";
import { Event, EventListener } from "./EventBus.interfaces";

export class EventBus extends EventEmitter {
    private netkit: NetKit;

    constructor(netkit: NetKit) {
        super();
        this.netkit = netkit;
        this.bootstrap();
    }

    private bootstrap(): void {
        const { emit } = this;
        this.netkit.net.onMessage((message: Message) => {
            if (message.type === "event") emit("event", message);
        });
    }

    public onEventOnce(): Promise<Event> {
        return new Promise(resolve => this.on("event", resolve));
    }

    public subscribe(listener: EventListener): void {
        this.on("event", listener);
    }
}

export default EventBus;
