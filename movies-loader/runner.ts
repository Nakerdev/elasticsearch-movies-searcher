import { moviesLoader } from "./movies-loader";
import { movieJsonRepository } from "./repositories/movieJsonRepository";
import { movieElasticSearchRepository } from "./repositories/movieElasticSearchRepository";
import { moviesIndex } from "./repositories/moviesIndex";

function runLoader() {
    moviesLoader(
        movieJsonRepository(),
        buildMovieElasticSearchRepository());

    function buildMovieElasticSearchRepository() {
        const elasticSearchHost = "http://localhost:9200";
        return movieElasticSearchRepository(moviesIndex(elasticSearchHost));
    }
}

runLoader();
