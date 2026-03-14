import { z } from 'zod';

// ========================
// 내 배송지 응답값
// ========================
export type AddressResponse = {
  addressUuid: string;
  addressName: string;
  recipient: string;
  zipCode: string;
  base: string;
  detail: string | null;
  isDefault: boolean;
  createdDate: Date;
};

// ========================
// 내 배송지 등록
// ========================
export const createAddressSchema = z.object({
  name: z.string().min(1, '배송지 별칭을 입력해주세요').max(50),
  recipient: z.string().min(1, '받는 사람 이름을 입력해주세요').max(50),
  zipCode: z.string().min(1, '우편번호를 입력해 주세요').max(10),
  base: z.string().min(1, '기본 주소를 입력해주세요.').max(255),
  detail: z.string().max(255).optional(),
});

// ========================
// 내 배송지 수정
// ========================
export const updateAddressSchema = createAddressSchema;

export type CreateAddressDto = z.infer<typeof createAddressSchema>;
export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;
