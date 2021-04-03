"use strict";
exports.__esModule = true;
var movies_loader_1 = require("./movies-loader");
var movieJsonRepository_1 = require("./repositories/movieJsonRepository");
var movieElasticSearchRepository_1 = require("./repositories/movieElasticSearchRepository");
function runLoader() {
    movies_loader_1.moviesLoader(movieJsonRepository_1.movieJsonRepository(), movieElasticSearchRepository_1.movieElasticSearchRepository());
}
runLoader();
