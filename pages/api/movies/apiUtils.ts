import { NextApiRequest, NextApiResponse } from "next";

export type ResponseBody = object | string | Array<object>;

export interface ApiResponseBuilder {
  sendSuccessResponse(responseBody: ResponseBody): void;
}

export function nextApiResponseBuilder(
  res: NextApiResponse
): ApiResponseBuilder {
  return {
    sendSuccessResponse,
  };

  function sendSuccessResponse(responseBody: ResponseBody): void {
    res.status(200).json(responseBody);
  }
}
