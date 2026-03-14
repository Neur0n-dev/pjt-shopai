import { z } from 'zod';
import type { Role } from '../../generated/prisma/enums';

// ========================
// 내 정보 응답값
// ========================
export type UserResponse = {
  userUuid: string;
  email: string;
  name: string;
  phone: string | null;
  role: Role;
  createdDate: Date;
};

// ========================
// 내 정보 수정
// ========================
export const UpdateMeSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(50),
  phone: z
    .string()
    .regex(/^01[016789]-?\d{4}-?\d{4}$/, '올바른 전화번호 형식이 아닙니다')
    .optional(),
});

// ========================
// 내 비밀번호 수정
// ========================
export const UpdatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      '영문 대소문자, 숫자, 특수문자를 포함해야 합니다',
    ),
  newPassword: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      '영문 대소문자, 숫자, 특수문자를 포함해야 합니다',
    ),
});

export type UpdateMeDto = z.infer<typeof UpdateMeSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
