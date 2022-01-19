import { NextFunction, Request, Response } from "express";

import { IHttpRequest } from "@/presentation/protocols/http";
import { IMiddleware } from "@/presentation/protocols/middleware";

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      const { email, id } = httpResponse.body;
      const user = { email, id };

      Object.assign(req, { user });

      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
