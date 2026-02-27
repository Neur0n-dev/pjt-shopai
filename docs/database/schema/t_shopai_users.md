# ?? 사용자 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_users`
- **용도**: 사용자의 회원 정보 및 권한(USER/ADMIN)을 관리합니다. 보안을 위해 비밀번호는 해시 암호화 데이터를 저장하며, 포트폴리오 테스트 편의상 연락처는 NULL을 허용합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **user_uuid** | 사용자 고유번호 | VARCHAR(36) | PK, NOT NULL | 내부 식별용 UUID |
| **user_email** | 사용자 이메일 | VARCHAR(100) | UK, NOT NULL | 로그인 계정 (ID 역할) |
| **user_password** | 비밀번호 | VARCHAR(255) | NOT NULL | 암호화된 비밀번호 (Hash) |
| **user_name** | 사용자 이름 | VARCHAR(50) | NOT NULL | 사용자 실명 또는 닉네임 |
| **user_phone** | 사용자 연락처 | VARCHAR(20) | NULL 허용 | 연락처 (선택 사항) |
| **user_role** | 사용자 권한 | ENUM | NOT NULL | 'USER', 'ADMIN' |
| **delete_flag** | 사용자 삭제여부 | CHAR(1) | NOT NULL, DF('N') | 'N':미삭제, 'Y': 삭제 |
| **created_date** | 사용자 생성일시 | TIMESTAMP | NOT NULL | 최초 가입 시점 |
| **updated_date** | 사용자 수정일시 | TIMESTAMP | NOT NULL | 정보 수정 시점 |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_users` (
    `user_uuid` VARCHAR(36) NOT NULL COMMENT '사용자 UUID',
    `user_email` VARCHAR(100) NOT NULL COMMENT '이메일(로그인 ID)',
    `user_password` VARCHAR(255) NOT NULL COMMENT '암호화된 비밀번호(Hash)',
    `user_name` VARCHAR(50) NOT NULL COMMENT '사용자 이름/닉네임',
    `user_phone` VARCHAR(20) DEFAULT NULL COMMENT '연락처(선택)',
    `user_role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER' COMMENT '사용자 권한(USER/ADMIN)',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부(Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '정보 수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`user_uuid`),
    UNIQUE KEY `uk_users_email` (`user_email`), -- 중복 가입 방지 및 로그인 식별
    
    -- 인덱스 설정 (조회 성능 최적화)
    INDEX `idx_users_role` (`user_role`),       -- 권한별 필터링 조회용
    INDEX `idx_users_created_date` (`created_date`) -- 가입일 기준 정렬 및 통계용
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;