/**
 * [users.module.ts]
 * 유저 기능을 구성하는 부품들을 한데 모아 NestJS에 등록하는 조립 파일
 * "유저 기능에는 이런 Controller, Service, Repository가 있고, 외부에도 이걸 공개할게" 를 선언
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    /**
     * TypeOrmModule.forFeature([User])
     * "이 모듈에서 User 엔티티를 사용하겠다" 고 등록
     * 이걸 해야 UsersRepository에서 @InjectRepository(User) 로 주입받을 수 있음
     */
    TypeOrmModule.forFeature([User]),
    // JwtAuthGuard 사용을 위해 import
    AuthModule,
  ],

  // HTTP 요청을 받는 컨트롤러 등록
  controllers: [UsersController],

  /**
   * providers: NestJS의 DI(의존성 주입) 컨테이너에 등록
   * 등록된 클래스는 생성자에서 자동으로 주입받을 수 있음
   * ex) UsersController 생성자에 UsersService 자동 주입
   */
  providers: [UsersService, UsersRepository],

  /**
   * exports: 다른 모듈에서도 사용할 수 있게 공개
   * ex) AuthModule에서 UsersRepository를 import해서 이메일로 유저 조회
   * exports 없으면 이 모듈 내부에서만 사용 가능
   */
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
