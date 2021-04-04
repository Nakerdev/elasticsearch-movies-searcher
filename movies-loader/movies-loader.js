"use strict";
exports.__esModule = true;
exports.moviesLoader = void 0;
function moviesLoader(movieJsonRepository, movieElasticSearchRepository) {
    var movies = movieJsonRepository.searchAll();
    movieElasticSearchRepository.create(movies[0]);
}
exports.moviesLoader = moviesLoader;
