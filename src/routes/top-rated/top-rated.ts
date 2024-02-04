import { ICustomElementViewModel, inject } from "aurelia";
import { ApiService } from "../../services/api-service";
import { recentAnimeSchema } from "../../interfaces/animeSchemas";

export class TopRated implements ICustomElementViewModel {
    public recentAnimes = [];
    public results: recentAnimeSchema[] = [];

    constructor(private api: ApiService) { }

    async binding() {
        this.recentAnimes = await this.api.getTopAiringAnimes();
        this.results = this.recentAnimes['results'];
        console.log(this.results);
    }
}