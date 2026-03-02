/**
 * [addresses.entity.ts]
 * 배송지 테이블(t_shopai_addresses) 매핑 엔티티
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

@Entity('t_shopai_addresses')
export class Addresses {
  // 주소 UUID (PK)
  @PrimaryGeneratedColumn('uuid', { name: 'address_uuid' })
  addressUuid: string;

  // 사용자 UUID (FK)
  @Column({ name: 'user_uuid', type: 'varchar', length: 36 })
  userUuid: string;

  // 사용자 관계 (N:1)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  // 주소지 별칭
  @Column({ name: 'address_name', type: 'varchar', length: 50 })
  addressName: string;

  // 수취인 명
  @Column({ name: 'address_recipient', type: 'varchar', length: 50 })
  addressRecipient: string;

  // 우편번호
  @Column({ name: 'address_zip_code', type: 'varchar', length: 10 })
  addressZipCode: string;

  // 기본 주소
  @Column({ name: 'address_base', type: 'varchar', length: 255 })
  addressBase: string;

  // 상세 주소 (선택)
  @Column({
    name: 'address_detail',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  addressDetail: string | null;

  // 대표 주소지 여부
  @Column({ name: 'address_default', type: 'char', length: 1, default: 'N' })
  addressDefault: string;

  // 삭제 여부 ('N': 정상, 'Y': 삭제)
  @Column({ name: 'delete_flag', type: 'char', length: 1, default: 'N' })
  deleteFlag: string;

  // 생성일시
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // 수정일시
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
