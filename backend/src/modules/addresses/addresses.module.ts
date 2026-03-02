import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './entities/addresses.entity';
import { AddressesRepository } from './repositories/addresses.repository';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    /**
     * TypeOrmModule.forFeature([Addresses])
     * "이 모듈에서 Addresses 엔티티를 사용하겠다" 고 등록
     * 이걸 해야 AddressesRepository에서 @InjectRepository(Addresses) 로 주입받을 수 있음
     */
    TypeOrmModule.forFeature([Addresses]),
    // JwtAuthGuard 사용을 위해 import
    AuthModule,
  ],

  // HTTP 요청을 받는 컨트롤러 등록
  controllers: [AddressesController],

  /**
   * providers: NestJS의 DI(의존성 주입) 컨테이너에 등록
   * 등록된 클래스는 생성자에서 자동으로 주입받을 수 있음
   * ex) AddressesController 생성자에 AddressesService 자동 주입
   */
  providers: [AddressesService, AddressesRepository],

  /**
   * exports: 다른 모듈에서도 사용할 수 있게 공개
   * ex) OrdersModule에서 배송지 조회가 필요할 경우 AddressesService를 import해서 사용
   * exports 없으면 이 모듈 내부에서만 사용 가능
   */
  exports: [AddressesService, AddressesRepository],
})
export class AddressesModule {}
