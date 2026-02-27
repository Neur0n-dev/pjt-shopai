# ?? 사용자 리프레시 토큰 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_refresh_tokens`
- **용도**: JWT 리프레시 토큰을 저장하여 강제 로그아웃, 중복 로그인 제어 및 보안 로테이션을 관리합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **token_uuid** | 토큰 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **user_uuid** | 사용자 고유번호 | VARCHAR(36) | FK, UK, NOT NULL | 사용자별 토큰 관리 |
| **token_value** | 토큰 데이터 | VARCHAR(500) | NOT NULL | 실제 Refresh Token 값 |
| **token_expires_date** | 토큰 만료일시 | DATETIME | NOT NULL | 만료 체크용 시각 |
| **created_date** | 토큰 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP | 최초 생성 시점 |
| **updated_date** | 토큰 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP | 토큰 갱신 시점 |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_refresh_tokens` (
    `token_uuid` VARCHAR(36) NOT NULL COMMENT '토큰 UUID',
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '사용자 UUID',
    `token_value` VARCHAR(500) NOT NULL COMMENT '리프레시 토큰 값',
    `token_expires_date` DATETIME NOT NULL COMMENT '만료 일시',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`token_uuid`),
    UNIQUE KEY `uk_refresh_tokens_user_uuid` (`user_uuid`), -- 중복 로그인 방지용
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_refresh_tokens_user_uuid` FOREIGN KEY (`user_uuid`) 
        REFERENCES `t_shopai_users` (`user_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;