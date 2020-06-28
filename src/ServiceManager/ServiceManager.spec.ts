import { NetKit } from "..";
import { AnonymousAuth } from "ataraxia";
import { ServiceHandle } from "ataraxia-services";
import { ServiceManager } from "./ServiceManager";

export class Service {
    private handle: ServiceHandle;
    public readonly id = "sample";

    constructor(handle: ServiceHandle) {
        this.handle = handle;
    }

    hello() {
        return "hello"
    }
}

describe("ServiceManager", () => {
    let netkit: NetKit;
    let secondNetkit: NetKit;
    let serviceManager: ServiceManager;
    let secondServiceManager: ServiceManager;

    test("Construct NetKit Class", () => {
        netkit = new NetKit({ name: "Testing", authentication: [new AnonymousAuth()] });
        expect(netkit).toBeTruthy();
        secondNetkit = new NetKit({ name: "Testing", authentication: [new AnonymousAuth()] });
        expect(secondNetkit).toBeTruthy();
    })

    test("Construct ServiceManager Class", () => {
        serviceManager = new ServiceManager(netkit);
        expect(serviceManager).toBeTruthy();
        secondServiceManager = new ServiceManager(secondNetkit);
        expect(secondServiceManager).toBeTruthy();
    })

    test("Start Network", () => {
        expect(netkit.start).resolves;
        expect(secondNetkit.start).resolves;
    })

    test("Start Services", () => {
        expect(serviceManager.start).resolves;
        expect(secondServiceManager.start).resolves;
    })

    test("Register Service", () => {
        expect(serviceManager.register(Service)).toBeTruthy();
    })


    test("Test Service", async () => {
        const service = secondServiceManager.services.get('sample');
        if (service) {
            // @ts-ignore
            const reply = await service.hello();
            console.log(reply);
            expect(reply).toBe("hello");
        }
    })

    test("Stop Services", () => {
        expect(serviceManager.stop).resolves;
        expect(secondServiceManager.stop).resolves;
    })

    test("Stop Network", () => {
        expect(netkit.stop).resolves;
        expect(secondNetkit.stop).resolves;
    })
});