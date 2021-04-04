"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.movieElasticSearchRepository = void 0;
var node_fetch_1 = require("node-fetch");
function movieElasticSearchRepository() {
    var indexName = "movies";
    var elasticSearchHost = "http://localhost:9200";
    return {
        searchAll: searchAll,
        create: create
    };
    function searchAll() {
        throw new Error("not implemented");
    }
    function create(movie) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, isMoviesIndexExist()];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, createMoviesIndex()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        ;
                        return [4 /*yield*/, createMovieDocument(movie)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function isMoviesIndexExist() {
        return __awaiter(this, void 0, void 0, function () {
            var success_status_code, httpRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success_status_code = 200;
                        httpRequest = { method: 'HEAD' };
                        return [4 /*yield*/, node_fetch_1["default"](elasticSearchHost + "/" + indexName, httpRequest)
                                .then(function (response) { return response.status === success_status_code; })["catch"](function (_) { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function createMoviesIndex() {
        return __awaiter(this, void 0, void 0, function () {
            var indexConfiguration, httpRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indexConfiguration = {
                            settings: {
                                analysis: {
                                    analyzer: {
                                        "movies_title_analyzer": {
                                            type: "custom",
                                            tokenizer: "standard",
                                            filter: [
                                                "lowercase",
                                                "stop",
                                                "stemmer",
                                                "asciifolding"
                                            ]
                                        }
                                    }
                                }
                            },
                            mappings: {
                                dynamic: "strict",
                                properties: {
                                    id: { type: "keyword" },
                                    title: {
                                        type: "text",
                                        analyzer: "movies_title_analyzer"
                                    },
                                    poster: { type: "text" },
                                    synopsis: { type: "text" },
                                    release_date: { type: "long" },
                                    genres: { type: "keyword" }
                                }
                            }
                        };
                        httpRequest = {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(indexConfiguration)
                        };
                        return [4 /*yield*/, node_fetch_1["default"](elasticSearchHost + "/" + indexName, httpRequest)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function createMovieDocument(movie) {
        return __awaiter(this, void 0, void 0, function () {
            var document, httpRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = new MovieDocumentDto(movie.id, movie.title, movie.poster, movie.synopsis, movie.releaseDate, movie.genres);
                        httpRequest = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(document)
                        };
                        return [4 /*yield*/, node_fetch_1["default"](elasticSearchHost + "/" + indexName + "/_doc", httpRequest)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
}
exports.movieElasticSearchRepository = movieElasticSearchRepository;
var MovieDocumentDto = /** @class */ (function () {
    function MovieDocumentDto(id, title, poster, synopsis, release_date, genres) {
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.synopsis = synopsis;
        this.release_date = release_date;
        this.genres = genres;
    }
    return MovieDocumentDto;
}());
