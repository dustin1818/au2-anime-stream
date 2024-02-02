import { IRouteableComponent } from "@aurelia/router";
import { inject } from "aurelia";
import { ApiService } from "../../services/api-service";
import { animeInfoSchema } from "../../interfaces/animeSchemas";


@inject(ApiService)
export class AnimeInfo implements IRouteableComponent {
    public anime: animeInfoSchema[] = [];

    constructor(private api: ApiService) { }

    public async load(parameters: { id: string }): Promise<void> {
        if (parameters.id) {
            const data = await this.api.getAnimeInfo(parameters.id)
            this.anime = data['anime'].info;
            console.log(this.anime)
        }
    }


}
