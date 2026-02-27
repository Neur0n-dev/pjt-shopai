# ?? 주문 상품 상세 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_order_items`
- **용도**: 특정 주문(`t_shopai_orders`)에 포함된 개별 상품들의 상세 내역을 관리합니다. 상품의 가격 변화에 영향을 받지 않도록 구매 당시의 이름과 가격을 **스냅샷** 형태로 보관합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **item_uuid** | 주문상품 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **order_uuid** | 주문 고유번호 | VARCHAR(36) | FK, NOT NULL | 주문 식별 UUID |
| **product_uuid** | 상품 고유번호 | VARCHAR(36) | FK, NOT NULL | 상품 식별 UUID |
| **item_product_name** | 주문 상품 이름 | VARCHAR(255) | NOT NULL | 주문 시점 상품명 (스냅샷) |
| **item_product_price** | 주문 상품 가격 | INT | NOT NULL | 주문 시점 단가 (스냅샷) |
| **item_quantity** | 주문 상품 수량 | INT | NOT NULL | 구매 개수 |
| **item_subtotal** | 주문 상품 금액 | INT | NOT NULL | 단가 * 수량 합계액 |
| **item_reviewed** | 주문 상품 리뷰여부 | CHAR(1) | NOT NULL, DF('N') | 'N': 리뷰안함, 'Y': 리뷰함 |
| **delete_flag** | 주문 상품 삭제여부 | CHAR(1) | NOT NULL, DF('N') | 'N': 미삭제, 'Y': 삭제 |
| **created_date** | 주문 상품 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 주문 상품 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_order_items` (
    `item_uuid` VARCHAR(36) NOT NULL COMMENT '주문상품 UUID',
    `order_uuid` VARCHAR(36) NOT NULL COMMENT '주문 UUID',
    `product_uuid` VARCHAR(36) NOT NULL COMMENT '상품 UUID',
    `item_product_name` VARCHAR(255) NOT NULL COMMENT '상품명 스냅샷',
    `item_product_price` INT NOT NULL COMMENT '단가 스냅샷',
    `item_quantity` INT NOT NULL COMMENT '주문 수량',
    `item_subtotal` INT NOT NULL COMMENT '소계(단가*수량)',
    `item_reviewed` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '리뷰 작성 여부(Y/N)',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부(Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
	-- 기본키 설정
    PRIMARY KEY (`item_uuid`),
    
    -- 인덱스 설정
    INDEX `idx_order_item_order_uuid` (`order_uuid`),
    INDEX `idx_order_item_product_uuid` (`product_uuid`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_order_item_order_uuid` FOREIGN KEY (`order_uuid`) 
        REFERENCES `t_shopai_orders` (`order_uuid`) ON DELETE CASCADE,
    
    CONSTRAINT `fk_order_item_product_uuid` FOREIGN KEY (`product_uuid`) 
        REFERENCES `t_shopai_products` (`product_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;