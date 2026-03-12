import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'pjt-shopai API',
      version: '1.0.0',
      description: 'AI 리뷰 요약 + 재고 동시성 처리를 핵심으로 한 커머스 플랫폼 API 문서',
    },
    servers: [
      {
        url: 'http://localhost:3030',
        description: '로컬 개발 서버',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
