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

    async function create(movie: Movie) {
        if(!await isMoviesIndexExist()) {
            await createMoviesIndex();
            return;
        };
        throw new Error("not implemented");
    }

    async function isMoviesIndexExist() : Promise<boolean> {
        const success_status_code = 200;
        const httpRequest = { method: 'HEAD' };
        return await fetch(`${elasticSearchHost}/${indexName}`, httpRequest)
            .then(response => response.status === success_status_code)
            .catch(_ => false);
    }

    async function createMoviesIndex() {
        const indexConfiguration = {
            settings: {
                analysis: {
                    analyzer: {
                        "movies_title_analyzer": {
                            type: "custom",
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
                    releaseDate: { type: "long" },
                    genres: { type: "keyword" }
                }
            }

        };
        const httpRequest = { 
            method: 'PUT',
            body: JSON.stringify(indexConfiguration)
        };
        await fetch(`${elasticSearchHost}/${indexName}`, httpRequest);
    }
}
