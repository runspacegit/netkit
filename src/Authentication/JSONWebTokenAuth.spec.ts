import NetKit from ".."
import JSONWebTokenAuth from ".";

describe("JSONWebTokenAuth", () => {
    let netkit: NetKit;
    let secondNetkit: NetKit;
    let thirdNetkit: NetKit;

    test("Construct NetKit Class", () => {
        netkit = new NetKit({ name: "Testing", authentication: [new JSONWebTokenAuth("secret")] });
        expect(netkit).toBeTruthy();
        secondNetkit = new NetKit({ name: "Testing", authentication: [new JSONWebTokenAuth("secret")] });
        expect(secondNetkit).toBeTruthy();
        thirdNetkit = new NetKit({ name: "Testing", authentication: [new JSONWebTokenAuth("anotherSecret")] });
        expect(thirdNetkit).toBeTruthy();
    })

    test("Start Network", () => {
        expect(netkit.start).resolves;
        expect(secondNetkit.start).resolves;
        expect(thirdNetkit.start).resolves;
    })

    test("Reject Different Token Node", () => {
        const waitForNodeUnavailable = new Promise((_, reject) => netkit.net.onNodeUnavailable(reject));
        expect(waitForNodeUnavailable).rejects;
    })

    test("Send Receive Message", () => {
        const waitForTrueMessage = new Promise((resolve) => netkit.net.onMessage((message) => message.data === true ? resolve : false));
        secondNetkit.net.broadcast("waitForTrueMessage", true);
        expect(waitForTrueMessage).resolves;
    })

    test("Stop Network", () => {
        expect(netkit.stop).resolves;
        expect(secondNetkit.stop).resolves;
        expect(thirdNetkit.stop).resolves;
    })
})
