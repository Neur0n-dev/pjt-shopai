import { NextFunction, Response } from 'express';
import type { AuthRequest } from '../../middlewares/auth';
import { categoryService } from './category.service';
import { sendSuccess } from '../../common/response';

export const categoryController = {
  // === 카테고리 등록 ===
  createCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await categoryService.createCategory(req.body);
      sendSuccess(res, data, 201);
    } catch (error) {
      next(error);
    }
  },

  // === 카테고리 조회 ===
  getCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await categoryService.getCategory();
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 카테고리 수정 ===
  updateCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await categoryService.updateCategory(
        req.params.categoryUuid as string,
        req.body,
      );
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 카테고리 삭제 ===
  deleteCategory: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await categoryService.deleteCategory(req.params.categoryUuid as string);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },
};
