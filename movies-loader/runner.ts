import { moviesLoader } from "./movies-loader";
import { movieJsonRepository } from "./repositories/movieJsonRepository";
import { movieElasticSearchRepository } from "./repositories/movieElasticSearchRepository";

function runLoader() {
    moviesLoader(
        movieJsonRepository(),
        movieElasticSearchRepository());
}

runLoader();
