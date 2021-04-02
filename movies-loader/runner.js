"use strict";
exports.__esModule = true;
var movies_loader_1 = require("./movies-loader");
var movieJsonRepository_1 = require("./repositories/movieJsonRepository");
function runLoader() {
    movies_loader_1.moviesLoader(movieJsonRepository_1.movieJsonRepository());
}
runLoader();
