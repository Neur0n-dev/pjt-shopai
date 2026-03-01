import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

// User 엔티티에 대한 DB 접근 담당
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // 이메일로 유저 조회 (로그인, 중복 가입 체크 시 사용)
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, deleteFlag: 'N' },
    });
  }

  // UUID로 유저 조회 (유저 정보 확인)
  async findByUuid(uuid: string): Promise<User | null> {
    return this.repository.findOne({
      where: { uuid, deleteFlag: 'N' },
    });
  }

  // 유저 저장 (회원가입)
  async save(user: Partial<User>): Promise<User> {
    return this.repository.save(user);
  }
}
