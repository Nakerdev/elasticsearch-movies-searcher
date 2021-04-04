import { movieRepository, Movie } from "./movieRepository";
import fetch from "node-fetch";

export function movieElasticSearchRepository() : movieRepository {

    const indexName = "movies";
    const elasticSearchHost = "http://localhost:9200";

    return {
        searchAll,
        create
    };

    function searchAll() : Movie[] {
        throw new Error("not implemented");
    }

    async function create(movies: Movie[]) : Promise<void> {
        if(! await isMoviesIndexExist()) {
            await createMoviesIndex();
        };
        for (const movie of movies) {
            console.log(`Creating ${movie.title} movie.`);
            await createMovieDocument(movie)
        }
    }

    async function isMoviesIndexExist() : Promise<boolean> {
        const success_status_code = 200;
        const httpRequest = { method: 'HEAD' };
        return await fetch(`${elasticSearchHost}/${indexName}`, httpRequest)
            .then(response => response.status === success_status_code)
            .catch(_ => false);
    }

    async function createMoviesIndex() : Promise<void> {
        const indexConfiguration = {
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
        const httpRequest = { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(indexConfiguration)
        };
        await fetch(`${elasticSearchHost}/${indexName}`, httpRequest);
    }

    async function createMovieDocument(movie: Movie) : Promise<void> {
        const document = new MovieDocumentDto(
            movie.id,
            movie.title,
            movie.poster,
            movie.synopsis,
            movie.releaseDate,
            movie.genres);
        const httpRequest = { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(document)
        };
        await fetch(`${elasticSearchHost}/${indexName}/_doc`, httpRequest);
    }
}

class MovieDocumentDto {

        readonly id: string;
        readonly title: string;
        readonly poster: string;
        readonly synopsis: string;
        readonly release_date: number;
        readonly genres: string[];

        constructor(
            id: string,
            title: string,
            poster: string,
            synopsis: string,
            release_date: number,
            genres: string[]
        ) {
            this.id = id;
            this.title = title;
            this.poster = poster;
            this.synopsis = synopsis;
            this.release_date = release_date;
            this.genres = genres;
        }
    }
