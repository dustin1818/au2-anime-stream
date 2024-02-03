interface animeSearchSchema {
    id: string;
    name: string;
    image: string;
    releasedDate: string;
    subOrDub: string;
    title: string;
    url: string;
}
interface animeInfoSchema {
    description: string;
    id: string;
    title: string;
    image: string;
    releasedDate: string;
    url: string;
    genres: string[];
    subOrDub: string;
    type: string;
    status: string;
    otherNames: string;
    totalEpisodes: number;
    episodes: [
        {
            id: string;
            number: number;
            url: string;
        }
    ]
}


interface animeEpisodesSchema {
    id: string,
    number: number,
    url: string
}

interface animeServerSchema {
    name: string,
    url: string
}
interface animeStreamSchema {
    download: string;
    sources: [
        {
            url: string,
            quality: string,
            isM3U8: true
        }
    ]
}

export { animeSearchSchema, animeInfoSchema, animeEpisodesSchema, animeServerSchema, animeStreamSchema }