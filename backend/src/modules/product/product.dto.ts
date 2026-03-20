import { z } from 'zod';

// ========================
// 상품 응답
// ========================
export type CreateProductResponse = {
  productUuid: string;
  categoryUuid: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  status: string;
  createdDate: Date;
};

export type ProductListItemResponse = {
  productUuid: string;
  categoryUuid: string;
  categoryName: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  status: string;
  createdDate: Date;
};

export type ProductListResponse = {
  list: ProductListItemResponse[];
  total: number;
  page: number;
  limit: number;
};

export type ProductDetailResponse = {
  productUuid: string;
  categoryUuid: string;
  categoryName: string;
  name: string;
  description: string | null;
  aiDescription: string | null;
  price: number;
  stock: number;
  image: string | null;
  status: string;
  createdDate: Date;
};

export type UpdateProductResponse = {
  productUuid: string;
  categoryUuid: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  status: string;
  updatedDate: Date;
};

// ========================
// 상품 등록
// ========================
export const createProductSchema = z.object({
  categoryUuid: z.string().uuid('올바른 카테고리 UUID를 입력해주세요'),
  name: z.string().min(1, '상품명을 입력해주세요').max(255),
  description: z.string().max(5000).optional(),
  price: z.number().int('가격은 정수여야 합니다').positive('가격은 0보다 커야 합니다'),
  stock: z.number().int('재고는 정수여야 합니다').min(0, '재고는 0 이상이어야 합니다'),
  image: z.string().url('올바른 이미지 URL을 입력해주세요').max(500).optional(),
});

// ========================
// 상품 목록 조회
// ========================
export const productListQuerySchema = z.object({
  categoryUuid: z.string().uuid('올바른 카테고리 UUID를 입력해주세요').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  search: z.string().optional(),
  sort: z.enum(['price_asc', 'price_desc']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// ========================
// 상품 수정
// ========================
export const updateProductSchema = z.object({
  categoryUuid: z.string().uuid('올바른 카테고리 UUID를 입력해주세요').optional(),
  name: z.string().min(1, '상품명을 입력해주세요').max(255).optional(),
  description: z.string().max(5000).optional(),
  price: z.number().int('가격은 정수여야 합니다').positive('가격은 0보다 커야 합니다').optional(),
  stock: z.number().int('재고는 정수여야 합니다').min(0, '재고는 0 이상이어야 합니다').optional(),
  image: z.string().url('올바른 이미지 URL을 입력해주세요').max(500).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type ProductListQueryDto = z.infer<typeof productListQuerySchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
