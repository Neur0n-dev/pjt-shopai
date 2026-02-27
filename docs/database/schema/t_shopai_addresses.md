# ?? 사용자 주소 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_addresses`
- **용도**: 사용자의 배송지 정보를 관리하며, 다중 주소 등록 및 기본 배송지 설정 기능을 지원합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **address_uuid** | 주소 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **user_uuid** | 사용자 고유번호 | VARCHAR(36) | FK, NOT NULL | 사용자 식별 UUID |
| **address_name** | 주소지 별칭 | VARCHAR(50) | NOT NULL | 예: 우리집, 회사, 본가 |
| **address_recipient** | 수취인 성함 | VARCHAR(50) | NOT NULL | 받는 사람 이름 |
| **address_zip_code** | 우편번호 | VARCHAR(10) | NOT NULL | - |
| **address_base** | 기본 주소 | VARCHAR(255) | NOT NULL | 도로명/지번 주소 |
| **address_detail** | 상세 주소 | VARCHAR(255) | NULL 허용 | 건물명, 호수 등 |
| **address_default** | 대표 주소지 여부 | CHAR(1) | NOT NULL, DF('N') | 'Y': 기본, 'N': 일반 |
| **delete_flag** | 주소 삭제여부 | CHAR(1) | NOT NULL, DF('N') | 'N':미삭제, 'Y': 삭제 |
| **created_date** | 주소 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 주소 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_addresses` (
    `address_uuid` VARCHAR(36) NOT NULL COMMENT '주소 UUID',
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '사용자 UUID',
    `address_name` VARCHAR(50) NOT NULL COMMENT '주소지 별칭',
    `address_recipient` VARCHAR(50) NOT NULL COMMENT '수령인 성함',
    `address_zip_code` VARCHAR(10) NOT NULL COMMENT '우편번호',
    `address_base` VARCHAR(255) NOT NULL COMMENT '도로명/지번 주소',
    `address_detail` VARCHAR(255) DEFAULT NULL COMMENT '상세 주소',
    `address_default` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '대표 배송지 여부(Y/N)',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부(Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 설정
    PRIMARY KEY (`address_uuid`),
    
    -- 인덱스 설정: 특정 사용자의 주소 목록 조회 성능 최적화
    INDEX `idx_address_user_uuid` (`user_uuid`), 
    
    -- 외래키 설정: 실제 사용자 테이블명(t_shopai_users) 참조
    CONSTRAINT `fk_address_user_uuid` FOREIGN KEY (`user_uuid`)
    REFERENCES `t_shopai_users` (`user_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;