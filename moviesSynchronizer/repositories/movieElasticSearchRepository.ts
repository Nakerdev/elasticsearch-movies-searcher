import { movieRepository, Movie } from "./movieRepository";
import type { MoviesIndex } from "./../../elasticSearchContext/indexes/movies/moviesIndex";
import { MovieDocumentSource } from "./../../elasticSearchContext/indexes/movies/moviesIndex";

export function movieElasticSearchRepository(
  moviesIndex: MoviesIndex
): movieRepository {
  return {
    deleteAll,
    searchAll,
    create,
  };

  async function deleteAll() {
    await moviesIndex.deleteAll();
  }

  function searchAll(): Movie[] {
    //this method is not using.
    throw new Error("not implemented");
  }

  async function create(movies: Movie[]): Promise<void> {
    moviesIndex.createIfNotExist();
    for (const movie of movies) {
      console.log(`Indexing movie: ${movie.title}`);
      const document = new MovieDocumentSource(
        movie.id,
        movie.title,
        movie.poster,
        movie.synopsis,
        movie.releaseDate,
        movie.genres
      );
      await moviesIndex.indexDocument(document);
    }
  }
}
