import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { signUpSchema, signInSchema, refreshTokenSchema, signOutSchema } from './auth.dto';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 (회원가입 / 로그인 / 토큰 재발급 / 로그아웃)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       required: [email, password, name]
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: Password1!
 *         name:
 *           type: string
 *           example: 홍길동
 *         phone:
 *           type: string
 *           example: 010-1234-5678
 *
 *     SignInRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: Password1!
 *
 *     TokenRequest:
 *       type: object
 *       required: [refreshToken]
 *       properties:
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

// === 회원가입 ===
/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 회원가입이 완료됐어요.
 *               error: null
 *       400:
 *         description: 입력값 검증 실패
 *       409:
 *         description: 이메일 중복
 */
router.post('/sign-up', validate(signUpSchema), authController.signUp);

// === 로그인 ===
/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               error: null
 *       401:
 *         description: 아이디 또는 비밀번호 불일치
 */
router.post('/sign-in', validate(signInSchema), authController.signIn);

// === 리프레시 토큰 ===
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: accessToken 재발급
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenRequest'
 *     responses:
 *       200:
 *         description: 재발급 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               error: null
 *       401:
 *         description: 유효하지 않거나 만료된 리프레시 토큰
 */
router.post('/refresh', validate(refreshTokenSchema), authController.refresh);

// === 로그아웃 ===
/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     summary: 로그아웃
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenRequest'
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: 로그아웃 됐습니다.
 *               error: null
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.post('/sign-out', validate(signOutSchema), authController.signOut);

export default router;