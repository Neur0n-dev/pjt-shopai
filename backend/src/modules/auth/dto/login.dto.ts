/**
 * [login.dto.ts]
 * 로그인 요청시 클라이언트가 전달해야 하는 데이터 형식 정의
 * class-validator로 각 필드의 유효성을 자동으로 검사함
 */

import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
} from 'class-validator';

export class LoginDto {
    /**
     * 이메일: 로그인 계정 ID로 사용
     * @IsEmail(): 이메일 형식이 아니면 400 에러 반환
     */
    @ApiProperty({
        description: '이메일 (로그인 ID)',
        example: 'user@shopai.com',
    })
    @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
    email: string;

    /**
     * 비밀번호
     */
    @ApiProperty({ description: '비밀번호 (최소 8자)', example: 'password123' })
    @IsString()
    password: string;
}
