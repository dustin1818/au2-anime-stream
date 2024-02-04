import { IRouteableComponent, IRouter } from "@aurelia/router";
import { ApiService } from "../../services/api-service";
import { bindable, inject } from "aurelia";
import { animeStreamSchema } from "../../interfaces/animeSchemas";
import Hls from 'hls.js';


@inject(ApiService, Hls, IRouter)
export class EpisodeView implements IRouteableComponent {
    public id: string = '';
    public streamData: animeStreamSchema[] = [];
    public quality: string[] = [];
    public selectedQuality: string = '';

    constructor(private api: ApiService, private video: Hls, private router: IRouter) {
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

    public downloadEpisode() {
        window.open(this.streamData['download'], '_blank');
    }

    public async nextEpisode() {
        const str = this.id;
        const number = parseInt(str.match(/\d+/)[0]);
        const nextEp = number + 1;
        const nextEpID = this.id.replace(number.toString(), nextEp.toString());
        await this.router.load(`/episode-view/${nextEpID}`);
        // Render binding and attached methods for the new episode
        // this.episodeNumber = nextEp;
        await this.binding();
        await this.attached();

    }
    public async prevEpisode() {
        const str = this.id;
        const number = parseInt(str.match(/\d+/)[0]);
        if (number > 1) {
            const nextEp = number - 1;
            const nextEpID = this.id.replace(number.toString(), nextEp.toString());
            await this.router.load(`/episode-view/${nextEpID}`);
            // Render binding and attached methods for the new episode
            await this.binding();
            await this.attached();
            // this.episodeNumber + 1;
            // console.log(this.episodeNumber);
        }
    }
}
