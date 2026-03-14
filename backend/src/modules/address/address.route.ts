import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { addressController } from './address.controller';
import { createAddressSchema, updateAddressSchema } from './address.dto';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: 배송지 (등록 / 조회 / 기본 배송지 설정 / 수정 / 삭제)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddressRequest:
 *       type: object
 *       required: [name, recipient, zipCode, base]
 *       properties:
 *         name:
 *           type: string
 *           example: 우리집
 *         recipient:
 *           type: string
 *           example: 홍길동
 *         zipCode:
 *           type: string
 *           example: "04524"
 *         base:
 *           type: string
 *           example: 서울특별시 중구 세종대로 110
 *         detail:
 *           type: string
 *           example: 101동 1001호
 *
 *     AddressResponse:
 *       type: object
 *       properties:
 *         addressUuid:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         addressName:
 *           type: string
 *           example: 우리집
 *         recipient:
 *           type: string
 *           example: 홍길동
 *         zipCode:
 *           type: string
 *           example: "04524"
 *         base:
 *           type: string
 *           example: 서울특별시 중구 세종대로 110
 *         detail:
 *           type: string
 *           nullable: true
 *           example: 101동 1001호
 *         isDefault:
 *           type: boolean
 *           example: true
 *         createdDate:
 *           type: string
 *           format: date-time
 *           example: "2026-03-14T12:00:00.000Z"
 */

// === 내 배송지 등록 ===
/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: 내 배송지 등록
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressRequest'
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 addressUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 addressName: 우리집
 *                 recipient: 홍길동
 *                 zipCode: "04524"
 *                 base: 서울특별시 중구 세종대로 110
 *                 detail: 101동 1001호
 *                 isDefault: true
 *                 createdDate: "2026-03-14T12:00:00.000Z"
 *               error: null
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 */
router.post('/', authenticate, validate(createAddressSchema), addressController.createAddress);

// === 내 배송지 조회 ===
/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: 내 배송지 목록 조회
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - addressUuid: 550e8400-e29b-41d4-a716-446655440000
 *                   addressName: 우리집
 *                   recipient: 홍길동
 *                   zipCode: "04524"
 *                   base: 서울특별시 중구 세종대로 110
 *                   detail: 101동 1001호
 *                   isDefault: true
 *                   createdDate: "2026-03-14T12:00:00.000Z"
 *               error: null
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 */
router.get('/', authenticate, addressController.getAddress);

// === 기본 배송지 설정 ===
/**
 * @swagger
 * /api/addresses/{addressUuid}/default:
 *   patch:
 *     summary: 기본 배송지 설정
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: 설정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 기본 배송지로 변경됐어요.
 *               error: null
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 *       403:
 *         description: 접근 권한 없음
 *       404:
 *         description: 배송지를 찾을 수 없음
 */
router.patch('/:addressUuid/default', authenticate, addressController.updateDefaultAddress);

// === 내 배송지 수정 ===
/**
 * @swagger
 * /api/addresses/{addressUuid}:
 *   patch:
 *     summary: 내 배송지 수정
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 addressUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 addressName: 우리집
 *                 recipient: 홍길동
 *                 zipCode: "04524"
 *                 base: 서울특별시 중구 세종대로 110
 *                 detail: 101동 1001호
 *                 isDefault: true
 *                 createdDate: "2026-03-14T12:00:00.000Z"
 *               error: null
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 *       403:
 *         description: 접근 권한 없음
 *       404:
 *         description: 배송지를 찾을 수 없음
 */
router.patch(
  '/:addressUuid',
  authenticate,
  validate(updateAddressSchema),
  addressController.updateAddress,
);

// === 내 배송지 삭제 ===
/**
 * @swagger
 * /api/addresses/{addressUuid}:
 *   delete:
 *     summary: 내 배송지 삭제
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 배송지가 삭제됐어요.
 *               error: null
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 *       403:
 *         description: 접근 권한 없음
 *       404:
 *         description: 배송지를 찾을 수 없음
 */
router.delete('/:addressUuid', authenticate, addressController.deleteAddress);

export default router;
