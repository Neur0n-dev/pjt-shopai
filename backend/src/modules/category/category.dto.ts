import { z } from 'zod';

// ========================
// 카테고리 응답
// ========================
export type CategoryChildResponse = {
  categoryUuid: string;
  name: string;
  slug: string;
  sortOrder: number;
  depth: number;
  createdDate: Date;
};

export type CategoryResponse = {
  categoryUuid: string;
  parentUuid: string | null;
  name: string;
  slug: string;
  sortOrder: number;
  depth: number;
  createdDate: Date;
  children: CategoryChildResponse[];
};

// ========================
// 카테고리 등록
// ========================
export const createCategorySchema = z.object({
  name: z.string().min(1, '카테고리 명을 입력해주세요').max(50),
  parentUuid: z.uuid('올바른 상위 카테고리 UUID를 입력해주세요').optional(),
  slug: z.string().min(1, 'URL 슬러그를 입력해주세요').max(50),
  sortOrder: z.number().int('정렬 순서는 정수여야 합니다'),
});

// ========================
// 카테고리 수정
// ========================
export const updateCategorySchema = createCategorySchema.omit({ parentUuid: true });

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
