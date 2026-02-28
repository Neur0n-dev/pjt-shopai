/**
 * [auth.controller.ts]
 * 인증 관련 HTTP 요청을 받는 컨트롤러
 * 비즈니스 로직 없이 요청을 AuthService로 위임하는 역할만 담당
 */

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/signup
   * 회원가입 엔드포인트
   * 성공 시 201 Created + 가입된 유저 정보(비밀번호 제외) 반환
   */
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '회원가입', description: '이메일, 비밀번호, 이름으로 신규 계정을 생성합니다.' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: '회원가입 성공', type: UserResponseDto })
  @ApiConflictResponse({ description: '이미 사용 중인 이메일 (409)' })
  async signup(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.signup(dto);
  }
}
