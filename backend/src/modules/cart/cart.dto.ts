import { z } from 'zod';

// ========================
// 장바구니 응답
// ========================
export type CreateCartResponse = {
  cartItemUuid: string;
  userUuid: string;
  productUuid: string;
  itemQuantity: number;
  createdDate: Date;
};

export type UpdateCartResponse = {
  cartItemUuid: string;
  itemQuantity: number;
  updatedDate: Date;
};

export type CartListResponse = {
  cartItemUuid: string;
  itemQuantity: number;
  createdDate: Date;
  product: {
    productUuid: string;
    productName: string;
    productPrice: number;
    productImage: string | null;
    productStock: number;
    productStatus: string;
  };
};

// ========================
// 장바구니 등록
// ========================
export const createCartSchema = z.object({
  productUuid: z.uuid('올바른 상품 UUID를 입력해주세요'),
  itemQuantity: z.number().int('수량은 정수여야 합니다').min(1, '수량은 1 이상이어야 합니다'),
});

// ========================
// 장바구니 수정
// ========================
export const updateCartSchema = z.object({
  itemQuantity: z.number().int('수량은 정수여야 합니다').min(1, '수량은 1 이상이어야 합니다'),
});

export type CreateCartDto = z.infer<typeof createCartSchema>;
export type UpdateCartDto = z.infer<typeof updateCartSchema>;
