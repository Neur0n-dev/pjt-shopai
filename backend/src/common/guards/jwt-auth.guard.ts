/**
 * [jwt-auth.guard.ts]
 * JWT AccessToken 인증 가드
 * @UseGuards(JwtAuthGuard)를 붙인 라우트는 유효한 AccessToken 없이 접근 불가 (401)
 * 검증 성공 시 토큰 payload를 request.user에 주입
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('인증 토큰이 없습니다.');
    }

    try {
      // AccessToken 검증 후 payload를 request.user에 주입
      const payload = this.jwtService.verify<{ sub: string; email: string; role: string }>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('유효하지 않거나 만료된 토큰입니다.');
    }

    return true;
  }

  /** Authorization 헤더에서 Bearer 토큰 추출 */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}