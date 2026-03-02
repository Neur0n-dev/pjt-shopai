/**
 * [auth.module.ts]
 * 인증 기능 모듈
 * UsersModule을 import해서 UsersRepository를 재사용
 */

import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    // AccessToken/RefreshToken 시크릿을 각 sign() 호출 시 직접 지정하므로 기본 시크릿 없이 등록
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({}),
    }),

    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenRepository, JwtAuthGuard, RolesGuard],
  // JwtModule, Guard export → 다른 모듈에서 AuthModule import 후 바로 사용 가능
  exports: [JwtModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
