/**
 * [create-user.dto.ts]
 * 회원가입 요청 시 클라이언트가 전달해야 하는 데이터 형식 정의
 * class-validator로 각 필드의 유효성을 자동으로 검사함
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  /**
   * 이메일: 로그인 계정 ID로 사용
   * @IsEmail(): 이메일 형식이 아니면 400 에러 반환
   */
  @ApiProperty({ description: '이메일 (로그인 ID)', example: 'user@shopai.com' })
  @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
  email: string;

  /**
   * 비밀번호: 최소 8자 이상
   * @MinLength(8): 8자 미만이면 400 에러 반환
   * 저장 시 AuthService에서 bcrypt로 해싱 후 저장됨
   */
  @ApiProperty({ description: '비밀번호 (최소 8자)', example: 'password123' })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  password: string;

  /**
   * 이름: 실명 또는 닉네임
   */
  @ApiProperty({ description: '사용자 이름', example: '홍길동' })
  @IsString()
  name: string;

  /**
   * 연락처: 선택 입력 항목
   * @IsOptional(): 요청에 포함되지 않아도 에러 없음
   */
  @ApiPropertyOptional({ description: '연락처 (선택)', example: '010-1234-5678' })
  @IsOptional()
  @IsString()
  phone?: string;

  /**
   * 권한: 기본값 USER, ADMIN 지정 가능
   * @IsEnum(UserRole): 'USER' | 'ADMIN' 외 값이면 400 에러 반환
   */
  @ApiPropertyOptional({ description: '권한 (기본값: USER)', enum: UserRole, example: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole, { message: '권한은 USER 또는 ADMIN이어야 합니다.' })
  role?: UserRole;
}
