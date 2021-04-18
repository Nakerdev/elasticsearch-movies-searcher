import { NextApiResponse } from "next";
import { nextApiResponseBuilder } from "./apiUtils";
import { MoviesController, moviesController } from "./controller";
import {
  movieElasticSearchRepository,
  MovieRepository,
} from "./movieRepository";
import { moviesIndex } from "./../../../moviesSynchronizer/repositories/moviesIndex";
import appConfig from "./../../../app.config";

export function buildMoviesController(res: NextApiResponse): MoviesController {
  return moviesController(
    nextApiResponseBuilder(res),
    buildElasticSearchRepository()
  );

  function buildElasticSearchRepository(): MovieRepository {
    return movieElasticSearchRepository(
      moviesIndex(appConfig.ElasticSearchHost)
    );
  }
}
