/**
 * [addresses.service.ts]
 * 배송지 관련 비즈니스 로직 담당 서비스
 */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from './repositories/addresses.repository';
import { AddressResponseDto } from './dto/address-response.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Addresses } from './entities/addresses.entity';

@Injectable()
export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  /**
   * 내 배송지 목록 조회
   * 1. JWT에서 추출한 UUID로 배송지 리스트 반환
   */
  async getAddresses(uuid: string): Promise<AddressResponseDto[]> {
    const addresses = await this.addressesRepository.findAllByUserUuid(uuid);
    return this.mapToDto(addresses);
  }

  /**
   * 내 배송지 등록
   * 1. 최대 배송지 개수(5개) 초과 여부 확인
   * 2. 대표 배송지 요청 시 기존 대표 배송지 해제
   * 3. 새 배송지 저장
   * 4. 전체 배송지 목록 반환
   */
  async createdAddress(uuid: string, dto: CreateAddressDto): Promise<AddressResponseDto[]> {
    // 1. 최대 배송지 개수(5개) 초과 여부 확인
    const addressCount = await this.addressesRepository.countByUserUuid(uuid);
    if (addressCount >= 5) {
      throw new BadRequestException('배송지는 최대 5개까지 등록 가능합니다.');
    }

    // 2. 대표 배송지 요청 시 기존 대표 배송지 해제
    if (dto.addressDefault === 'Y') {
      await this.addressesRepository.updateByAddressDefault(uuid, { addressDefault: 'N' });
    }

    // 3. 새 배송지 저장
    await this.addressesRepository.save({
      userUuid: uuid,
      addressName: dto.addressName,
      addressRecipient: dto.addressRecipient,
      addressZipCode: dto.addressZipCode,
      addressBase: dto.addressBase,
      addressDetail: dto.addressDetail ?? null,
      addressDefault: dto.addressDefault,
    });

    // 4. 전체 배송지 목록 반환
    return this.mapToDto(await this.addressesRepository.findAllByUserUuid(uuid));
  }

  /**
   * 내 배송지 수정
   * 1. 배송지 존재 여부 확인 (본인 소유 검증)
   * 2. 대표 배송지 요청 시 기존 대표 배송지 해제
   * 3. 배송지 수정 저장
   * 4. 전체 배송지 목록 반환
   */
  async updateAddress(uuid: string, addressUuid: string, dto: UpdateAddressDto): Promise<AddressResponseDto[]> {
    // 1. 배송지 존재 여부 확인 (본인 소유 검증)
    await this.findAddressOrThrow(addressUuid, uuid);

    // 2. 대표 배송지 요청 시 기존 대표 배송지 해제
    if (dto.addressDefault === 'Y') {
      await this.addressesRepository.updateByAddressDefault(uuid, { addressDefault: 'N' });
    }

    // 3. 배송지 수정 저장
    await this.addressesRepository.save({
      addressUuid,
      userUuid: uuid,
      addressName: dto.addressName,
      addressRecipient: dto.addressRecipient,
      addressZipCode: dto.addressZipCode,
      addressBase: dto.addressBase,
      addressDetail: dto.addressDetail ?? null,
      addressDefault: dto.addressDefault,
    });

    // 4. 전체 배송지 목록 반환
    return this.mapToDto(await this.addressesRepository.findAllByUserUuid(uuid));
  }

  /**
   * 내 배송지 삭제
   * 1. 배송지 존재 여부 확인 (본인 소유 검증)
   * 2. 배송지 삭제
   * 3. 전체 배송지 목록 반환
   */
  async deleteAddress(uuid: string, addressUuid: string): Promise<AddressResponseDto[]> {
    // 1. 배송지 존재 여부 확인 (본인 소유 검증)
    await this.findAddressOrThrow(addressUuid, uuid);

    // 2. 배송지 삭제
    await this.addressesRepository.deleteByAddressUuid(addressUuid);

    // 3. 전체 배송지 목록 반환
    return this.mapToDto(await this.addressesRepository.findAllByUserUuid(uuid));
  }

  // ============================================================
  // Private Methods
  // ============================================================

  // 배송지 존재 여부 확인 및 본인 소유 검증 (없으면 404)
  private async findAddressOrThrow(addressUuid: string, uuid: string): Promise<Addresses> {
    const address = await this.addressesRepository.findOneByAddressUuid(addressUuid, uuid);
    if (!address) {
      throw new NotFoundException('배송지를 찾을 수 없습니다.');
    }
    return address;
  }

  // 엔티티 배열 → DTO 배열 매핑 (null → undefined 변환 포함)
  private mapToDto(addresses: Addresses[]): AddressResponseDto[] {
    return addresses.map((address) => ({
      addressUuid: address.addressUuid,
      addressName: address.addressName,
      addressRecipient: address.addressRecipient,
      addressZipCode: address.addressZipCode,
      addressBase: address.addressBase,
      addressDetail: address.addressDetail ?? undefined,
      addressDefault: address.addressDefault,
      updatedDate: address.updatedDate,
    }));
  }
}
