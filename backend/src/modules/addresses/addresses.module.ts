import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './entities/addresses.entity';
import { AddressesRepository } from './repositories/addresses.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        // Addresses 엔티티 등록 (AddressesRepository에서 @InjectRepository 사용)
        TypeOrmModule.forFeature([Addresses]),
        // JwtAuthGuard 사용을 위해 import
        AuthModule,
    ],
    providers: [AddressesRepository],
})
export class AddressesModule {}