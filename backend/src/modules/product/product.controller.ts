import { NextFunction, Request, Response } from 'express';
import type { ProductListQueryDto } from './product.dto';
import type { AuthRequest } from '../../middlewares/auth';
import { productService } from './product.service';
import { sendSuccess } from '../../common/response';

export const productController = {
  // === 상품 등록 ===
  createProduct: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await productService.createProduct(req.user!.userUuid, req.body);
      sendSuccess(res, data, 201);
    } catch (error) {
      next(error);
    }
  },

  // === 상품 목록 조회 ===
  getProductList: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await productService.getProductList(req.query as unknown as ProductListQueryDto);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 상품 상세 조회 ===
  getProductDetail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await productService.getProductDetail(req.params.productUuid as string);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 상품 수정 ===
  updateProduct: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await productService.updateProduct(req.params.productUuid as string, req.body);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },

  // === 상품 삭제 ===
  deleteProduct: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await productService.deleteProduct(req.params.productUuid as string);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  },
};
