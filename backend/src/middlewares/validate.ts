import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { sendError } from '../common/response';

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      sendError(
        res,
        'VALIDATION_ERROR',
        result.error.issues.map((e) => e.message).join(', '),
      );
      return;
    }
    req.body = result.data;
    next();
  };

export const validateQuery =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      sendError(
        res,
        'VALIDATION_ERROR',
        result.error.issues.map((e) => e.message).join(', '),
      );
      return;
    }
    req.query = result.data as Request['query'];
    next();
  };
