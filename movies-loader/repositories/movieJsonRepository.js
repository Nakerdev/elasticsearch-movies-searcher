"use strict";
exports.__esModule = true;
exports.movieJsonRepository = void 0;
var movieRepository_1 = require("./movieRepository");
var movies = require("./../../movies-source/movies.json");
function movieJsonRepository() {
    return {
        searchAll: searchAll,
        create: create
    };
    function searchAll() {
        return movies.map(function (movie) { return buildMovie(movie); });
        function buildMovie(movie) {
            return new movieRepository_1.Movie(movie.id, movie.title, movie.poster, movie.overview, movie.release_date, movie.genres);
        }
    }
    function create(movie) {
        throw new Error("not implemented");
    }
}
exports.movieJsonRepository = movieJsonRepository;
var JsonMovieDto = /** @class */ (function () {
    function JsonMovieDto(id, title, poster, overview, release_date, genres) {
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.overview = overview;
        this.release_date = release_date;
        this.genres = genres;
    }
    return JsonMovieDto;
}());
