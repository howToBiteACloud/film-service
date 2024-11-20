export type DiscoverMovieParams = {
    page: number;
    with_genres?: string;
    sort_by?: string;
    primary_release_year?: number;
    language?: string;
    'primary_release_date.lte'?: string;
};
