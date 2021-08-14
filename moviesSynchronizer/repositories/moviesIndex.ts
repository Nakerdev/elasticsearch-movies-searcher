import fetch from "node-fetch";

export { Index, moviesIndex, MovieDocumentSource };

interface Index {
  createIfNotExist: () => Promise<void>;
  indexDocument: (document: any) => Promise<void>;
  searchBy: (title: string) => Promise<MovieDocumentSource[]>;
}

function moviesIndex(elasticSearchHost: string): Index {
  const indexName = "movies";
  const indexConfiguration = {
    settings: {
      analysis: {
        analyzer: {
          movies_title_analyzer: {
            type: "custom",
            tokenizer: "standard",
            filter: ["lowercase", "stop", "stemmer", "asciifolding"],
          },
        },
      },
    },
    mappings: {
      dynamic: "strict",
      properties: {
        id: { type: "keyword" },
        title: {
          type: "text",
          analyzer: "movies_title_analyzer",
        },
        poster: { type: "text" },
        synopsis: { type: "text" },
        release_date: { type: "long" },
        genres: { type: "keyword" },
      },
    },
  };

  return {
    createIfNotExist,
    indexDocument,
    searchBy,
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
}

class MovieDocument {
  readonly _source: MovieDocument[];

  constructor(_source: MovieDocument[]) {
    this._source = _source;
  }
}

class MovieDocumentSource {
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
