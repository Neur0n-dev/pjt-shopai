import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

// 프론트엔드에 반환하는 사용자 정보 DTO
export class UserResponseDto {
  @ApiProperty({ description: '사용자 이름', example: '홍길동' })
  name: string;

  @ApiProperty({ description: '이메일', example: 'user@shopai.com' })
  email: string;

  @ApiProperty({ description: '권한', enum: UserRole, example: UserRole.USER })
  role: UserRole;
}
