import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * TypeORM MySQL 연결 설정 팩토리 함수
 * - autoLoadEntities: 모듈별 forFeature()로 등록한 엔티티 자동 로드
 * - synchronize: 절대 true 금지 (운영 DB 스키마 변경 방지)
 */
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  autoLoadEntities: true,
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'dev',
  timezone: '+09:00',
});
