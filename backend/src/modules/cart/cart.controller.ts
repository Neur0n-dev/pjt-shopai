import { NextFunction, Response } from 'express';
import type { AuthRequest } from '../../middlewares/auth';
import { cartService } from './cart.service';
import { sendSuccess } from '../../common/response';

export const cartController = {
  // === 장바구니 등록 ===
  createCart: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await cartService.createCart(req.user!.userUuid, req.body);
      sendSuccess(res, data, 201);
    } catch (error) {
      next(error);
    }
  },

  // === 장바구니 목록 조회 ===
  getCartList: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await cartService.getCartList(req.user!.userUuid);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 장바구니 수정 ===
  updateCart: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await cartService.updateCart(
        req.user!.userUuid,
        req.params.cartUuid as string,
        req.body,
      );
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 장바구니 한건 삭제 ===
  deleteCart: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await cartService.deleteCart(req.user!.userUuid, req.params.cartUuid as string);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 장바구니 전체 삭제 ===
  deleteAllCart: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await cartService.deleteAllCart(req.user!.userUuid);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },
};
