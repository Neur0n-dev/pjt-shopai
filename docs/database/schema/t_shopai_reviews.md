# ?? 상품 리뷰 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_reviews`
- **용도**: 구매한 상품에 대한 사용자의 평가 및 후기를 관리합니다. `item_uuid`를 참조하여 실제 구매자만 리뷰를 남길 수 있도록 설계되었습니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **review_uuid** | 리뷰 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **user_uuid** | 사용자 고유번호 | VARCHAR(36) | FK, NOT NULL | 작성자 식별 UUID |
| **product_uuid** | 상품 고유번호 | VARCHAR(36) | FK, NOT NULL | 리뷰 대상 상품 UUID |
| **item_uuid** | 주문상품 고유번호 | VARCHAR(36) | FK, UK, NOT NULL | 구매 증빙 (1인 1리뷰) |
| **review_rating** | 리뷰 평가 점수 | INT | NOT NULL, DF(1) | 1 ~ 5점 |
| **review_content** | 리뷰 평가 내용 | TEXT | NOT NULL | 리뷰 본문 |
| **delete_flag** | 리뷰 삭제여부 | CHAR(1) | NOT NULL, DF('N') | 'N': 미삭제, 'Y': 삭제 |
| **created_date** | 리뷰 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 리뷰 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_reviews` (
    `review_uuid` VARCHAR(36) NOT NULL COMMENT '리뷰 UUID',
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '사용자 UUID',
    `product_uuid` VARCHAR(36) NOT NULL COMMENT '상품 UUID',
    `item_uuid` VARCHAR(36) NOT NULL COMMENT '주문상품 UUID',
    `review_rating` INT NOT NULL DEFAULT 1 COMMENT '평점(1~5)',
    `review_content` TEXT NOT NULL COMMENT '리뷰 내용',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부(Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`review_uuid`),
    UNIQUE KEY `uk_review_item_uuid` (`item_uuid`), -- 동일 주문 상품 중복 리뷰 방지
    
    -- 인덱스 설정 (조회 성능 최적화)
    INDEX `idx_review_product_uuid` (`product_uuid`), -- 상품별 리뷰 목록 조회용
    INDEX `idx_review_user_uuid` (`user_uuid`),       -- 사용자가 작성한 리뷰 조회용
    
    -- 제약 조건 설정
    CONSTRAINT `chk_review_rating_range` CHECK (`review_rating` BETWEEN 1 AND 5),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용 및 참조 대상 수정
    CONSTRAINT `fk_review_user_uuid` FOREIGN KEY (`user_uuid`) 
        REFERENCES `t_shopai_users` (`user_uuid`) ON DELETE CASCADE,
        
    CONSTRAINT `fk_review_product_uuid` FOREIGN KEY (`product_uuid`) 
        REFERENCES `t_shopai_products` (`product_uuid`) ON DELETE CASCADE,
        
    CONSTRAINT `fk_review_item_uuid` FOREIGN KEY (`item_uuid`) 
        REFERENCES `t_shopai_order_items` (`item_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;