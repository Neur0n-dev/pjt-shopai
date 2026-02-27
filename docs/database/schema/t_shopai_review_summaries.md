# ?? 리뷰 요약 AI 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_review_summaries`
- **용도**: AI(LLM)를 통해 생성된 상품별 리뷰 요약본을 캐싱하여 저장합니다.
- **핵심 로직**:
    - `last_review_uuid`를 통해 새로운 리뷰가 달렸는지 판단하여 AI 재호출 여부를 결정합니다.
    - `expires_date`를 통해 데이터의 유효 기간을 관리하여 주기적인 최신화를 보장합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **summary_uuid** | 요약 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **product_uuid** | 상품 고유번호 | VARCHAR(36) | FK, UK, NOT NULL | 상품과 1:1 관계 |
| **summary_content** | AI 요약 리뷰 | TEXT | NOT NULL | AI가 생성한 요약 본문 |
| **summary_count** | 제품 리뷰 갯수 | INT | NOT NULL | 요약에 포함된 리뷰 총 수 |
| **last_review_uuid** | 제품 마지막 리뷰 uuid | VARCHAR(36) | NULL | 새 리뷰 존재 여부 비교용 |
| **expires_date** | 리뷰요약 만료일자 | DATETIME | NOT NULL | 캐시 만료 시각 |
| **created_date** | 리뷰요약 생성일자 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 리뷰요약 수정일자 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_review_summaries` (
    `summary_uuid` VARCHAR(36) NOT NULL COMMENT '리뷰 요약 UUID',
    `product_uuid` VARCHAR(36) NOT NULL COMMENT '상품 UUID',
    `summary_content` TEXT NOT NULL COMMENT 'AI 요약 내용',
    `summary_count` INT NOT NULL DEFAULT 0 COMMENT '요약된 리뷰 수',
    `last_review_uuid` VARCHAR(36) DEFAULT NULL COMMENT '마지막 반영 리뷰 ID(비교용)',
    `expires_date` DATETIME NOT NULL COMMENT '캐시 만료 시점',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`summary_uuid`),
    UNIQUE KEY `uk_summary_product_uuid` (`product_uuid`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_summary_product_uuid` FOREIGN KEY (`product_uuid`) 
        REFERENCES `t_shopai_products` (`product_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;