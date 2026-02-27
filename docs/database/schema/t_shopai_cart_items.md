# ?? 사용자 장바구니 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_cart_items`
- **용도**: 사용자가 구매를 검토 중인 상품들을 임시 저장합니다. 동일 사용자가 동일 상품을 담을 경우 수량만 업데이트되도록 설계되었습니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **cart_item_uuid** | 장바구니 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **user_uuid** | 사용자 고유번호 | VARCHAR(36) | FK, NOT NULL | 사용자 식별 UUID |
| **product_uuid** | 상품 고유번호 | VARCHAR(36) | FK, NOT NULL | 상품 식별 UUID |
| **cart_item_quantity** | 장바구니 제품 수량 | INT | NOT NULL, DF(1) | 최소 1개 이상 |
| **created_date** | 장바구니 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 장바구니 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_cart_items` (
    `cart_item_uuid` VARCHAR(36) NOT NULL COMMENT '장바구니 아이템 UUID',
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '사용자 UUID',
    `product_uuid` VARCHAR(36) NOT NULL COMMENT '상품 UUID',
    `cart_item_quantity` INT NOT NULL DEFAULT 1 COMMENT '담은 수량',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최초 등록일',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수량 변경일',
    
    -- 기본키 설정
    PRIMARY KEY (`cart_item_uuid`),
    
    -- 복합 유니크 키 설정: 한 유저가 같은 상품을 중복해서 행으로 생성하는 것 방지
    UNIQUE KEY `uk_cart_user_product` (`user_uuid`, `product_uuid`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_cart_user_uuid` FOREIGN KEY (`user_uuid`) 
        REFERENCES `t_shopai_users` (`user_uuid`) ON DELETE CASCADE,
    CONSTRAINT `fk_cart_product_uuid` FOREIGN KEY (`product_uuid`) 
        REFERENCES `t_shopai_products` (`product_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;