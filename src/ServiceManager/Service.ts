import { LocalServiceDef } from "ataraxia-services";

export class AbstractService {
    public readonly id!: string;

    public toAtaraxiaService(): LocalServiceDef {
        return {
            id: this.id
        };
    }
}

export default AbstractService;
