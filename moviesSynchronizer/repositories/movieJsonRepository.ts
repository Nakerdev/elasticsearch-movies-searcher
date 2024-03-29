import { movieRepository, Movie } from "./movieRepository";

import * as movies from "./data/movies.json";

export function movieJsonRepository(): movieRepository {
  return {
    deleteAll,
    searchAll,
    create,
  };

  function searchAll(): Movie[] {
    return (<MovieDto[]>movies).map((movie) => buildMovie(movie));

    function buildMovie(movie: MovieDto): Movie {
      return new Movie(
        movie.id,
        movie.title,
        movie.poster,
        movie.overview,
        movie.release_date,
        movie.genres
      );
    }
  }

  function create(): void {
    //this funtion is not using
    throw new Error("not implemented");
  }

  function deleteAll() {
    //this function is not using.
    throw new Error("not implemented");
  }
}

class MovieDto {
  readonly id: string;
  readonly title: string;
  readonly poster: string;
  readonly overview: string;
  readonly release_date: number;
  readonly genres: string[];

  constructor(
    id: string,
    title: string,
    poster: string,
    overview: string,
    release_date: number,
    genres: string[]
  ) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.overview = overview;
    this.release_date = release_date;
    this.genres = genres;
  }
}
