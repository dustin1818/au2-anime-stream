import { ICustomElementViewModel, inject } from "aurelia";
import { bindable } from "aurelia";
import { animeServerSchema } from "../../interfaces/animeSchemas";
import { ApiService } from "../../services/api-service";

@inject(ApiService)
export class ButtonServers implements ICustomElementViewModel {
    @bindable public paramId: string = '';
    public servers: animeServerSchema[] = [];

    constructor(private api: ApiService) { }

    public async binding(): Promise<void> {
        this.servers = await this.api.getAnimeServer(this.paramId);
        console.log(this.servers)
    }

    public async getServerSource(server: string) {
        this.api.getEpisodeSource(this.paramId, server)
    }
} 