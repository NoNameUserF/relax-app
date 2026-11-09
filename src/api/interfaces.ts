export interface IVideoGame {
    briefDescription: string;
    country: string;
    title: string;
    videoGameGenre: string;
    releaseYear: string;
}

export interface IBoardGame {
    briefDescription: string;
    title: string;
    genre: string;
    playersCount: string;
    oneBatchTime: string;
    originalLangTitle: string;
    age: number;
}

export interface IActivity {
    description: string;
    duration: string;
    latitude: number;
    longitude: number;
    name: string;
    originalName: string | undefined;
    price: string;
    type: string;
}

export interface IVideo {
    author: string;
    channelUrl: string;
    commentCount: number;
    description: string;
    duration: number;
    likeCount: number;
    publishedAt: string;
    thumbnailsUrlDefault: string;
    thumbnailsUrlHigh: string;
    thumbnailsUrlMedium: string;
    title: string;
    videoUrl: string;
    viewCount: number;
}

export interface IBook {
    openLibraryKey: string;
    title: string;
    originalTitle: string;
    description: string;
    authors: string[];
    releaseYear: string;
    openLibraryLink: string;
}

export interface IMovie {
    genres?: string[];
    contentType?: string;
    cast?: string[];
    originalTitle?: string;
    ageRating?: string;
    country: string;
    description: string;
    director?: string;
    duration: string;
    releaseYear: string;
    title: string;
}
