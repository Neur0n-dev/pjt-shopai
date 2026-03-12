import { Response } from 'express';

// ========================
// KST 타임스탬프
// ========================
const getKSTTimestamp = (): string => {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
};

// ========================
// 성공 응답
// ========================
export const sendSuccess = <T>(res: Response, data: T, status = 200): void => {
  res.status(status).json({
    success: true,
    data,
    error: null,
    timestamp: getKSTTimestamp(),
  });
};

// ========================
// 실패 응답
// ========================
export const sendError = (res: Response, code: string, message: string, status = 400): void => {
  res.status(status).json({
    success: false,
    data: null,
    error: { code, message },
    timestamp: getKSTTimestamp(),
  });
};
