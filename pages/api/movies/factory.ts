import { NextApiResponse } from "next";
import { nextApiResponseBuilder } from "./apiUtils";
import { MoviesController, moviesController } from "./controller";
import {
  movieElasticSearchRepository,
  MovieRepository,
} from "./movieRepository";
import moviesNodeFetchIndex from "./../../../elasticSearchContext/indexes/movies/moviesNodeFetchIndex";
import appConfig from "./../../../app.config";

export function buildMoviesController(res: NextApiResponse): MoviesController {
  return moviesController(
    nextApiResponseBuilder(res),
    buildElasticSearchRepository()
  );

  function buildElasticSearchRepository(): MovieRepository {
    return movieElasticSearchRepository(
      moviesNodeFetchIndex(appConfig.ElasticSearchHost)
    );
  }
}
