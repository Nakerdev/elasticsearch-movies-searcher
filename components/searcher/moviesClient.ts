import { Movie } from "./../../pages/api/movies/movieRepository";

export async function searchMovies(criteria: string): Promise<Movie[]> {
    const minCriteriaLenghtToFireTheSearch = 3;
    if (criteria.length < minCriteriaLenghtToFireTheSearch) return [];
    try {
        const response = await fetch(`/api/movies?criteria=${criteria}`);
        const movies: Movie[] = await response.json();
        return movies;
    } catch {
        return [];
    }
}