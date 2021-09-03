import { Movie } from "./../../pages/api/movies/movieRepository";

export async function searchMovies(criteria: string) {
    const minCriteriaLenghtToFireTheSearch = 3;
    if (criteria.length < minCriteriaLenghtToFireTheSearch) return [];
    const response = await fetch(`/api/movies?criteria=${criteria}`);
    const movies: Movie[] = await response.json();
    return movies;
}