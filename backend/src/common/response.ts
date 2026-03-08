// ========================
// KST 타임스탬프
// ========================
const getKSTTimestamp = (): string => {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
};

// ========================
// 성공 응답
// ========================
export const success = <T>(data: T) => ({
  success: true,
  data,
  error: null,
  timestamp: getKSTTimestamp(),
});

// ========================
// 실패 응답
// ========================
export const fail = (code: string, message: string) => ({
  success: false,
  data: null,
  error: { code, message },
  timestamp: getKSTTimestamp(),
});
