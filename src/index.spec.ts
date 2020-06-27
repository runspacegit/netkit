import NetKit from "."
import { AnonymousAuth } from "ataraxia";

describe("NetKit", () => {
    let netkit: NetKit;
    test("Construct NetKit Class", () => {
        netkit = new NetKit({ name: "Testing", authentication: [new AnonymousAuth()] });
        expect(netkit).toBeTruthy();
    })

    test("Start Network", () => {
        expect(netkit.start).resolves;
    })

    test("Stop Network", () => {
        expect(netkit.stop).resolves;
    })
})
