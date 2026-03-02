/**
 * [users.service.ts]
 * 유저 관련 비즈니스 로직 담당 서비스
 */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

/** bcrypt 해싱 강도 (높을수록 안전하지만 느림, 10이 일반적인 기본값) */
const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * 내 정보 조회
   * 1. UUID로 유저 조회 → 없으면 404 NotFoundException
   * 2. 비밀번호 제외한 유저 정보(UserResponseDto) 반환
   */
  async me(uuid: string): Promise<UserResponseDto> {
    // 1단계: UUID로 유저 조회
    const user = await this.usersRepository.findByUuid(uuid);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    // 2단계: 비밀번호 제외한 응답 DTO 반환
    return this.mapToDto(user.name, user.email, user.role);
  }

  /**
   * 내 정보 수정
   * 1. UUID로 유저 조회 → 없으면 404 NotFoundException
   * 2. 이름, 연락처 수정
   * 3. 수정된 유저 정보(UserResponseDto) 반환
   */
  async updateMe(uuid: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    // 1단계: UUID로 유저 조회
    const user = await this.usersRepository.findByUuid(uuid);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    // 2단계: 전달된 필드만 수정 (미전달 필드는 기존 값 유지)
    const updatedName = dto.name ?? user.name;
    await this.usersRepository.update(uuid, {
      name: updatedName,
      phone: dto.phone ?? user.phone,
    });

    // 3단계: 수정된 유저 정보 반환
    return this.mapToDto(updatedName, user.email, user.role);
  }

  /**
   * 비밀번호 변경
   * 1. UUID로 유저 조회 → 없으면 404 NotFoundException
   * 2. dto.newPassword와 dto.newPasswordConfirm 일치 여부 확인 → 다르면 400 BadRequestException
   * 3. 새 비밀번호 bcrypt 해싱
   * 4. DB 비밀번호 업데이트
   * 5. 성공 메시지 반환
   */
  async updatePassword(
    uuid: string,
    dto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    // 1단계: UUID로 유저 조회
    const user = await this.usersRepository.findByUuid(uuid);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    // 2단계: 새 비밀번호 일치 여부 확인
    if (dto.newPassword !== dto.newPasswordConfirm) {
      throw new BadRequestException('새 비밀번호가 일치하지 않습니다.');
    }

    // 3단계: 새 비밀번호 bcrypt 해싱 (auth.service.ts의 BCRYPT_SALT_ROUNDS 참고)
    const hashedPassword = await bcrypt.hash(
      dto.newPassword,
      BCRYPT_SALT_ROUNDS,
    );

    // 4단계: DB 비밀번호 업데이트
    await this.usersRepository.update(uuid, {
      password: hashedPassword,
    });

    // 5단계: 성공 메시지 반환
    return { message: '비밀번호가 변경되었습니다.' };
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /** 유저 엔티티 → UserResponseDto 변환 */
  private mapToDto(name: string, email: string, role: UserRole): UserResponseDto {
    const response = new UserResponseDto();
    response.name = name;
    response.email = email;
    response.role = role;
    return response;
  }
}
