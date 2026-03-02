/**
 * [create-address.dto.ts]
 * 배송지 등록 요청 시 클라이언트가 전달해야 하는 데이터 형식 정의
 * class-validator로 각 필드의 유효성을 자동으로 검사함
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  /**
   * 주소지 별칭: 배송지를 구분하는 이름
   */
  @ApiProperty({ description: '주소지 별칭', example: '우리집' })
  @IsString()
  addressName: string;

  /**
   * 수취인 명: 배송지에서 택배를 받을 사람
   */
  @ApiProperty({ description: '수취인 명', example: '홍길동' })
  @IsString()
  addressRecipient: string;

  /**
   * 우편번호
   */
  @ApiProperty({ description: '우편번호', example: '12345' })
  @IsString()
  addressZipCode: string;

  /**
   * 기본 주소: 도로명 또는 지번 주소
   */
  @ApiProperty({ description: '기본 주소', example: '서울시 OO구 OO동 OO번지' })
  @IsString()
  addressBase: string;

  /**
   * 상세 주소: 건물명, 동호수 등 (선택 입력 항목)
   * @IsOptional(): 요청에 포함되지 않아도 에러 없음
   */
  @ApiPropertyOptional({
    description: '상세 주소 (선택)',
    example: 'OO아파트 OO동 OO호',
  })
  @IsOptional()
  @IsString()
  addressDetail?: string;

  /**
   * 대표 배송지 여부
   * @IsIn(['Y', 'N']): 'Y' 또는 'N' 외 값이면 400 에러 반환
   */
  @ApiProperty({
    description: '대표 배송지 여부',
    example: 'N',
    enum: ['Y', 'N'],
  })
  @IsIn(['Y', 'N'])
  addressDefault: string;
}
