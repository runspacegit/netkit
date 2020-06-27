import { NetKit } from ".."
import { AnonymousAuth } from "ataraxia";
import { EventBus } from ".";

describe("EventBus", () => {
    let netkit: NetKit;
    let eventbus: EventBus;
    let secondNetkit: NetKit;
    let secondEventbus: EventBus;

    test("Construct NetKit Class", () => {
        netkit = new NetKit({ name: "Testing", authentication: [new AnonymousAuth()] });
        secondNetkit = new NetKit({ name: "Testing", authentication: [new AnonymousAuth()] });
        expect(netkit).toBeTruthy();
        expect(secondNetkit).toBeTruthy();
    })
    test("Construct EventBus Class", () => {
        eventbus = new EventBus(netkit);
        secondEventbus = new EventBus(secondNetkit);
        expect(eventbus).toBeTruthy();
        expect(secondEventbus).toBeTruthy();
    })

    test("Start Network", () => {
        expect(netkit.start).resolves;
        expect(secondNetkit.start).resolves;
    })

    test("Evmit and Receive Event without NetKit", async () => {
        eventbus.emit("event", true);
        expect(eventbus.onEventOnce).resolves;
    })

    test("Send and Receive Event over NetKit", async () => {
        netkit.net.broadcast("event", true);
        expect(secondEventbus.onEventOnce).resolves;
    })

    test("Stop Network", () => {
        expect(netkit.stop).resolves;
        expect(secondNetkit.stop).resolves;
    })
})
