interface animeInfoSchema {
    description: string;
    id: string;
    name: string;
    poster: string;
    stats: {
        duration: string;
        episodes: {
            sub: number;
            dub: number;
        }
        quality: string;
        rating: string;
        type: string;
    }
}

export { animeInfoSchema }