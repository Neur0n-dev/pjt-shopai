/**
 * [roles.guard.ts]
 * 권한(Role) 체크 가드
 * @Roles() 데코레이터로 지정한 권한과 request.user.role을 비교
 * JwtAuthGuard 이후에 실행되어야 함 (request.user가 주입된 상태)
 *
 * @example
 * @Roles(UserRole.ADMIN)
 * @UseGuards(JwtAuthGuard, RolesGuard)
 */

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../modules/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 라우트에 @Roles() 데코레이터가 없으면 통과
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // request.user에서 role 추출 (JwtAuthGuard가 먼저 실행되어야 함)
    const { user } = context.switchToHttp().getRequest<{ user: { role: UserRole } }>();

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return true;
  }
}