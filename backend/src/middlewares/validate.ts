import { Request, Response, NextFunction } from 'express';
import { type ZodIssue, ZodSchema } from 'zod';
import { sendError } from '../common/response';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      sendError(
        res,
        'VALIDATION_ERROR',
        result.error.issues.map((e: ZodIssue) => e.message).join(', '),
      );
      return;
    }
    req.body = result.data;
    next();
  };
