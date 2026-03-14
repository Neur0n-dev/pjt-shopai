import type { AuthRequest } from '../../middlewares/auth';
import { NextFunction, Response } from 'express';
import { addressService } from './address.service';
import { sendSuccess } from '../../common/response';

export const addressController = {
  // === 내 배송지 등록 ===
  createAddress: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await addressService.createAddress(req.user!.userUuid, req.body);
      sendSuccess(res, data, 201);
    } catch (error) {
      next(error);
    }
  },

  // === 내 배송지 조회 ===
  getAddress: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await addressService.getAddress(req.user!.userUuid);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 기본 배송지 설정 ===
  updateDefaultAddress: async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await addressService.updateDefaultAddress(
        req.user!.userUuid,
        req.params.addressUuid as string,
      );
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 내 배송지 수정 ===
  updateAddress: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await addressService.updateAddress(
        req.user!.userUuid,
        req.params.addressUuid as string,
        req.body,
      );
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 내 배송지 삭제 ===
  deleteAddress: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await addressService.deleteAddress(
        req.user!.userUuid,
        req.params.addressUuid as string,
      );
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },
};
