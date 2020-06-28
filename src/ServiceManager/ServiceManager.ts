import NetKit from "..";
import { Services, ServiceHandle } from 'ataraxia-services';
import Service from "./Service";

export class ServiceManager {
    private netkit: NetKit;
    public services: Services;

    constructor(netkit: NetKit) {
        this.netkit = netkit;
        this.services = new Services(this.netkit.net);
    }

    public register(service: Service): ServiceHandle {
        return this.services.register(service);
    }

    public async start(): Promise<void> {
        await this.services.start();
    }

    public async stop(): Promise<void> {
        await this.services.stop();
    }
}

export default ServiceManager;
