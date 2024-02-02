import { IRouteableComponent, IRouter } from "@aurelia/router";
import { ApiService } from "../../services/api-service";
import { bindable, inject } from "aurelia";

@inject(ApiService, IRouter)
export class ButtonEpisode implements IRouteableComponent {
    public animeEpisodes = [];
    @bindable public paramId: string = '';
    public totalEpisodes = 0;

    constructor(private api: ApiService, private router: IRouter) { }

    async binding() {
        const data = await this.api.getAnimeEpisodes(this.paramId['id'])
        this.animeEpisodes = data['episodes'];
        this.totalEpisodes = data['totalEpisodes'];
        console.log(this.animeEpisodes)
    }

    public async getEpisodeDetails(episode: number) {
        console.log(this.animeEpisodes[episode - 1].episodeId);
        console.log(this.animeEpisodes[episode - 1].title);
        await this.router.load('episode', {
            parameters: {
                id: this.animeEpisodes[episode - 1].episodeId,
                title: this.animeEpisodes[episode - 1].title
            }
        })

    }

}