/**
 * [addresses.controller.ts]
 * 배송지 관련 HTTP 요청을 받는 컨트롤러
 * 비즈니스 로직 없이 요청을 AddressesService로 위임하는 역할만 담당
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AddressResponseDto } from './dto/address-response.dto';
import {
  CurrentUser,
  type JwtPayload,
} from '../../common/decorators/current-user.decorator';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}
  // CRUD API (GET·POST·PATCH·DELETE /addresses)

  /**
   * GET /addresses/me
   * 내 주소지 조회 엔드포인트
   * 성공 시 200 + 내 주소지 리스트 반환
   */
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 주소지 조회',
    description: '현재 등록되어있는 주소지 정보를 반환합니다.',
  })
  @ApiOkResponse({
    description: '내 주소지 조회 성공',
    type: AddressResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: '인증 토큰이 없거나 유효하지 않습니다 (401)',
  })
  async getAddresses(@CurrentUser() user: JwtPayload): Promise<AddressResponseDto[]> {
    return this.addressesService.getAddresses(user.sub);
  }

  /**
   * POST /addresses/me
   * 내 주소지 저장 엔드포인트
   * 성공 시 201 + 내 주소지 리스트 반환
   */
  @Post('me')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 주소지 저장',
    description: '주소지 저장 후 등록되어있는 주소지 정보를 반환합니다.',
  })
  @ApiOkResponse({
    description: '내 주소지 저장 성공',
    type: AddressResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: '인증 토큰이 없거나 유효하지 않습니다 (401)',
  })
  async createdAddress(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateAddressDto,
  ): Promise<AddressResponseDto[]> {
    return this.addressesService.createdAddress(user.sub, dto);
  }

  /**
   * PATCH /addresses/me/:addressUuid
   * 내 주소지 수정 엔드포인트
   * 성공 시 200 + 내 주소지 리스트 반환
   */
  @Patch('me/:addressUuid')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 주소지 수정',
    description: '주소지 수정 후 등록되어있는 주소지 정보를 반환합니다.',
  })
  @ApiOkResponse({
    description: '내 주소지 수정 성공',
    type: AddressResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: '인증 토큰이 없거나 유효하지 않습니다 (401)',
  })
  async updateAddress(
    @CurrentUser() user: JwtPayload,
    @Param('addressUuid') addressUuid: string,
    @Body() dto: UpdateAddressDto,
  ): Promise<AddressResponseDto[]> {
    return this.addressesService.updateAddress(user.sub, addressUuid, dto);
  }

  /**
   * DELETE /addresses/me/:addressUuid
   * 내 주소지 삭제 엔드포인트
   * 성공 시 200 + 내 주소지 리스트 반환
   */
  @Delete('me/:addressUuid')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 주소지 삭제',
    description: '주소지 삭제 후 등록되어있는 주소지 정보를 반환합니다.',
  })
  @ApiOkResponse({
    description: '내 주소지 삭제 성공',
    type: AddressResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: '인증 토큰이 없거나 유효하지 않습니다 (401)',
  })
  async deleteAddress(
    @CurrentUser() user: JwtPayload,
    @Param('addressUuid') addressUuid: string,
  ): Promise<AddressResponseDto[]> {
    return this.addressesService.deleteAddress(user.sub, addressUuid);
  }
}
