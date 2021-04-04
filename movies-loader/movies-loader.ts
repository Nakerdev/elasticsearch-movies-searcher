import { movieRepository } from "./repositories/movieRepository";

export function moviesLoader(
    movieJsonRepository: movieRepository,
    movieElasticSearchRepository: movieRepository
) {
    const movies = movieJsonRepository.searchAll();
    movieElasticSearchRepository.create(movies[0]);
}
