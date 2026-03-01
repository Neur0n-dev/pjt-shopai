/**
 * [update-password.dto.ts]
 * 비밀번호 변경 요청 시 클라이언트가 전달하는 데이터 형식 정의
 * 새 비밀번호 + 새 비밀번호 확인 2개 필드를 받아 서비스에서 일치 여부 검증
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  /**
   * 새 비밀번호: 최소 8자 이상
   */
  @ApiProperty({ description: '새 비밀번호 (최소 8자)', example: 'newPassword123' })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  newPassword: string;

  /**
   * 새 비밀번호 확인: newPassword와 일치해야 함
   */
  @ApiProperty({ description: '새 비밀번호 확인', example: 'newPassword123' })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  newPasswordConfirm: string;
}
