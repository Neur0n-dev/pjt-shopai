import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: null;
}

/**
 * 전역 응답 포맷 인터셉터
 * - 모든 성공 응답을 공통 포맷으로 래핑
 * - 응답 포맷: { success: true, data: T, error: null }
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        data,
        error: null,
      })),
    );
  }
}
