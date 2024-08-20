import { Request, Response, NextFunction } from "express"

type asyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsync = (fn: asyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next)
    .catch(error => res.status(400).json({data: error}));
  }
};