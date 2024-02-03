import { IRouteableComponent } from "@aurelia/router";
import { ApiService } from "../../services/api-service";
import { inject } from "aurelia";
import { animeStreamSchema } from "../../interfaces/animeSchemas";
@inject(ApiService)
export class EpisodeView implements IRouteableComponent {
    public id: string = '';
    public streamData: animeStreamSchema[] = [];

    constructor(private api: ApiService) { }

    public async load(parameters: { id: string }): Promise<void> {
        if (parameters.id) {
            this.id = parameters.id;
        }
    }

    public async binding(): Promise<void> {
        const dataServer = await this.api.getEpisodeSource(this.id);
        console.log(dataServer);
    }
}