import { movieRepository } from "./repositories/movieRepository";

export function moviesLoader(
    movieJsonRepository: movieRepository
) {
    const movies = movieJsonRepository.searchAll();
    console.log(movies[0].id);
}