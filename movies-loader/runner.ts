import { moviesLoader } from "./movies-loader";
import { movieJsonRepository } from "./repositories/movieJsonRepository";
import { movieElasticSearchRepository } from "./repositories/movieElasticSearchRepository";
import { moviesIndex } from "./repositories/moviesIndex";
import appConfig from "./../app.config";

function runLoader() {
    moviesLoader(
        movieJsonRepository(),
        buildMovieElasticSearchRepository());

    function buildMovieElasticSearchRepository() {
        return movieElasticSearchRepository(
            moviesIndex(appConfig.ElasticSearchHost));
    }
}

runLoader();
