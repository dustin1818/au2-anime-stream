import { IRouteableComponent, IRouter } from "@aurelia/router";
import { ApiService } from "../../services/api-service";
import { bindable, inject } from "aurelia";
import { animeEpisodesSchema } from "../../interfaces/animeSchemas";

@inject(ApiService, IRouter)
export class ButtonEpisode implements IRouteableComponent {
    public animeEpisodes: animeEpisodesSchema[] = [];
    @bindable public paramId: string = '';
    public totalEpisodes = 0;

    constructor(private api: ApiService, private router: IRouter) { }

    async binding() {
        const data = this.paramId;
        this.animeEpisodes = data['episodes'];
        this.totalEpisodes = data['totalEpisodes'];
        console.log(data);
    }

    public async getEpisodeDetails(episode: number) {
        await this.router.load(`/episode-view/${this.animeEpisodes[episode - 1].id}`)

    }

}