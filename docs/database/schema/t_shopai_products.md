# ?? 제품 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_products`
- **용도**: 쇼핑몰에서 판매되는 상품 정보를 관리하며, 상품을 등록한 사용자(관리자/판매자) 정보와 카테고리 정보를 포함합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **product_uuid** | 상품 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **user_uuid** | 등록 사용자 번호 | VARCHAR(36) | FK, NOT NULL | 등록자 식별 UUID |
| **category_uuid** | 카테고리 번호 | VARCHAR(36) | FK, NOT NULL | 카테고리 식별 UUID |
| **product_name** | 상품 명칭 | VARCHAR(255) | NOT NULL | - |
| **product_description** | 상품 상세 설명 | TEXT | NULL 허용 | - |
| **product_price** | 상품 가격 | INT | NOT NULL | - |
| **product_stock** | 상품 재고량 | INT | NOT NULL | 기본값 0 |
| **product_image** | 상품 대표이미지 | VARCHAR(500) | NULL 허용 | 이미지 URL 경로 |
| **product_status** | 상품 노출여부 | ENUM | NOT NULL | 'ACTIVE', 'HIDDEN' |
| **delete_flag** | 상품 삭제여부 | CHAR(1) | NOT NULL, DF('N') | 'N':미삭제, 'Y': 삭제 |
| **created_date** | 상품 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 상품 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_products` (
    `product_uuid` VARCHAR(36) NOT NULL COMMENT '상품 UUID',
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '등록 사용자 UUID',
    `category_uuid` VARCHAR(36) NOT NULL COMMENT '카테고리 UUID',
    `product_name` VARCHAR(255) NOT NULL COMMENT '상품 이름',
    `product_description` TEXT DEFAULT NULL COMMENT '상품 설명',
    `product_price` INT NOT NULL COMMENT '상품 가격',
    `product_stock` INT NOT NULL DEFAULT 0 COMMENT '상품 재고',
    `product_image` VARCHAR(500) DEFAULT NULL COMMENT '상품 이미지 URL',
    `product_status` ENUM('ACTIVE', 'HIDDEN') NOT NULL DEFAULT 'ACTIVE' COMMENT '상품 상태',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부(Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 설정
    PRIMARY KEY (`product_uuid`),
    
    -- 인덱스 설정 (조회 성능 최적화)
    INDEX `idx_product_user_uuid` (`user_uuid`),
    INDEX `idx_product_category_uuid` (`category_uuid`),
    INDEX `idx_product_status` (`product_status`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용 및 참조 대상 수정
    CONSTRAINT `fk_product_user_uuid` FOREIGN KEY (`user_uuid`) 
        REFERENCES `t_shopai_users` (`user_uuid`) ON DELETE CASCADE,
    CONSTRAINT `fk_product_category_uuid` FOREIGN KEY (`category_uuid`) 
        REFERENCES `t_shopai_categories` (`category_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;