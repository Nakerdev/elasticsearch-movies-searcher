import { ApiResponseBuilder } from "./apiUtils";
import { MovieRepository } from "./movieRepository";

export { MoviesController, MoviesControllerRequest, moviesController };

interface MoviesController {
  search(request: MoviesRequest): void;
}

function moviesController(
  apiResponseBuilder: ApiResponseBuilder,
  movieRepository: MovieRepository
): MoviesController {
  return {
    search,
  };

  function search(request: MoviesRequest) {
    const foundMovies = movieRepository.searchBy(request.criteria);
    apiResponseBuilder.sendSuccessResponse(foundMovies);
  }
}

class MoviesControllerRequest {
  readonly criteria: string;

  constructor(criteria: string) {
    this.criteria = criteria;
  }
}
