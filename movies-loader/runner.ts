import { moviesLoader } from "./movies-loader";
import { movieJsonRepository } from "./repositories/movieJsonRepository";
import { movieElasticSearchRepository } from "./repositories/movieElasticSearchRepository";
import { moviesIndex } from "./repositories/moviesIndex";

import * as dotenv from "dotenv";
dotenv.config();

function runLoader() {
    moviesLoader(
        movieJsonRepository(),
        buildMovieElasticSearchRepository());

    function buildMovieElasticSearchRepository() {
        const elasticSearchHost = process.env.ELASTICSEARCH_HOST;
        return movieElasticSearchRepository(moviesIndex(elasticSearchHost));
    }
}

runLoader();
