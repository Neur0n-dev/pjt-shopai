/**
 * [addresses.repository.ts]
 * addresses 엔티티에 대한 DB 접근 담당 레포지토리
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from '../entities/addresses.entity';

@Injectable()
export class AddressesRepository {
  constructor(
    @InjectRepository(Addresses)
    private readonly repository: Repository<Addresses>,
  ) {}

  // 특정 유저의 배송지 목록 조회 (삭제된 항목 제외)
  async findAllByUserUuid(userUuid: string): Promise<Addresses[]> {
    return this.repository.find({
      where: { userUuid, deleteFlag: 'N' },
    });
  }

  // 특정 배송지 단건 조회 (본인 소유 확인)
  async findOneByAddressUuid(
    addressUuid: string,
    userUuid: string,
  ): Promise<Addresses | null> {
    return this.repository.findOne({
      where: { addressUuid, userUuid, deleteFlag: 'N' },
    });
  }

  // 대표 배송지 조회
  async findDefaultByUserUuid(userUuid: string): Promise<Addresses | null> {
    return this.repository.findOne({
      where: { userUuid, addressDefault: 'Y', deleteFlag: 'N' },
    });
  }

  // 배송지 개수 조회 (최대 등록 수 제한용)
  async countByUserUuid(userUuid: string): Promise<number> {
    return this.repository.count({
      where: { userUuid, deleteFlag: 'N' },
    });
  }

  // 배송지 저장 (생성/수정 공통)
  async save(addresses: Partial<Addresses>): Promise<Addresses> {
    return this.repository.save(addresses);
  }

  // 대표 배송지 해제 (새 대표 설정 전 기존 대표를 'N'으로 변경)
  async updateByAddressDefault(userUuid: string, fields: { addressDefault: string }): Promise<void> {
    await this.repository.update({ userUuid }, fields);
  }

  // 특정 배송지를 대표 배송지로 설정
  async setDefaultByAddressUuid(addressUuid: string): Promise<void> {
    await this.repository.update({ addressUuid }, { addressDefault: 'Y' });
  }

  // 배송지 소프트 삭제 (delete_flag 'Y' 처리)
  async deleteByAddressUuid(addressUuid: string): Promise<void> {
    await this.repository.update({ addressUuid }, { deleteFlag: 'Y' });
  }
}
