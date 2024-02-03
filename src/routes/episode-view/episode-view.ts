
import { IRouteableComponent } from "@aurelia/router";
import { ApiService } from "../../services/api-service";
import { bindable, inject } from "aurelia";
import { animeStreamSchema } from "../../interfaces/animeSchemas";
import Hls from 'hls.js';

@inject(ApiService, Hls)
export class EpisodeView implements IRouteableComponent {
    public id: string = '';
    public streamData: animeStreamSchema[] = [];
    public quality: string[] = [];
    public selectedQuality: string = '';

    constructor(private api: ApiService, private video: Hls) {
        console.log(this.selectedQuality)
    }

    public async load(parameters: { id: string }): Promise<void> {
        if (parameters.id) {
            this.id = parameters.id;
        }
    }

    public async binding(): Promise<void> {
        const dataServer = await this.api.getEpisodeSource(this.id);
        this.streamData = dataServer;
        console.log(this.streamData);
        this.streamData['sources'].map((source) => {
            this.quality.push(source.quality);
        });
    }

    public attached() {
        const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
        this.video.loadSource(this.streamData['sources'][0].url);
        this.video.attachMedia(videoPlayer);
    }

    public select() {
        console.log(this.selectedQuality)
        this.streamData['sources'].map((source) => {
            if (source.quality === this.selectedQuality) {
                const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
                const url = source.url;
                this.video.loadSource(url);
                this.video.attachMedia(videoPlayer);
            }
        });
    }

}
