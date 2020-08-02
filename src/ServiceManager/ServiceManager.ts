import NetKit from "..";
import { Services, ServiceHandle, LocalServiceDef } from 'ataraxia-services';
import { AbstractService } from "./Service";

export class ServiceManager {
    private netkit: NetKit;
    public services: Services;

    constructor(netkit: NetKit) {
        this.netkit = netkit;
        this.services = new Services(this.netkit.net);
    }

    public register(service: LocalServiceDef): ServiceHandle {
        return this.services.register(service);
    }

    public registerNetkitService(service: AbstractService): ServiceHandle {
        return this.register(service.toAtaraxiaService());
    }

    public async start(): Promise<void> {
        await this.services.start();
    }

    public async stop(): Promise<void> {
        await this.services.stop();
    }
}

export default ServiceManager;
