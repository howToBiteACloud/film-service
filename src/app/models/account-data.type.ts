export type AccountData = Readonly<{
    avatar: Avatar;
    id: number;
    include_adult: boolean;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    username: string;
}>;

export type Avatar = Readonly<{
    gravatar: Readonly<{ hash: string }>;
    tmdb: Readonly<{ avatar_path: string }>;
}>;
