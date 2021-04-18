import { movieRepository, Movie } from "./movieRepository";
import { Index, moviesIndex, MovieDocument } from "./moviesIndex";

export function movieElasticSearchRepository(
  moviesIndex: Index
): movieRepository {
  moviesIndex.createIfNotExist();

  return {
    searchAll,
    create,
  };

  function searchAll(): Movie[] {
    throw new Error("not implemented");
  }

  async function create(movies: Movie[]): Promise<void> {
    for (const movie of movies) {
      console.log(`Indexing movie: ${movie.title}`);
      const document = new MovieDocument(
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
