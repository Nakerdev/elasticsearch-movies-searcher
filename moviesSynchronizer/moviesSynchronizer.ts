import { movieRepository } from "./repositories/movieRepository";

export function moviesSynchronizer(
  movieJsonRepository: movieRepository,
  movieElasticSearchRepository: movieRepository
) {
  return {
    sync,
  };

  function sync() {
    const movies = movieJsonRepository.searchAll();
    movieElasticSearchRepository.create(movies);
  }
}
