/**
 * [auth.service.ts]
 * 인증 관련 비즈니스 로직 담당 서비스
 * 회원가입, 로그인 등 인증 흐름의 핵심 처리를 담당
 */

import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UsersRepository } from '../users/repositories/users.repository';

/** bcrypt 해싱 강도 (높을수록 안전하지만 느림, 10이 일반적인 기본값) */
const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    /** UsersModule에서 export한 UsersRepository를 주입받아 DB 접근 */
    private readonly usersRepository: UsersRepository,
  ) {}

  /**
   * 회원가입 처리
   * 1. 이메일 중복 체크 → 중복이면 409 ConflictException
   * 2. 비밀번호 bcrypt 해싱
   * 3. DB 저장
   * 4. 비밀번호를 제외한 유저 정보(UserResponseDto) 반환
   */
  async signup(dto: CreateUserDto): Promise<UserResponseDto> {
    // 1단계: 이메일 중복 체크
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    // 2단계: 비밀번호 해싱 (평문 절대 저장 금지)
    const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);

    // 3단계: 유저 저장
    const savedUser = await this.usersRepository.save({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      phone: dto.phone ?? null,
      role: dto.role,  // 미입력 시 엔티티 default(USER)로 저장됨
    });

    // 4단계: 비밀번호 제외한 응답 DTO 반환
    const response = new UserResponseDto();
    response.name = savedUser.name;
    response.email = savedUser.email;
    response.role = savedUser.role;

    return response;
  }
}
