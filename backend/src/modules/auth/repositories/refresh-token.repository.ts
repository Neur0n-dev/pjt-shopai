import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

// Refresh Token 엔티티에 대한 DB 접근 담당
@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>,
  ) {}

  // 리프레시 토큰 저장 (로그인 시 발급된 토큰 저장)
  async save(refreshToken: RefreshToken): Promise<RefreshToken> {
    return this.repository.save(refreshToken);
  }

  // 사용자 UUID로 조회 (로그인 시 기존 토큰 존재 여부 확인)
  async findByUserUuid(userUuid: string): Promise<RefreshToken | null> {
    return this.repository.findOne({ where: { userUuid } });
  }

  // 토큰 값으로 조회 (토큰 재발급 시 유효성 검증)
  async findByTokenValue(tokenValue: string): Promise<RefreshToken | null> {
    return this.repository.findOne({
      where: {tokenValue},
    });
  }

  // 사용자 UUID로 토큰 삭제 (로그아웃 시 무효화)
  async delete(refreshToken: RefreshToken): Promise<void> {
    await this.repository.delete(refreshToken);
  }
}
