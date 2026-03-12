import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../common/prisma';
import { ConflictError, UnauthorizedError } from '../../common/errors';
import type { RefreshTokenDto, SignInDto, SignOutDto, SignUpDto } from './auth.dto';

const SALT_ROUNDS = 10;

// ============================================================
// Private Methods
// ============================================================
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} 환경변수가 설정되지 않았습니다.`);
  return value;
};

export const authService = {
  // === 회원가입 ===
  signUp: async (dto: SignUpDto): Promise<{ message: string }> => {
    // 1. 이메일 중복 체크
    const exists = await prisma.t_shopai_users.findFirst({
      where: { user_email: dto.email, delete_flag: 'N' },
    });

    if (exists) {
      throw new ConflictError('이미 사용 중인 이메일입니다');
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

    // 3. DB 데이터 저장
    await prisma.t_shopai_users.create({
      data: {
        user_email: dto.email,
        user_password: hashedPassword,
        user_name: dto.name,
        user_phone: dto.phone ?? null,
      },
    });

    // 4. 응답 데이터
    return { message: '회원가입이 완료됐어요.' };
  },

  // === 로그인 ===
  signIn: async (dto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> => {
    // 1. 유저 존재 여부 확인
    const user = await prisma.t_shopai_users.findFirst({
      where: { user_email: dto.email, delete_flag: 'N' },
    });

    if (!user) {
      // 이메일 존재 여부 노출 방지를 위해 비밀번호 불일치와 동일한 메시지 사용
      throw new UnauthorizedError('아이디 또는 비밀번호가 다릅니다.');
    }

    // 2. 비밀번호 검증
    const isMatch = await bcrypt.compare(dto.password, user.user_password);
    if (!isMatch) {
      throw new UnauthorizedError('아이디 또는 비밀번호가 다릅니다.');
    }

    // 3. 토큰 발급
    const accessSecret = getEnv('JWT_ACCESS_SECRET');
    const refreshSecret = getEnv('JWT_REFRESH_SECRET');
    const payload = { userUuid: user.user_uuid, email: user.user_email, role: user.user_role };

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') as NonNullable<jwt.SignOptions['expiresIn']>,
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as NonNullable<jwt.SignOptions['expiresIn']>,
    });

    // 4. 리프레시 토큰 DB 저장
    const decoded = jwt.decode(refreshToken) as { exp: number } | null;
    if (!decoded) throw new Error('토큰 디코딩에 실패했습니다.');
    const tokenExpiresDate = new Date(decoded.exp * 1000);

    await prisma.t_shopai_refresh_tokens.create({
      data: {
        user_uuid: user.user_uuid,
        token_value: refreshToken,
        token_expires_date: tokenExpiresDate,
      },
    });

    // 5. 응답 데이터
    return { accessToken, refreshToken };
  },

  // === 리프레시 토큰 재발급 ===
  refresh: async (dto: RefreshTokenDto): Promise<{ accessToken: string }> => {
    // 1. 리프레시 토큰 서명 검증
    const refreshSecret = getEnv('JWT_REFRESH_SECRET');

    let payload: { userUuid: string; email: string; role: string };
    try {
      payload = jwt.verify(dto.refreshToken, refreshSecret) as typeof payload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('리프레시 토큰이 만료됐습니다.');
      }
      throw new UnauthorizedError('유효하지 않은 리프레시 토큰입니다.');
    }

    // 2. DB에 저장된 토큰인지 확인
    // 탈취된 토큰으로 재발급 요청하는 경우를 차단하기 위해 DB 검증 필수
    const stored = await prisma.t_shopai_refresh_tokens.findFirst({
      where: { token_value: dto.refreshToken },
    });

    if (!stored) {
      throw new UnauthorizedError('유효하지 않은 리프레시 토큰입니다.');
    }

    // 3. 새 accessToken 발급
    const accessSecret = getEnv('JWT_ACCESS_SECRET');
    const accessToken = jwt.sign(
      { userUuid: payload.userUuid, email: payload.email, role: payload.role },
      accessSecret,
      {
        expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') as NonNullable<jwt.SignOptions['expiresIn']>,
      },
    );

    // 4. 응답 데이터
    return { accessToken };
  },

  // === 로그아웃 ===
  signOut: async (dto: SignOutDto): Promise<{ message: string }> => {
    // 1. 리프레시 토큰 서명 검증 (만료된 토큰도 DB 삭제는 진행)
    const refreshSecret = getEnv('JWT_REFRESH_SECRET');

    try {
      jwt.verify(dto.refreshToken, refreshSecret);
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError)) {
        throw new UnauthorizedError('유효하지 않은 리프레시 토큰입니다.');
      }
    }

    // 2. DB에 저장된 토큰인지 확인
    const stored = await prisma.t_shopai_refresh_tokens.findFirst({
      where: { token_value: dto.refreshToken },
    });

    // 이미 로그아웃된 경우 성공으로 처리
    if (!stored) {
      return { message: '로그아웃 됐습니다.' };
    }

    // 3. DB에서 해당 refreshToken 삭제
    await prisma.t_shopai_refresh_tokens.delete({
      where: { token_uuid: stored.token_uuid },
    });

    return { message: '로그아웃 됐습니다.' };
  },
};
