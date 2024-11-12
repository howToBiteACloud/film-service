import { DiscoverMovieParams, FilmListFilters, Genre } from '../../../models';

export function makeFilmParams(page: number, filters: FilmListFilters) {
    const with_genres = filters.genres
        ? filters.genres.map((genre: Genre) => genre.id).join(',')
        : null;
    const primary_release_year = filters.dates;

    const params: DiscoverMovieParams = {
        page,
        ...(with_genres ? { with_genres } : {}),
        ...(primary_release_year ? { primary_release_year } : {}),
    };

    return params;
}
