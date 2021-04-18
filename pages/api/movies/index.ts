import { NextApiRequest, NextApiResponse } from "next";
import { MoviesControllerRequest } from "./controller";
import { buildMoviesController } from "./factory";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const { crieria } = req.query;
      const controller = buildMoviesController(res);
      const moviesRequest = new MoviesControllerRequest(criteria);
      controller.search(moviesRequest);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
