/**
 * [update-address.dto.ts]
 * 배송지 수정 요청 시 클라이언트가 전달하는 데이터 형식 정의
 * CreateAddressDto를 상속받아 모든 필드를 선택(optional)으로 처리
 */
import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
