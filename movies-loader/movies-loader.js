"use strict";
exports.__esModule = true;
exports.moviesLoader = void 0;
function moviesLoader(movieJsonRepository) {
    var movies = movieJsonRepository.searchAll();
    console.log(movies[0].id);
}
exports.moviesLoader = moviesLoader;
