import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { UpdateMeSchema, UpdatePasswordSchema } from './user.dto';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저 (내 정보 조회 / 수정 / 비밀번호 변경 / 탈퇴)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateMeRequest:
 *       type: object
 *       required: [name]
 *       properties:
 *         name:
 *           type: string
 *           example: 홍길동
 *         phone:
 *           type: string
 *           example: 010-1234-5678
 *
 *     UpdatePasswordRequest:
 *       type: object
 *       required: [currentPassword, newPassword]
 *       properties:
 *         currentPassword:
 *           type: string
 *           example: Password1!
 *         newPassword:
 *           type: string
 *           example: NewPassword1!
 */

// === 내 정보 조회 ===
/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [User]
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
 *                 userUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 email: user@example.com
 *                 name: 홍길동
 *                 phone: 010-1234-5678
 *                 role: USER
 *                 createdDate: "2026-03-14T12:00:00.000Z"
 *               error: null
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 *       404:
 *         description: 유저를 찾을 수 없음
 */
router.get('/me', authenticate, userController.getMe);

// === 내 정보 수정 ===
/**
 * @swagger
 * /api/user/me:
 *   patch:
 *     summary: 내 정보 수정
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMeRequest'
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 userUuid: 550e8400-e29b-41d4-a716-446655440000
 *                 email: user@example.com
 *                 name: 홍길동
 *                 phone: 010-1234-5678
 *                 role: USER
 *                 createdDate: "2026-03-14T12:00:00.000Z"
 *               error: null
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 *       404:
 *         description: 유저를 찾을 수 없음
 */
router.patch('/me', authenticate, validate(UpdateMeSchema), userController.updateMe);

// === 내 비밀번호 수정 ===
/**
 * @swagger
 * /api/user/me/password:
 *   patch:
 *     summary: 내 비밀번호 수정
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordRequest'
 *     responses:
 *       200:
 *         description: 비밀번호 변경 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 비밀번호가 변경됐어요.
 *               error: null
 *       400:
 *         description: 입력값 검증 실패
 *       401:
 *         description: 현재 비밀번호 불일치 또는 토큰 만료
 *       404:
 *         description: 유저를 찾을 수 없음
 */
router.patch(
  '/me/password',
  authenticate,
  validate(UpdatePasswordSchema),
  userController.updateMePassword,
);

// === 회원 탈퇴 ===
/**
 * @swagger
 * /api/user/me:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 탈퇴 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 회원 탈퇴가 완료됐어요.
 *               error: null
 *       401:
 *         description: 인증 실패 또는 토큰 만료
 *       404:
 *         description: 유저를 찾을 수 없음
 */
router.delete('/me', authenticate, userController.deleteMe);

export default router;
