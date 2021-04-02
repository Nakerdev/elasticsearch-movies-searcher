"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var Movie = /** @class */ (function () {
    function Movie(id, title, poster, synopsis, releaseDate, genres) {
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.synopsis = synopsis;
        this.releaseDate = releaseDate;
        this.genres = genres;
    }
    return Movie;
}());
exports.Movie = Movie;
