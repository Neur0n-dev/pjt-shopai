import bcrypt from 'bcrypt';
import prisma from '../../common/prisma';
import { NotFoundError, UnauthorizedError } from '../../common/errors';
import { UpdateMeDto, UpdatePasswordDto, UserResponse } from './user.dto';

const SALT_ROUNDS = 10;

export const userService = {
  // === 내 정보 조회 ===
  getMe: async (userUuid: string): Promise<UserResponse> => {
    // 1. 유저 정보 조회
    const user = await prisma.t_shopai_users.findFirst({
      where: { user_uuid: userUuid, delete_flag: 'N' },
    });

    if (!user) throw new NotFoundError('유저를 찾을 수 없습니다.');

    // 2. 응답 데이터
    return {
      userUuid: user.user_uuid,
      email: user.user_email,
      name: user.user_name,
      phone: user.user_phone,
      role: user.user_role,
      createdDate: user.created_date,
    };
  },

  // === 내 정보 수정 ===
  updateMe: async (userUuid: string, dto: UpdateMeDto): Promise<UserResponse> => {
    // 1. 유저 조회
    const user = await prisma.t_shopai_users.findFirst({
      where: { user_uuid: userUuid, delete_flag: 'N' },
    });

    if (!user) throw new NotFoundError('유저를 찾을 수 없습니다.');

    // 2. DB 업데이트
    const updatedUser = await prisma.t_shopai_users.update({
      where: { user_uuid: userUuid },
      data: {
        user_name: dto.name,
        user_phone: dto.phone ?? null,
      },
    });

    // 3. 응답 데이터
    return {
      userUuid: updatedUser.user_uuid,
      email: updatedUser.user_email,
      name: updatedUser.user_name,
      phone: updatedUser.user_phone,
      role: updatedUser.user_role,
      createdDate: updatedUser.created_date,
    };
  },

  // === 내 비밀번호 수정 ===
  updateMePassword: async (
    userUuid: string,
    dto: UpdatePasswordDto,
  ): Promise<{ message: string }> => {
    // 1. 유저 조회
    const user = await prisma.t_shopai_users.findFirst({
      where: { user_uuid: userUuid, delete_flag: 'N' },
    });

    if (!user) throw new NotFoundError('유저를 찾을 수 없습니다.');

    // 2. 비밀번호 검증
    const isMatch = await bcrypt.compare(dto.currentPassword, user.user_password);
    if (!isMatch) {
      throw new UnauthorizedError('현재 비밀번호가 일치하지 않아요.');
    }

    // 3. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);

    // 4. DB 데이터 수정
    await prisma.t_shopai_users.update({
      where: { user_uuid: userUuid },
      data: {
        user_password: hashedPassword,
      },
    });

    // 5. 응답 데이터
    return { message: '비밀번호가 변경됐어요.' };
  },

  // === 회원 탈퇴 ===
  deleteMe: async (userUuid: string): Promise<{ message: string }> => {
    // 1. 유저 조회
    const user = await prisma.t_shopai_users.findFirst({
      where: { user_uuid: userUuid, delete_flag: 'N' },
    });

    if (!user) throw new NotFoundError('유저를 찾을 수 없습니다.');

    // 2. 소프트 삭제 + 리프레시 토큰 삭제
    await prisma.$transaction([
      prisma.t_shopai_users.update({
        where: { user_uuid: userUuid },
        data: { delete_flag: 'Y' },
      }),
      prisma.t_shopai_refresh_tokens.deleteMany({
        where: { user_uuid: userUuid },
      }),
    ]);

    // 3. 응답 데이터
    return { message: '회원 탈퇴가 완료됐어요.' };
  },
};
