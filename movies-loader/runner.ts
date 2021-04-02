import { moviesLoader } from "./movies-loader";
import { movieJsonRepository } from "./repositories/movieJsonRepository";

function runLoader() {
    moviesLoader(movieJsonRepository());
}

runLoader();