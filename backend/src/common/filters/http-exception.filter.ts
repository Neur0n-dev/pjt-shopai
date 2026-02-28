import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 전역 HTTP 예외 필터
 * - HttpException을 캐치하여 공통 에러 응답 포맷으로 변환
 * - 응답 포맷: { success: false, data: null, error: { statusCode, message, path, timestamp } }
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message: string | string[] }).message;

    response.status(status).json({
      success: false,
      data: null,
      error: {
        statusCode: status,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
