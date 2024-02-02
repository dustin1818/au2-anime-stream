import { EventAggregator, inject } from "aurelia";
import { IHttpClient, json } from "@aurelia/fetch-client";

@inject(IHttpClient, EventAggregator)
export class ApiService {
    constructor(private http: IHttpClient, private ea: EventAggregator) {
        const apiLink = "https://aniwatch-api-b74o.onrender.com/anime";
        http.configure((config) => {
            config
                .withDefaults({ mode: 'cors' })
                .withBaseUrl(apiLink);
            console.log(config)
            return config;
        });
    }
    // end of constuctor

    //search anime
    public async searchAnime(query: string, page: number = 1): Promise<any[]> {
        const response = await this.http.get(`/search?q=${query}&page=${page}`);
        return response.json();
    }

    //get anime info
    public async getAnimeInfo(id: string): Promise<any> {
        const response = await this.http.get(`/info?id=${id}`);
        return response.json();
    }

    //get anime episodes
    public async getAnimeEpisodes(id: string): Promise<any> {
        const response = await this.http.get(`/episodes/${id}`);
        return response.json();
    }
} 