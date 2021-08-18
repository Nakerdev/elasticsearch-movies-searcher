export interface MoviesIndex {
  createIfNotExist: () => Promise<void>;
  indexDocument: (document: MovieDocumentSource) => Promise<void>;
  searchBy: (title: string) => Promise<MovieDocumentSource[]>;
  deleteAll: () => void;
}

export class MovieDocument {
  readonly _source: MovieDocumentSource;

  constructor(_source: MovieDocumentSource) {
    this._source = _source;
  }
}

export class MovieDocumentSource {
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
