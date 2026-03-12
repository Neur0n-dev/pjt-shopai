// 404 — 존재하지 않는 리소스 (상품, 유저, 주문 등)
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// 409 — 중복 데이터 (이메일 중복 가입, 이미 결제된 주문 등)
export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

// 403 — 인증은 됐지만 권한 없음 (일반 유저가 관리자 API 호출 등)
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

// 401 — 인증 실패 (토큰 없음, 만료, 비밀번호 불일치 등)
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

// 400 — 입력값 검증 실패 (Zod 외 서비스 레이어에서 직접 검증할 때)
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}