import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET":
      console.log("execute the controller");
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

type ResponseBody = object | string;

interface ApiResponseBuilder {
  sendSuccessResponse(responseBody: ResponseBody): void;
}

function NextApiResponseBuilder(res: NextApiResponse): ApiResponseBuilder {
  return {
    sendSuccessResponse,
  };

  function sendSuccessResponse(responseBody: ResponseBody): void {
    res.send(200).json(responseBody);
  }
}

function moviesController(
  request: MoviesRequest,
  apiResponseBuilder: ApiResponseBuilder,
  movieRepository: MovieRepository
) {
  throw new Error("not implemented");
}

class MoviesControllerRequest {
  readonly criteria: string;

  constructor(criteria: string) {
    this.criteria = criteria;
  }
}

function movieElasticSearchRepository(moviesIndex): MovieRepository {
  return {
    searchBy,
  };

  function searchBy(criteria: string): Movie[] {
    return moviesIndex
      .searchBy(criteria)
      .map((document) => buildMovie(document));

    function buildMovie(document: MovieDocument): Movie {
      return new Movie(
        document.id,
        document.title,
        document.poster,
        document.synopsis,
        document.release_date,
        document.genres
      );
    }
  }
}

interface MovieRepository {
  searchBy(criteria: string): Movie[];
}

class Movie {
  readonly id: string;
  readonly title: string;
  readonly poster: string;
  readonly synopsis: string;
  readonly releaseDate: number;
  readonly genres: string[];

  constructor(
    id: string,
    title: string,
    poster: string,
    synopsis: string,
    releaseDate: number,
    genres: string[]
  ) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.synopsis = synopsis;
    this.releaseDate = releaseDate;
    this.genres = genres;
  }
}
