import { ServiceHandle } from "ataraxia-services";

export class Service {
    private handle: ServiceHandle;
    public readonly id = "serviceid";

    constructor(handle: ServiceHandle) {
        this.handle = handle;
    }
}

export default Service;
