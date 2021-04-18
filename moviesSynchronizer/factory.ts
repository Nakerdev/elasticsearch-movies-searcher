import { moviesSynchronizer } from "./moviesSynchronizer";
import { movieJsonRepository } from "./repositories/movieJsonRepository";
import { movieElasticSearchRepository } from "./repositories/movieElasticSearchRepository";
import { moviesIndex } from "./repositories/moviesIndex";
import appConfig from "./../app.config";

export function buildMoviesSynchronizer() {
  return moviesSynchronizer(
    movieJsonRepository(),
    buildMovieElasticSearchRepository()
  );

  function buildMovieElasticSearchRepository() {
    return movieElasticSearchRepository(
      moviesIndex(appConfig.ElasticSearchHost)
    );
  }
}
