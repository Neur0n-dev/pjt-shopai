# ?? 사용자 주문 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_orders`
- **용도**: 주문의 마스터 정보를 관리하며, 사용자 주소록 정보의 스냅샷을 저장하여 원본 데이터 변경 시에도 주문 당시의 배송 정보를 보존합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **order_uuid** | 주문 고유번호 | VARCHAR(36) | PK, NOT NULL | 내부 관리용 UUID |
| **user_uuid** | 사용자 고유번호 | VARCHAR(36) | FK, NOT NULL | 사용자 식별 UUID |
| **order_number** | 주문 번호 | VARCHAR(50) | UK, NOT NULL | 비즈니스용 주문번호 |
| **order_status** | 주문 상태 | ENUM | NOT NULL | 결제대기~주문취소 상태 관리 |
| **order_total_amount** | 주문 총금액 | INT | NOT NULL | 배송비 포함 최종 결제액 |
| **order_recipient_name** | 주문 수령인 | VARCHAR(50) | NOT NULL | 주문 시점의 수취인 성함 |
| **order_recipient_phone** | 수령인 연락처 | VARCHAR(20) | NOT NULL | 주문 시점의 연락처 |
| **order_delivery_address** | 주문 배송지 | VARCHAR(500) | NOT NULL | 주문 시점의 전체 주소 |
| **delete_flag** | 주문 삭제여부 | CHAR(1) | NOT NULL, DF('N') | 'N': 미삭제, 'Y': 삭제 |
| **created_date** | 주문 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 주문 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_orders` (
    `order_uuid` VARCHAR(36) NOT NULL COMMENT '주문 UUID',
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '사용자 UUID',
    `order_number` VARCHAR(50) NOT NULL COMMENT '비즈니스 주문번호',
    `order_status` ENUM('PENDING', 'PAID', 'PREPARING', 'SHIPPING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT '주문상태',
    `order_total_amount` INT NOT NULL COMMENT '총 결제 금액',
    `order_recipient_name` VARCHAR(50) NOT NULL COMMENT '수령인 성함(스냅샷)',
    `order_recipient_phone` VARCHAR(20) NOT NULL COMMENT '수령인 연락처(스냅샷)',
    `order_delivery_address` VARCHAR(500) NOT NULL COMMENT '배송지 전체 주소(스냅샷)',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부(Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`order_uuid`),
    UNIQUE KEY `uk_order_number` (`order_number`),
    
    -- 인덱스 설정
    INDEX `idx_order_user_uuid` (`user_uuid`),
    INDEX `idx_order_status` (`order_status`),
    INDEX `idx_order_created_date` (`created_date`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용 및 참조 대상(t_shopai_users) 수정
    CONSTRAINT `fk_order_user_uuid` FOREIGN KEY (`user_uuid`) 
        REFERENCES `t_shopai_users` (`user_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;