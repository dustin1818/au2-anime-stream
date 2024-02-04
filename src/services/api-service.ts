import { EventAggregator, inject } from "aurelia";
import { IHttpClient, json } from "@aurelia/fetch-client";

@inject(IHttpClient, EventAggregator)
export class ApiService {
    constructor(private http: IHttpClient, private ea: EventAggregator) {
        const apiLink = "https://consumet-api-v2.vercel.app/anime/gogoanime";
        http.configure((config) => {
            config
                .withDefaults({ mode: 'cors' })
                .withBaseUrl(apiLink);
            return config;
        });
    }
    // end of constuctor

    //search anime
    public async searchAnime(query: string, page: number = 1): Promise<any[]> {
        const response = await this.http.get(`/${query}?page=${page}`);
        return response.json();
    }

    //get anime info
    public async getAnimeInfo(id: string): Promise<any[]> {
        const response = await this.http.get(`/info/${id}`);
        return response.json();
    }

    //get anime server
    public async getAnimeServer(id: string): Promise<any[]> {
        const response = await this.http.get(`/servers/${id}`);
        return response.json();
    }

    //get anime episodes
    public async getEpisodeSource(id: string, server: string = "gogocdn"): Promise<any> {
        const response = await this.http.get(`/watch/${id}?server=${server}`);
        return response.json();
    }

    //get recent animes
    public async getRecentAnimes(): Promise<any[]> {
        const response = await this.http.get("/recent-episodes");
        return response.json();
    }

    //get topAiring animes
    public async getTopAiringAnimes(): Promise<any[]> {
        const response = await this.http.get("/top-airing");
        return response.json();
    }
} 