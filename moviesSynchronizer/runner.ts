import { buildMoviesSynchronizer } from "./factory";

const moviesSynchronizer = buildMoviesSynchronizer();
moviesSynchronizer.sync();
