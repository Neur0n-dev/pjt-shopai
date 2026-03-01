import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_shopai_refresh_tokens')
export class RefreshToken {
  // 토큰 UUID (PK)
  @PrimaryGeneratedColumn('uuid', { name: 'token_uuid' })
  tokenUuid: string;

  // 사용자 UUID (FK)
  @Column({ name: 'user_uuid', type: 'varchar', length: 36 })
  userUuid: string;

  // 토큰 값
  @Column({ name: 'token_value', type: 'varchar', length: 500, unique: true })
  tokenValue: string;

  // 토큰 만료일시
  @Column({ name: 'token_expires_date', type: 'datetime' })
  tokenExpiresDate: Date;

  // 생성일시
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // 수정일시
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
