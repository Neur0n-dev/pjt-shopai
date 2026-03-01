/**
 * [roles.decorator.ts]
 * 라우트에 필요한 권한을 메타데이터로 지정하는 커스텀 데코레이터
 * RolesGuard와 함께 사용
 *
 * @example
 * @Roles(UserRole.ADMIN)
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Delete('/categories/:id')
 */

import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/users/entities/user.entity';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);