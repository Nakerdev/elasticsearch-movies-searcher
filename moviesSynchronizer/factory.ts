import { moviesSynchronizer } from "./moviesSynchronizer";
import { movieJsonRepository } from "./repositories/movieJsonRepository";
import { movieElasticSearchRepository } from "./repositories/movieElasticSearchRepository";
import moviesNodeFetchIndex from "./../elasticSearchContext/indexes/movies/moviesNodeFetchIndex";
import appConfig from "./../app.config";

export function buildMoviesSynchronizer() {
  return moviesSynchronizer(
    movieJsonRepository(),
    buildMovieElasticSearchRepository()
  );

  function buildMovieElasticSearchRepository() {
    return movieElasticSearchRepository(
      moviesNodeFetchIndex(appConfig.ElasticSearchHost)
    );
  }
}
