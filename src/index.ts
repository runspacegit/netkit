import { Network } from "ataraxia";
import { NetKitConfiguration } from "./index.interfaces";

export class NetKit {
    public net: Network;
    constructor({ authentication, endpoint, name }: NetKitConfiguration) {
        this.net = new Network({
            name: name ? name : "runspace",
            authentication,
            endpoint
        });
    }

    public async start(): Promise<void> {
        await this.startNetwork();
    }

    public async stop(): Promise<void> {
        await this.stopNetwork();
    }

    private async startNetwork(): Promise<void> {
        await this.net.start();
    }

    private async stopNetwork(): Promise<void> {
        await this.net.stop();
    }
}

export default NetKit;
