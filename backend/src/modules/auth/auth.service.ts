/**
 * [auth.service.ts]
 * 인증 관련 비즈니스 로직 담당 서비스
 * 회원가입, 로그인, 토큰 재발급 등 인증 흐름의 핵심 처리를 담당
 */

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UserRole } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { RefreshToken } from './entities/refresh-token.entity';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

/** bcrypt 해싱 강도 (높을수록 안전하지만 느림, 10이 일반적인 기본값) */
const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
      role: dto.role, // 미입력 시 엔티티 default(USER)로 저장됨
    });

    // 4단계: 비밀번호 제외한 응답 DTO 반환
    const response = new UserResponseDto();
    response.name = savedUser.name;
    response.email = savedUser.email;
    response.role = savedUser.role;

    return response;
  }

  /**
   * 로그인 처리
   * 1. 이메일로 유저 조회 → 없으면 401 UnauthorizedException
   * 2. bcrypt로 비밀번호 검증 → 틀리면 401 UnauthorizedException
   * 3. AccessToken 발급 (JWT)
   * 4. RefreshToken 발급 + DB 저장
   * 5. AccessToken, RefreshToken 반환
   */
  async login(dto: LoginDto) {
    // 1단계: 이메일로 유저 조회
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (!existingUser) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    // 2단계: 비밀번호 검증
    const isMatch = await bcrypt.compare(dto.password, existingUser.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    // 3단계: AccessToken 발급 (payload: uuid, email, role)
    const accessToken = this.generateAccessToken(
      existingUser.uuid,
      existingUser.email,
      existingUser.role,
    );

    // 4단계: RefreshToken 발급 + DB 저장
    const refreshToken = this.jwtService.sign(
      { sub: existingUser.uuid },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
          '7d',
        ) as unknown as number,
      },
    );

    const expiresDate = this.calculateRefreshExpiresDate();

    // 기존 리프레시 토큰 존재 시 삭제 (중복 저장 방지)
    const existingToken = await this.refreshTokenRepository.findByUserUuid(existingUser.uuid);
    if (existingToken) {
      await this.refreshTokenRepository.delete(existingToken);
    }

    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.userUuid = existingUser.uuid;
    refreshTokenEntity.tokenValue = refreshToken;
    refreshTokenEntity.tokenExpiresDate = expiresDate;
    await this.refreshTokenRepository.save(refreshTokenEntity);

    // 5단계: 토큰 반환
    return { accessToken, refreshToken };
  }

  /**
   * 토큰 재발급 처리 (토큰 로테이션)
   * 1. RefreshToken JWT 서명 검증 → 실패 시 401 UnauthorizedException
   * 2. DB에서 RefreshToken 존재 여부 확인 → 없으면 401 UnauthorizedException
   * 3. DB 토큰 만료일 확인 → 만료됐으면 DB 삭제 후 401 UnauthorizedException
   * 4. 기존 RefreshToken DB에서 삭제 (토큰 로테이션 — 1회용 처리)
   * 5. 새 AccessToken 발급
   * 6. 새 RefreshToken 발급 + DB 저장
   * 7. { accessToken, refreshToken } 반환
   */
  async refresh(dto: RefreshDto) {
    // 1단계: RefreshToken JWT 서명 검증 (서명 불일치 or 만료 시 예외 → 401)
    let payload: { sub: string };
    try {
      payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 2단계: DB에서 RefreshToken 존재 여부 확인 (탈취 후 삭제된 토큰 방어)
    const isToken = await this.refreshTokenRepository.findByTokenValue(
      dto.refreshToken,
    );
    if (!isToken) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 3단계: 만료일 확인 (만료됐으면 DB 삭제 후 401)
    if (isToken.tokenExpiresDate < new Date()) {
      await this.refreshTokenRepository.delete(isToken);
      throw new UnauthorizedException('만료된 토큰입니다.');
    }

    // 4단계: 기존 RefreshToken DB 삭제 (토큰 로테이션)
    await this.refreshTokenRepository.delete(isToken);

    // 5단계: 새 AccessToken 발급 (uuid로 유저 조회 후 email, role 포함한 payload 생성)
    const user = await this.usersRepository.findByUuid(payload.sub);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    const accessToken = this.generateAccessToken(user.uuid, user.email, user.role);

    // 6단계: 새 RefreshToken 발급 + DB 저장
    const newRefreshToken = this.jwtService.sign(
      { sub: user.uuid },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
          '7d',
        ) as unknown as number,
      },
    );

    const expiresDate = this.calculateRefreshExpiresDate();

    const newRefreshTokenEntity = new RefreshToken();
    newRefreshTokenEntity.userUuid = user.uuid;
    newRefreshTokenEntity.tokenValue = newRefreshToken;
    newRefreshTokenEntity.tokenExpiresDate = expiresDate;
    await this.refreshTokenRepository.save(newRefreshTokenEntity);

    // 7단계: 새 토큰 반환
    return { accessToken, refreshToken: newRefreshToken };
  }

  /**
   * 로그아웃 처리
   * 1. RefreshToken JWT 서명 검증 → 실패 시 401 UnauthorizedException
   * 2. DB에서 RefreshToken 조회 → 없으면 401 UnauthorizedException
   * 3. DB에서 RefreshToken 삭제
   * 4. 성공 메시지 반환
   */
  async logout(dto: RefreshDto) {
    // 1단계: RefreshToken JWT 서명 검증
    try {
      this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 2단계: DB에서 RefreshToken 조회
    const isToken = await this.refreshTokenRepository.findByTokenValue(
      dto.refreshToken,
    );
    if (!isToken) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 3단계: DB에서 RefreshToken 삭제
    await this.refreshTokenRepository.delete(isToken);

    // 4단계: 성공 메시지 반환
    return { message: '로그아웃 되었습니다.' };
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /** AccessToken 발급 (uuid, email, role 포함한 payload 서명) */
  private generateAccessToken(uuid: string, email: string, role: UserRole): string {
    return this.jwtService.sign(
      { sub: uuid, email, role },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_EXPIRES_IN',
          '15m',
        ) as unknown as number,
      },
    );
  }

  /** RefreshToken 만료일 계산 (현재 시각 + 설정된 만료 기간) */
  private calculateRefreshExpiresDate(): Date {
    const expiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
      '7d',
    );
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + parseInt(expiresIn));
    return expiresDate;
  }
}
