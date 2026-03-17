import { Router } from 'express';
import { categoryController } from './category.controller';
import { createCategorySchema, updateCategorySchema } from './category.dto';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: 카테고리 관리
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryRequest:
 *       type: object
 *       required: [name, slug, sortOrder]
 *       properties:
 *         name:
 *           type: string
 *           example: 디지털/가전
 *         parentUuid:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         slug:
 *           type: string
 *           example: digital
 *         sortOrder:
 *           type: integer
 *           example: 1
 *
 *     UpdateCategoryRequest:
 *       type: object
 *       required: [name, slug, sortOrder]
 *       properties:
 *         name:
 *           type: string
 *           example: 디지털/가전
 *         slug:
 *           type: string
 *           example: digital
 *         sortOrder:
 *           type: integer
 *           example: 1
 *
 *     CategoryChildResponse:
 *       type: object
 *       properties:
 *         categoryUuid:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         name:
 *           type: string
 *           example: 스마트폰
 *         slug:
 *           type: string
 *           example: smartphone
 *         sortOrder:
 *           type: integer
 *           example: 1
 *         depth:
 *           type: integer
 *           example: 2
 *         createdDate:
 *           type: string
 *           format: date-time
 *
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         categoryUuid:
 *           type: string
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         parentUuid:
 *           type: string
 *           nullable: true
 *           example: null
 *         name:
 *           type: string
 *           example: 디지털/가전
 *         slug:
 *           type: string
 *           example: digital
 *         sortOrder:
 *           type: integer
 *           example: 1
 *         depth:
 *           type: integer
 *           example: 1
 *         createdDate:
 *           type: string
 *           format: date-time
 *         children:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategoryChildResponse'
 */

// === 카테고리 등록 ===
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: 카테고리 등록 (관리자)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: 카테고리 등록 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 parentUuid: null
 *                 name: 디지털/가전
 *                 slug: digital
 *                 sortOrder: 1
 *                 depth: 1
 *                 createdDate: 2026-01-01T00:00:00.000Z
 *                 children: []
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 상위 카테고리 없음
 *       409:
 *         description: 카테고리 명 또는 슬러그 중복
 */
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createCategorySchema),
  categoryController.createCategory,
);

// === 카테고리 조회 ===
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: 카테고리 목록 조회 (대분류 + 중분류)
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                   parentUuid: null
 *                   name: 디지털/가전
 *                   slug: digital
 *                   sortOrder: 1
 *                   depth: 1
 *                   createdDate: 2026-01-01T00:00:00.000Z
 *                   children:
 *                     - categoryUuid: 661f9511-f30c-52e5-b827-557766551111
 *                       name: 스마트폰
 *                       slug: smartphone
 *                       sortOrder: 1
 *                       depth: 2
 *                       createdDate: 2026-01-01T00:00:00.000Z
 */
router.get('/', categoryController.getCategory);

// === 카테고리 수정 ===
/**
 * @swagger
 * /api/categories/{categoryUuid}:
 *   patch:
 *     summary: 카테고리 수정 (관리자)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 categoryUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 parentUuid: null
 *                 name: 디지털/가전 (수정)
 *                 slug: digital-updated
 *                 sortOrder: 2
 *                 depth: 1
 *                 createdDate: 2026-01-01T00:00:00.000Z
 *                 children: []
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 카테고리 없음
 *       409:
 *         description: 카테고리 명 또는 슬러그 중복
 */
router.patch(
  '/:categoryUuid',
  authenticate,
  requireAdmin,
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

// === 카테고리 삭제 ===
/**
 * @swagger
 * /api/categories/{categoryUuid}:
 *   delete:
 *     summary: 카테고리 삭제 (관리자)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryUuid
 *         required: true
 *         schema:
 *           type: string
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: 삭제 성공 (하위 카테고리 포함 소프트 삭제)
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 카테고리가 삭제됐어요.
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 카테고리 없음
 *       409:
 *         description: 상품이 존재하는 카테고리는 삭제 불가
 */
router.delete('/:categoryUuid', authenticate, requireAdmin, categoryController.deleteCategory);

export default router;
