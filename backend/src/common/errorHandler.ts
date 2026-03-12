import { Request, Response, NextFunction } from 'express';
import { sendError } from './response';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('[ERROR]', err);

  const errorMap: Record<string, [string, number]> = {
    NotFoundError:     ['NOT_FOUND', 404],
    ConflictError:     ['CONFLICT', 409],
    ForbiddenError:    ['FORBIDDEN', 403],
    UnauthorizedError: ['UNAUTHORIZED', 401],
    ValidationError:   ['VALIDATION_ERROR', 400],
  };

  const [code, status] = errorMap[err.name] ?? ['INTERNAL_ERROR', 500];
  sendError(res, code, err.message || '서버 오류가 발생했습니다.', status);
};
