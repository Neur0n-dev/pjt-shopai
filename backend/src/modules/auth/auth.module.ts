/**
 * [auth.module.ts]
 * 인증 기능 모듈
 * UsersModule을 import해서 UsersRepository를 재사용
 */

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
