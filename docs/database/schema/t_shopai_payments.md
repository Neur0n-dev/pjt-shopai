# ?? 결제 마스터 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_payments`
- **용도**: 포트원(PortOne) API 연동을 통한 결제 시도 및 완료 정보를 관리하며, 정산 및 환불을 위한 식별자를 보관합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **payment_uuid** | 결제 고유번호 | VARCHAR(36) | PK, NOT NULL | 내부 관리용 UUID |
| **order_uuid** | 주문 고유번호 | VARCHAR(36) | FK, NOT NULL | 주문 테이블 참조 |
| **payment_imp_uid** | 포트원 결제 ID | VARCHAR(100) | UK, NULL 허용 | 포트원 발급 ID (imp_uid) |
| **payment_merchant_uid** | 고객사 주문번호 | VARCHAR(50) | UK, NOT NULL | 결제식별자 (payment_uuid 기반) |
| **payment_amount** | 결제 금액 | INT | NOT NULL | 최종 결제 금액 |
| **payment_method** | 결제 수단 | VARCHAR(100) | NOT NULL | card, trans, vbank 등 |
| **payment_status** | 결제 상태 | ENUM | NOT NULL | ready, paid, failed, cancelled |
| **payment_receipt_url** | 매출전표 URL | VARCHAR(500) | NULL 허용 | 영수증 링크 |
| **payment_fail_reason** | 결제 실패 사유 | VARCHAR(255) | NULL 허용 | 실패 메시지 |
| **created_date** | 결제 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 결제 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_payments` (
    `payment_uuid` VARCHAR(36) NOT NULL COMMENT '결제 UUID',
    `order_uuid` VARCHAR(36) NOT NULL COMMENT '주문 UUID',
    `payment_imp_uid` VARCHAR(100) DEFAULT NULL COMMENT '포트원 거래번호(imp_uid)',
    `payment_merchant_uid` VARCHAR(50) NOT NULL COMMENT '가맹점 주문번호(merchant_uid)',
    `payment_amount` INT NOT NULL COMMENT '결제 금액',
    `payment_method` VARCHAR(100) NOT NULL COMMENT '결제 수단',
    `payment_status` ENUM('ready', 'paid', 'failed', 'cancelled') NOT NULL DEFAULT 'ready' COMMENT '결제 상태',
    `payment_receipt_url` VARCHAR(500) DEFAULT NULL COMMENT '영수증 URL',
    `payment_fail_reason` VARCHAR(255) DEFAULT NULL COMMENT '실패 사유',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`payment_uuid`),
    UNIQUE KEY `uk_payment_merchant_uid` (`payment_merchant_uid`),
    UNIQUE KEY `uk_payment_imp_uid` (`payment_imp_uid`),
    
    -- 인덱스: 주문별 결제 내역 조회 최적화
    INDEX `idx_payment_order_uuid` (`order_uuid`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_payment_order_uuid` FOREIGN KEY (`order_uuid`) 
        REFERENCES `t_shopai_orders` (`order_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;