import fetch from "node-fetch";
import { MoviesIndex, MovieDocument, MovieDocumentSource } from "./moviesIndex";
import moviesIndexConfig from "./moviesIndexConfig";

export default function moviesNodeFetchIndex(
  elasticSearchHost: string
): MoviesIndex {
  const indexName = moviesIndexConfig.name;
  const indexConfiguration = moviesIndexConfig.configuration;

  return {
    createIfNotExist,
    indexDocument,
    searchBy,
    deleteAll,
  };

  async function createIfNotExist(): Promise<void> {
    if (!(await isIndexExist())) {
      await createIndex();
    }

    async function isIndexExist(): Promise<boolean> {
      const success_status_code = 200;
      const httpRequest = { method: "HEAD" };
      return await fetch(`${elasticSearchHost}/${indexName}`, httpRequest)
        .then((response) => response.status === success_status_code)
        .catch((_) => false);
    }

    async function createIndex(): Promise<void> {
      const httpRequest = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(indexConfiguration),
      };
      await fetch(`${elasticSearchHost}/${indexName}`, httpRequest);
    }
  }

  async function indexDocument(document: MovieDocumentSource): Promise<void> {
    const httpRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    };
    await fetch(`${elasticSearchHost}/${indexName}/_doc`, httpRequest);
  }

  async function searchBy(title: string): Promise<MovieDocumentSource[]> {
    const httpRequest = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${elasticSearchHost}/${indexName}/_search?q=title:${title}`,
      httpRequest
    );
    const jsonResponse = await response.json();
    const movies = <MovieDocument[]>jsonResponse.hits.hits;
    return movies.map((movie) => movie._source);
  }

  async function deleteAll() {
    const httpRequest = { method: "DELETE" };
    await fetch(`${elasticSearchHost}/${indexName}`, httpRequest);
    console.log("Index deleted");
  }
}
