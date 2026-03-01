/**
 * [users.service.ts]
 * 유저 관련 비즈니스 로직 담당 서비스
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const response = new UserResponseDto();
    response.name = user.name;
    response.email = user.email;
    response.role = user.role;

    return response;
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
    await this.usersRepository.update(uuid, {
      name: dto.name ?? user.name,
      phone: dto.phone ?? user.phone,
    });

    // 3단계: 수정된 유저 정보 반환
    const response = new UserResponseDto();
    response.name = dto.name ?? user.name;
    response.email = user.email;
    response.role = user.role;

    return response;
  }
}
