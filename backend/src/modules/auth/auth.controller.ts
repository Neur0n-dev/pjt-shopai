import { Response, NextFunction } from 'express';
import type { AuthRequest } from '../../middlewares/auth';
import { authService } from './auth.service';
import { sendSuccess } from '../../common/response';

export const authController = {
  // === 회원가입 ===
  signUp: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.signUp(req.body);
      sendSuccess(res, data, 201);
    } catch (error) {
      next(error);
    }
  },

  // === 로그인 ===
  signIn: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.signIn(req.body);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 리프레시 ===
  refresh: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.refresh(req.body);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 로그아웃 ===
  signOut: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.signOut(req.body);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },
};
