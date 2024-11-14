import { FilmVideo } from './film-video.type';

export type FilmVideosResponse = Readonly<{
    results: FilmVideo[];
}>;
