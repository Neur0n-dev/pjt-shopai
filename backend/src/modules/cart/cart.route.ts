import { Router } from 'express';
import { cartController } from './cart.controller';
import { createCartSchema, updateCartSchema } from './cart.dto';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: 장바구니 관리
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCartRequest:
 *       type: object
 *       required: [productUuid, itemQuantity]
 *       properties:
 *         productUuid:
 *           type: string
 *           format: uuid
 *           example: 661f9511-f30c-52e5-b827-557766551111
 *         itemQuantity:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *
 *     UpdateCartRequest:
 *       type: object
 *       required: [itemQuantity]
 *       properties:
 *         itemQuantity:
 *           type: integer
 *           minimum: 1
 *           example: 3
 *
 *     CreateCartResponse:
 *       type: object
 *       properties:
 *         cartItemUuid:
 *           type: string
 *           example: 771f9511-f30c-52e5-b827-557766552222
 *         userUuid:
 *           type: string
 *           example: 881f9511-f30c-52e5-b827-557766553333
 *         productUuid:
 *           type: string
 *           example: 661f9511-f30c-52e5-b827-557766551111
 *         itemQuantity:
 *           type: integer
 *           example: 2
 *         createdDate:
 *           type: string
 *           format: date-time
 *
 *     CartListResponse:
 *       type: object
 *       properties:
 *         cartItemUuid:
 *           type: string
 *           example: 771f9511-f30c-52e5-b827-557766552222
 *         itemQuantity:
 *           type: integer
 *           example: 2
 *         createdDate:
 *           type: string
 *           format: date-time
 *         product:
 *           type: object
 *           properties:
 *             productUuid:
 *               type: string
 *               example: 661f9511-f30c-52e5-b827-557766551111
 *             productName:
 *               type: string
 *               example: 아이폰 16 Pro 256GB
 *             productPrice:
 *               type: integer
 *               example: 1650000
 *             productImage:
 *               type: string
 *               nullable: true
 *               example: https://example.com/image.jpg
 *             productStock:
 *               type: integer
 *               example: 50
 *             productStatus:
 *               type: string
 *               enum: [ACTIVE, INACTIVE]
 *               example: ACTIVE
 *
 *     UpdateCartResponse:
 *       type: object
 *       properties:
 *         cartItemUuid:
 *           type: string
 *           example: 771f9511-f30c-52e5-b827-557766552222
 *         itemQuantity:
 *           type: integer
 *           example: 3
 *         updatedDate:
 *           type: string
 *           format: date-time
 */

// === 장바구니 등록 ===
/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: 장바구니 등록
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCartRequest'
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 cartItemUuid: 771f9511-f30c-52e5-b827-557766552222
 *                 userUuid: 881f9511-f30c-52e5-b827-557766553333
 *                 productUuid: 661f9511-f30c-52e5-b827-557766551111
 *                 itemQuantity: 2
 *                 createdDate: 2026-01-01T00:00:00.000Z
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 필요
 *       409:
 *         description: 이미 장바구니에 담긴 상품
 */
router.post('/', authenticate, validate(createCartSchema), cartController.createCart);

// === 장바구니 목록 조회 ===
/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: 장바구니 목록 조회
 *     tags: [Cart]
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
 *                 - cartItemUuid: 771f9511-f30c-52e5-b827-557766552222
 *                   itemQuantity: 2
 *                   createdDate: 2026-01-01T00:00:00.000Z
 *                   product:
 *                     productUuid: 661f9511-f30c-52e5-b827-557766551111
 *                     productName: 아이폰 16 Pro 256GB
 *                     productPrice: 1650000
 *                     productImage: null
 *                     productStock: 50
 *                     productStatus: ACTIVE
 *       401:
 *         description: 인증 필요
 */
router.get('/', authenticate, cartController.getCartList);

// === 장바구니 수정 ===
/**
 * @swagger
 * /api/carts/{cartUuid}:
 *   patch:
 *     summary: 장바구니 수량 수정
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 771f9511-f30c-52e5-b827-557766552222
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 cartItemUuid: 771f9511-f30c-52e5-b827-557766552222
 *                 itemQuantity: 3
 *                 updatedDate: 2026-01-01T00:00:00.000Z
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 장바구니 아이템 없음
 */
router.patch('/:cartUuid', authenticate, validate(updateCartSchema), cartController.updateCart);

// === 장바구니 한건 삭제 ===
/**
 * @swagger
 * /api/carts/{cartUuid}:
 *   delete:
 *     summary: 장바구니 한건 삭제
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 771f9511-f30c-52e5-b827-557766552222
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 아이폰 16 Pro 256GB이(가) 삭제되었습니다.
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 장바구니 아이템 없음
 */
router.delete('/:cartUuid', authenticate, cartController.deleteCart);

// === 장바구니 전체 삭제 ===
/**
 * @swagger
 * /api/carts:
 *   delete:
 *     summary: 장바구니 전체 삭제
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 전체 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 장바구니가 전체 삭제 되었습니다.
 *       401:
 *         description: 인증 필요
 */
router.delete('/', authenticate, cartController.deleteAllCart);

export default router;
