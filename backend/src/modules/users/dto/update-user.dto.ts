/**
 * [update-user.dto.ts]
 * 내 정보 수정 요청 시 클라이언트가 전달하는 데이터 형식 정의
 * 이름, 연락처만 수정 가능 (이메일·비밀번호·권한 변경 불가)
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  /**
   * 이름: 변경할 이름
   */
  @ApiPropertyOptional({ description: '변경할 이름', example: '홍길동' })
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * 연락처: 변경할 전화번호
   */
  @ApiPropertyOptional({ description: '변경할 연락처 (선택)', example: '010-1234-5678' })
  @IsOptional()
  @IsString()
  phone?: string;
}
