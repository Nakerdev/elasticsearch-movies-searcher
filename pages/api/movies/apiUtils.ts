import { NextApiRequest, NextApiResponse } from "next";

export { ApiResponseBuilder, ResponseBody, nextApiResponseBuilder };

type ResponseBody = object | string | Array<object>;

interface ApiResponseBuilder {
  sendSuccessResponse(responseBody: ResponseBody): void;
}

function nextApiResponseBuilder(res: NextApiResponse): ApiResponseBuilder {
  return {
    sendSuccessResponse,
  };

  function sendSuccessResponse(responseBody: ResponseBody): void {
    res.status(200).json(responseBody);
  }
}
