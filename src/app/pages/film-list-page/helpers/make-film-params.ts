import { DiscoverMovieParams, FilmListFilters, Genre } from '../../../models';

export function makeFilmParams(
    page: number,
    filters: FilmListFilters,
): DiscoverMovieParams {
    const with_genres = filters.genres
        ? filters.genres.map((genre: Genre) => genre.id).join(',')
        : null;
    const primary_release_year = filters.dates;
    const sort_by = filters.sorting;

    const params: DiscoverMovieParams = {
        page,
        ...(with_genres ? { with_genres } : {}),
        ...(primary_release_year ? { primary_release_year } : {}),
        ...(sort_by
            ? {
                  sort_by,
                  'primary_release_date.lte': getCurrentDate(),
              }
            : {}),
    };

    return params;
}

function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
