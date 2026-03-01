/**
 * [refresh.dto.ts]
 * 토큰 재발급 요청 시 클라이언트가 전달해야 하는 데이터 형식 정의
 * 기존 RefreshToken을 검증 후 새 AccessToken + RefreshToken 재발급에 사용
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  /**
   * RefreshToken: 로그인 시 발급받은 리프레시 토큰
   * @IsString(): 문자열이 아니면 400 에러 반환
   */
  @ApiProperty({
    description: '재발급에 사용할 RefreshToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}
