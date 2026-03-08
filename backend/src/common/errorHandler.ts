import { Request, Response, NextFunction } from 'express';
import { AppError } from './errors';
import { fail } from './response';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(fail(err.code, err.message));
  }

  return res.status(500).json(fail('INTERNAL_SERVER_ERROR', '서버 오류가 발생했습니다.'));
};
