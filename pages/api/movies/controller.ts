import { ApiResponseBuilder } from "./apiUtils";
import { MovieRepository } from "./movieRepository";

export interface MoviesController {
  search(request: MoviesControllerRequest): void;
}

export function moviesController(
  apiResponseBuilder: ApiResponseBuilder,
  movieRepository: MovieRepository
): MoviesController {
  return {
    search,
  };

  async function search(request: MoviesControllerRequest) {
    const foundMovies = await movieRepository.searchBy(request.criteria);
    apiResponseBuilder.sendSuccessResponse(foundMovies);
  }
}

export class MoviesControllerRequest {
  readonly criteria: string;

  constructor(criteria: string) {
    this.criteria = criteria;
  }
}
