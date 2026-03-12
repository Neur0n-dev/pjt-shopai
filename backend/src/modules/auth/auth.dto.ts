import { z } from 'zod';

// ========================
// 회원가입
// ========================
export const signUpSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다').max(100), // Zod v4: z.email() 권장, 통일성 위해 string() 유지
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      '영문 대소문자, 숫자, 특수문자를 포함해야 합니다',
    ),
  name: z.string().min(1, '이름을 입력해주세요').max(50),
  phone: z
    .string()
    .regex(/^01[016789]-?\d{4}-?\d{4}$/, '올바른 전화번호 형식이 아닙니다')
    .optional(),
});

// ========================
// 로그인
// ========================
export const signInSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다').max(100),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

// ========================
// 리프레시 토큰
// ========================
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰을 입력해주세요'),
});

// ========================
// 로그아웃
// ========================
export const signOutSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰을 입력해주세요'),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
export type SignInDto = z.infer<typeof signInSchema>;
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
export type SignOutDto = z.infer<typeof signOutSchema>;
