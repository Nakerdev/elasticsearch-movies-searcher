import { movieRepository, Movie } from "./movieRepository";

import * as movies from "./../../movies-source/movies.json";

export function movieJsonRepository() : movieRepository {

    return {
        searchAll,
        create
    };

    function searchAll() : Movie[] {

        return (<MovieDto[]>movies).map(movie => buildMovie(movie));

        function buildMovie(movie: MovieDto): Movie {
            return new Movie(
                movie.id,
                movie.title,
                movie.poster,
                movie.overview,
                movie.release_date,
                movie.genres
            )
        }
    }

    function create(movie: Movie) : void {
        throw new Error("not implemented");
    }
}

class MovieDto {

    readonly id: string;
    readonly title: string;
    readonly poster: string;
    readonly overview: string;
    readonly release_date: number;
    readonly genres: string[]

    constructor(
        id: string,
        title: string,
        poster: string,
        overview: string,
        release_date: number,
        genres: string[],
    ){
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.overview = overview;
        this.release_date = release_date;
        this.genres = genres;
    }
}
