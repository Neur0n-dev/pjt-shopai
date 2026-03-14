import { Response, NextFunction } from 'express';
import type { AuthRequest } from '../../middlewares/auth';
import { userService } from './user.service';
import { sendSuccess } from '../../common/response';

export const userController = {
  // === 내 정보 조회 ===
  getMe: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userService.getMe(req.user!.userUuid);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 내 정보 수정 ===
  updateMe: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userService.updateMe(req.user!.userUuid, req.body);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 내 비밀번호 수정 ===
  updateMePassword: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userService.updateMePassword(req.user!.userUuid, req.body);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 회원 탈퇴 ===
  deleteMe: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await userService.deleteMe(req.user!.userUuid);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },
};
