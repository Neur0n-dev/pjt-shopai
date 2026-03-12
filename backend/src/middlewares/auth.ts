import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../common/response';

export interface AuthRequest extends Request {
  user?: { userUuid: string; email: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    sendError(res, 'UNAUTHORIZED', '로그인이 필요합니다.', 401);
    return;
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error('JWT_ACCESS_SECRET 환경변수가 설정되지 않았습니다.');

  try {
    const payload = jwt.verify(token, secret) as NonNullable<AuthRequest['user']>;
    req.user = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      sendError(res, 'TOKEN_EXPIRED', '토큰이 만료됐습니다.', 401);
    } else {
      sendError(res, 'INVALID_TOKEN', '유효하지 않은 토큰입니다.', 401);
    }
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'ADMIN') {
    sendError(res, 'FORBIDDEN', '권한이 없습니다.', 403);
    return;
  }
  next();
};