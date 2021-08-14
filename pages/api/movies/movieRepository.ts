import { MoviesIndex } from "./../../../elasticSearchContext/indexes/movies/moviesIndex";
import { MovieDocumentSource } from "./../../../elasticSearchContext/indexes/movies/moviesIndex";

export interface MovieRepository {
  searchBy(criteria: string): Promise<Movie[]>;
}

export function movieElasticSearchRepository(
  moviesIndex: MoviesIndex
): MovieRepository {
  return {
    searchBy,
  };

  async function searchBy(criteria: string): Promise<Movie[]> {
    const foundDocuments = await moviesIndex.searchBy(criteria);
    return foundDocuments.map((document) => buildMovie(document));

    function buildMovie(document: MovieDocumentSource): Movie {
      return new Movie(
        document.id,
        document.title,
        document.poster,
        document.synopsis,
        document.release_date,
        document.genres
      );
    }
  }
}

export class Movie {
  readonly id: string;
  readonly title: string;
  readonly poster: string;
  readonly synopsis: string;
  readonly releaseDate: number;
  readonly genres: string[];

  constructor(
    id: string,
    title: string,
    poster: string,
    synopsis: string,
    releaseDate: number,
    genres: string[]
  ) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.synopsis = synopsis;
    this.releaseDate = releaseDate;
    this.genres = genres;
  }
}
