import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 사용자 권한 열거형
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('t_shopai_users')
export class User {
  // 사용자 UUID (PK)
  @PrimaryGeneratedColumn('uuid', { name: 'user_uuid' })
  uuid: string;

  // 이메일 (로그인 계정)
  @Column({ name: 'user_email', type: 'varchar', length: 100, unique: true })
  email: string;

  // 비밀번호 (bcrypt 해시) — 응답 직렬화 시 제외
  @Exclude()
  @Column({ name: 'user_password', type: 'varchar', length: 255 })
  password: string;

  // 사용자 이름
  @Column({ name: 'user_name', type: 'varchar', length: 50 })
  name: string;

  // 연락처 (선택)
  @Column({ name: 'user_phone', type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  // 사용자 권한
  @Column({
    name: 'user_role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

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
