import prisma from '../../common/prisma';
import { ForbiddenError, NotFoundError } from '../../common/errors';
import type { AddressResponse, CreateAddressDto, UpdateAddressDto } from './address.dto';

export const addressService = {
  // === 내 배송지 등록 ===
  createAddress: async (userUuid: string, dto: CreateAddressDto): Promise<AddressResponse> => {
    // 1. 기존 배송지 수 조회 + 배송지 등록
    const address = await prisma.$transaction(async (tx) => {
      const addressCount = await tx.t_shopai_addresses.count({
        where: { user_uuid: userUuid, delete_flag: 'N' },
      });

      // 2. 배송지 등록
      return tx.t_shopai_addresses.create({
        data: {
          user_uuid: userUuid,
          address_name: dto.name,
          address_recipient: dto.recipient,
          address_zip_code: dto.zipCode,
          address_base: dto.base,
          address_detail: dto.detail ?? null,
          address_default: addressCount === 0 ? 'Y' : 'N',
        },
      });
    });

    // 3. 응답 데이터
    return {
      addressUuid: address.address_uuid,
      addressName: address.address_name,
      recipient: address.address_recipient,
      zipCode: address.address_zip_code,
      base: address.address_base,
      detail: address.address_detail,
      isDefault: address.address_default === 'Y',
      createdDate: address.created_date,
    };
  },

  // === 내 배송지 조회 ===
  getAddress: async (userUuid: string): Promise<AddressResponse[]> => {
    // 1. 내 전체 배송지 조회
    const addresses = await prisma.t_shopai_addresses.findMany({
      where: { user_uuid: userUuid, delete_flag: 'N' },
      orderBy: { address_default: 'desc', created_date: 'desc' },
    });

    // 2. 응답 데이터
    return addresses.map((address) => ({
      addressUuid: address.address_uuid,
      addressName: address.address_name,
      recipient: address.address_recipient,
      zipCode: address.address_zip_code,
      base: address.address_base,
      detail: address.address_detail,
      isDefault: address.address_default === 'Y',
      createdDate: address.created_date,
    }));
  },

  // === 기본 배송지 설정 ===
  updateDefaultAddress: async (
    userUuid: string,
    addressUuid: string,
  ): Promise<{ message: string }> => {
    // 1. 배송지 존재 및 본인 소유 확인
    const address = await prisma.t_shopai_addresses.findFirst({
      where: { address_uuid: addressUuid, delete_flag: 'N' },
    });

    if (!address) throw new NotFoundError('배송지를 찾을 수 없습니다.');
    if (address.user_uuid !== userUuid) throw new ForbiddenError('접근 권한이 없습니다.');
    if (address.address_default === 'Y') return { message: '이미 기본 배송지예요.' };

    // 2. 전체 배송지 N으로 변경 + 선택 배송지 Y로 변경
    await prisma.$transaction([
      prisma.t_shopai_addresses.updateMany({
        where: { user_uuid: userUuid, delete_flag: 'N' },
        data: { address_default: 'N' },
      }),
      prisma.t_shopai_addresses.update({
        where: { address_uuid: addressUuid },
        data: { address_default: 'Y' },
      }),
    ]);

    // 3. 응답 데이터
    return { message: '기본 배송지로 변경됐어요.' };
  },

  // === 내 배송지 수정 ===
  updateAddress: async (
    userUuid: string,
    addressUuid: string,
    dto: UpdateAddressDto,
  ): Promise<AddressResponse> => {
    // 1. 배송지 존재 및 본인 소유 확인
    const address = await prisma.t_shopai_addresses.findFirst({
      where: { address_uuid: addressUuid, delete_flag: 'N' },
    });

    if (!address) throw new NotFoundError('배송지를 찾을 수 없습니다.');
    if (address.user_uuid !== userUuid) throw new ForbiddenError('접근 권한이 없습니다.');

    // 2. 배송지 수정
    const updateAddress = await prisma.t_shopai_addresses.update({
      where: { address_uuid: addressUuid },
      data: {
        address_name: dto.name,
        address_recipient: dto.recipient,
        address_zip_code: dto.zipCode,
        address_base: dto.base,
        address_detail: dto.detail ?? null,
      },
    });

    // 3. 응답 데이터
    return {
      addressUuid: updateAddress.address_uuid,
      addressName: updateAddress.address_name,
      recipient: updateAddress.address_recipient,
      zipCode: updateAddress.address_zip_code,
      base: updateAddress.address_base,
      detail: updateAddress.address_detail,
      isDefault: updateAddress.address_default === 'Y',
      createdDate: updateAddress.created_date,
    };
  },

  // === 내 배송지 삭제 ===
  deleteAddress: async (userUuid: string, addressUuid: string): Promise<{ message: string }> => {
    // 1. 배송지 존재 및 본인 소유 확인
    const address = await prisma.t_shopai_addresses.findFirst({
      where: { address_uuid: addressUuid, delete_flag: 'N' },
    });

    if (!address) throw new NotFoundError('배송지를 찾을 수 없습니다.');
    if (address.user_uuid !== userUuid) throw new ForbiddenError('접근 권한이 없습니다.');

    // 2. 소프트삭제
    await prisma.t_shopai_addresses.update({
      where: { address_uuid: addressUuid },
      data: { delete_flag: 'Y' },
    });

    // 3. 응답 데이터
    return { message: '배송지가 삭제됐어요.' };
  },
};
