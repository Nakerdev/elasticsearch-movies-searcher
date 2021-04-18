import { Index } from "./../../../moviesSynchronizer/repositories/moviesIndex";

export { MovieRepository, movieElasticSearchRepository };

function movieElasticSearchRepository(moviesIndex: Index): MovieRepository {
  return {
    searchBy,
  };

  async function searchBy(criteria: string): Promise<Movie[]> {
    const foundDocuments = await moviesIndex.searchBy(criteria);
    return foundDocuments.map((document) => buildMovie(document));

    function buildMovie(document: MovieDocument): Movie {
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

interface MovieRepository {
  searchBy(criteria: string): Movie[];
}

class Movie {
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
