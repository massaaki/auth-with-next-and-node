import { Request, Response, NextFunction } from "express";

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set("access-Control-Allow-Origin", "*");
  res.set("access-control-allow-methods", "*");
  res.set("access-control-allow-headers", "*");
  next();
};
