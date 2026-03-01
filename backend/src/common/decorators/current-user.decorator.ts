/**
 * [current-user.decorator.ts]
 * 현재 로그인한 유저 정보를 컨트롤러 파라미터에 주입하는 커스텀 데코레이터
 * JwtAuthGuard가 request.user에 주입한 payload를 꺼내주는 역할
 *
 * @example
 * @UseGuards(JwtAuthGuard)
 * @Get('/users/me')
 * async getMe(@CurrentUser() user: JwtPayload) {
 *   return user.sub; // 유저 UUID
 * }
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** JwtAuthGuard가 request.user에 주입하는 AccessToken payload 타입 */
export interface JwtPayload {
  sub: string;    // 유저 UUID (JWT 표준 subject 필드)
  email: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return request.user;
  },
);