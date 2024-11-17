import { RecommendationFilm } from './recommendation.type';

export type RecommendationsResponse = Readonly<{
    page: number;
    total_pages: number;
    total_results: number;
    results: RecommendationFilm[];
}>;
