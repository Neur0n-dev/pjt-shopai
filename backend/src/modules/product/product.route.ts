import { Router } from 'express';
import { productController } from './product.controller';
import { createProductSchema, productListQuerySchema, updateProductSchema } from './product.dto';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import { validate, validateQuery } from '../../middlewares/validate';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: 상품 관리
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProductRequest:
 *       type: object
 *       required: [categoryUuid, name, price, stock]
 *       properties:
 *         categoryUuid:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         name:
 *           type: string
 *           example: 아이폰 16 Pro 256GB
 *         description:
 *           type: string
 *           example: Apple A18 Pro 칩, 티타늄 디자인
 *         price:
 *           type: integer
 *           example: 1650000
 *         stock:
 *           type: integer
 *           example: 50
 *         image:
 *           type: string
 *           format: uri
 *           example: https://example.com/image.jpg
 *
 *     UpdateProductRequest:
 *       type: object
 *       properties:
 *         categoryUuid:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         name:
 *           type: string
 *           example: 아이폰 16 Pro 256GB (수정)
 *         description:
 *           type: string
 *           example: 설명 수정
 *         price:
 *           type: integer
 *           example: 1590000
 *         stock:
 *           type: integer
 *           example: 30
 *         image:
 *           type: string
 *           format: uri
 *           example: https://example.com/image.jpg
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           example: ACTIVE
 *
 *     CreateProductResponse:
 *       type: object
 *       properties:
 *         productUuid:
 *           type: string
 *           example: 661f9511-f30c-52e5-b827-557766551111
 *         categoryUuid:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         name:
 *           type: string
 *           example: 아이폰 16 Pro 256GB
 *         description:
 *           type: string
 *           nullable: true
 *           example: Apple A18 Pro 칩
 *         price:
 *           type: integer
 *           example: 1650000
 *         stock:
 *           type: integer
 *           example: 50
 *         image:
 *           type: string
 *           nullable: true
 *           example: https://example.com/image.jpg
 *         status:
 *           type: string
 *           example: ACTIVE
 *         createdDate:
 *           type: string
 *           format: date-time
 *
 *     ProductListItemResponse:
 *       type: object
 *       properties:
 *         productUuid:
 *           type: string
 *           example: 661f9511-f30c-52e5-b827-557766551111
 *         categoryUuid:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         categoryName:
 *           type: string
 *           example: 스마트폰
 *         name:
 *           type: string
 *           example: 아이폰 16 Pro 256GB
 *         price:
 *           type: integer
 *           example: 1650000
 *         stock:
 *           type: integer
 *           example: 50
 *         image:
 *           type: string
 *           nullable: true
 *           example: https://example.com/image.jpg
 *         status:
 *           type: string
 *           example: ACTIVE
 *         createdDate:
 *           type: string
 *           format: date-time
 *
 *     ProductDetailResponse:
 *       type: object
 *       properties:
 *         productUuid:
 *           type: string
 *           example: 661f9511-f30c-52e5-b827-557766551111
 *         categoryUuid:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         categoryName:
 *           type: string
 *           example: 스마트폰
 *         name:
 *           type: string
 *           example: 아이폰 16 Pro 256GB
 *         description:
 *           type: string
 *           nullable: true
 *           example: Apple A18 Pro 칩, 티타늄 디자인
 *         aiDescription:
 *           type: string
 *           nullable: true
 *           example: null
 *         price:
 *           type: integer
 *           example: 1650000
 *         stock:
 *           type: integer
 *           example: 50
 *         image:
 *           type: string
 *           nullable: true
 *           example: https://example.com/image.jpg
 *         status:
 *           type: string
 *           example: ACTIVE
 *         createdDate:
 *           type: string
 *           format: date-time
 */

// === 상품 등록 ===
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: 상품 등록 (관리자)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: 등록 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 productUuid: 661f9511-f30c-52e5-b827-557766551111
 *                 categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 name: 아이폰 16 Pro 256GB
 *                 description: Apple A18 Pro 칩
 *                 price: 1650000
 *                 stock: 50
 *                 image: null
 *                 status: ACTIVE
 *                 createdDate: 2026-01-01T00:00:00.000Z
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 카테고리 없음
 */
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createProductSchema),
  productController.createProduct,
);

// === 상품 목록 조회 ===
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: categoryUuid
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 카테고리 필터
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *         description: 상태 필터
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 상품명 검색
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc]
 *         description: 정렬 (기본 최신순)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 list:
 *                   - productUuid: 661f9511-f30c-52e5-b827-557766551111
 *                     categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                     categoryName: 스마트폰
 *                     name: 아이폰 16 Pro 256GB
 *                     price: 1650000
 *                     stock: 50
 *                     image: null
 *                     status: ACTIVE
 *                     createdDate: 2026-01-01T00:00:00.000Z
 *                 total: 1
 *                 page: 1
 *                 limit: 20
 *       400:
 *         description: 입력값 검증 실패
 */
router.get('/', validateQuery(productListQuerySchema), productController.getProductList);

// === 상품 상세 조회 ===
/**
 * @swagger
 * /api/products/{productUuid}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 661f9511-f30c-52e5-b827-557766551111
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 productUuid: 661f9511-f30c-52e5-b827-557766551111
 *                 categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 categoryName: 스마트폰
 *                 name: 아이폰 16 Pro 256GB
 *                 description: Apple A18 Pro 칩
 *                 aiDescription: null
 *                 price: 1650000
 *                 stock: 50
 *                 image: null
 *                 status: ACTIVE
 *                 createdDate: 2026-01-01T00:00:00.000Z
 *       404:
 *         description: 상품 없음
 */
router.get('/:productUuid', productController.getProductDetail);

// === 상품 수정 ===
/**
 * @swagger
 * /api/products/{productUuid}:
 *   patch:
 *     summary: 상품 수정 (관리자)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 661f9511-f30c-52e5-b827-557766551111
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 productUuid: 661f9511-f30c-52e5-b827-557766551111
 *                 categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 name: 아이폰 16 Pro 256GB (수정)
 *                 description: 설명 수정
 *                 price: 1590000
 *                 stock: 30
 *                 image: null
 *                 status: ACTIVE
 *                 updatedDate: 2026-01-01T00:00:00.000Z
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 상품 또는 카테고리 없음
 */
router.patch(
  '/:productUuid',
  authenticate,
  requireAdmin,
  validate(updateProductSchema),
  productController.updateProduct,
);

// === 상품 삭제 ===
/**
 * @swagger
 * /api/products/{productUuid}:
 *   delete:
 *     summary: 상품 삭제 (관리자)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 661f9511-f30c-52e5-b827-557766551111
 *     responses:
 *       200:
 *         description: 삭제 성공 (소프트 삭제)
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 상품이 삭제됐습니다.
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 상품 없음
 */
router.delete('/:productUuid', authenticate, requireAdmin, productController.deleteProduct);

export default router;
