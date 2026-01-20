import { Request, Response, NextFunction } from 'express';

export interface IPaginatedRequest extends Request {
  pagination?: {
    page: number;
    limit: number;
    skip: number;
  };
}

export const paginationMiddleware = (defaultLimit: number = 10) => {
  return (req: IPaginatedRequest, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || defaultLimit;

    const validatedPage = page < 1 ? 1 : page;
    
    const skip = (validatedPage - 1) * limit;

    req.pagination = {
      page: validatedPage,
      limit,
      skip,
    };

    next();
  };
};