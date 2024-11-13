export type CreditsResponse = Readonly<{
    id: number;
    cast: Cast[];
    crew: Crew[];
}>;

export type Person = Readonly<{
    id: number;
    adult: boolean;
    gender: number;
    known_for_department: string; // enum
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
}>;

export type Cast = Person &
    Readonly<{
        cast_id: number;
        character: string;
        order: number;
    }>;

export type Crew = Person &
    Readonly<{
        department: string; // enum
        job: string; // enum optional?
    }>;
