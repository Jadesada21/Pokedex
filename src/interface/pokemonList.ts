//! กำหนด type ของ key แต่ละอันของ DB

export interface IPokemonListResponse {
    count: number;
    next: string;
    previous: null;
    results: IPokemonListItem[];
}

export interface IPokemonListItem {
    name: string;
    url: string;
}

