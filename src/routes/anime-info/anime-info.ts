import { IRouteableComponent, IRouter } from "@aurelia/router";
import { inject } from "aurelia";
import { ApiService } from "../../services/api-service";
import { animeEpisodesSchema, animeInfoSchema } from "../../interfaces/animeSchemas";

@inject(ApiService, IRouter)
export class AnimeInfo implements IRouteableComponent {
    public anime: animeInfoSchema[] = [];
    public animeEpisodes: animeEpisodesSchema[] = [];
    constructor(private api: ApiService, private router: IRouter) { }

    public async load(parameters: { id: string }): Promise<void> {
        if (parameters.id) {
            const data = await this.api.getAnimeInfo(parameters.id);
            this.anime = data;
        }
    }


    public async watchNow() {
        this.animeEpisodes = this.anime['episodes'][0].id;
        await this.router.load(`/episode-view/${this.animeEpisodes}`);
    }
}
