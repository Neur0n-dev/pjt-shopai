/**
 * [users.controller.ts]
 * 유저 관련 HTTP 요청을 받는 컨트롤러
 * 비즈니스 로직 없이 요청을 UsersService로 위임하는 역할만 담당
 */

import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users/me
   * 내 정보 조회 엔드포인트
   * 성공 시 200 + 유저 정보(비밀번호 제외) 반환
   */
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 정보 조회',
    description: '현재 로그인한 유저의 정보를 반환합니다.',
  })
  @ApiOkResponse({ description: '내 정보 조회 성공', type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: '인증 토큰이 없거나 유효하지 않습니다 (401)' })
  async me(@CurrentUser() user: JwtPayload): Promise<UserResponseDto> {
    return this.usersService.me(user.sub);
  }

  /**
   * PATCH /users/me
   * 내 정보 수정 엔드포인트
   * 성공 시 200 + 수정된 유저 정보(비밀번호 제외) 반환
   */
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 정보 수정',
    description: '이름, 연락처를 수정합니다.',
  })
  @ApiOkResponse({ description: '내 정보 수정 성공', type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: '인증 토큰이 없거나 유효하지 않습니다 (401)' })
  async updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateUserDto,): Promise<UserResponseDto> {
    return this.usersService.updateMe(user.sub, dto);
  }

  /**
   * PATCH /users/me/password
   * 내 비밀번호 수정 엔드포인트
   * 성공 시 200 + 수정된 유저 정보(비밀번호 제외) 반환
   */
  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 비밀번호 수정',
    description: '새로운 비밀번호로 변경합니다.',
  })
  @ApiOkResponse({ description: '내 비밀번호 수정 성공' })
  @ApiUnauthorizedResponse({ description: '인증 토큰이 없거나 유효하지 않습니다 (401)' })
  async updatePassword(@CurrentUser() user: JwtPayload, @Body() dto: UpdatePasswordDto): Promise<{ message: string }> {
    return this.usersService.updatePassword(user.sub, dto);
  }
}
