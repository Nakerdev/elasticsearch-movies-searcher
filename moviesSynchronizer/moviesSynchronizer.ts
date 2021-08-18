import { movieRepository } from "./repositories/movieRepository";

export function moviesSynchronizer(
  movieJsonRepository: movieRepository,
  movieElasticSearchRepository: movieRepository
) {
  return {
    sync,
  };

  async function sync() {
    console.log("Cleaning the ElasticSearch movies index");
    await movieElasticSearchRepository.deleteAll();
    const movies = movieJsonRepository.searchAll();
    movieElasticSearchRepository.create(movies);
  }
}
