export { MovieRepository, movieElasticSearchRepository };

function movieElasticSearchRepository(moviesIndex): MovieRepository {
  return {
    searchBy,
  };

  function searchBy(criteria: string): Movie[] {
    return moviesIndex
      .searchBy(criteria)
      .map((document) => buildMovie(document));

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
