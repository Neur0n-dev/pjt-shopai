/**
 * [address-response.dto.ts]
 * 배송지 조회 응답 시 클라이언트에 반환하는 데이터 형식 정의
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty({ description: '주소 고유번호', example: 'uuid' })
  addressUuid: string;

  @ApiProperty({ description: '주소지 별칭', example: '우리집' })
  addressName: string;

  @ApiProperty({ description: '수취인 명', example: '홍길동' })
  addressRecipient: string;

  @ApiProperty({ description: '우편번호', example: '12345' })
  addressZipCode: string;

  @ApiProperty({ description: '기본 주소', example: '서울시 OO구 OO동 OO번지' })
  addressBase: string;

  @ApiPropertyOptional({
    description: '상세 주소 (선택)',
    example: 'OO아파트 OO동 OO호',
  })
  addressDetail?: string;

  @ApiProperty({
    description: '대표 배송지 여부',
    example: 'N',
    enum: ['Y', 'N'],
  })
  addressDefault: string;

  @ApiProperty({
    description: '수정 일시',
    example: '2026-03-02T00:00:00.000Z',
  })
  updatedDate: Date;
}
