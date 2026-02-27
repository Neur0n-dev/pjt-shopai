# ?? 쇼핑몰 카테고리 테이블 설계서 (MySQL)

## 1. 테이블 개요
- **테이블명**: `t_shopai_categories`
- **용도**: 쇼핑몰의 상품 분류를 관리하며, Self-join 구조를 통해 무한 계층(Recursive) 구조를 지원합니다.

### [테이블 정의서]
| 컬럼명 | 논리명 | 타입 | 제약 조건 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **category_uuid** | 카테고리 고유번호 | VARCHAR(36) | PK, NOT NULL | UUID |
| **category_parent_uuid** | 상위 카테고리 번호 | VARCHAR(36) | FK, NULL 허용 | 최상위(대분류)는 NULL |
| **category_name** | 카테고리 명칭 | VARCHAR(50) | UK, NOT NULL | 중복 불가 |
| **category_slug** | 카테고리 슬러그 | VARCHAR(50) | UK, NOT NULL | URL용 영문 명칭 |
| **category_sort_order** | 정렬 순서 | INT | NOT NULL, DF(0) | 숫자가 작을수록 우선 노출 |
| **category_depth** | 카테고리 깊이 | TINYINT UNSIGNED | NOT NULL, DF(1) | 1:대, 2:중, 3:소분류 |
| **delete_flag** | 삭제 여부 | CHAR(1) | NOT NULL, DF('N') | 'N':미삭제, 'Y': 삭제 |
| **created_date** | 카테고리 생성일시 | TIMESTAMP | NOT NULL | CURRENT_TIMESTAMP |
| **updated_date** | 카테고리 수정일시 | TIMESTAMP | NOT NULL | UPDATE CURRENT_TIMESTAMP |

### [DDL 스크립트]
```sql
CREATE TABLE `t_shopai_categories` (
    `category_uuid` VARCHAR(36) NOT NULL COMMENT '카테고리 UUID',
    `category_parent_uuid` VARCHAR(36) DEFAULT NULL COMMENT '부모 카테고리 UUID (최상위는 NULL)',
    `category_name` VARCHAR(50) NOT NULL COMMENT '카테고리 명칭',
    `category_slug` VARCHAR(50) NOT NULL COMMENT 'URL용 영문 명칭 (Slug)',
    `category_sort_order` INT NOT NULL DEFAULT 0 COMMENT '정렬 순서',
    `category_depth` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '깊이 (1:대, 2:중, 3:소)',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부 (Y/N)',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`category_uuid`),
    UNIQUE KEY `uk_category_name` (`category_name`),
    UNIQUE KEY `uk_category_slug` (`category_slug`),
    
    -- 인덱스 설정: 부모 카테고리 기반 조회 최적화
    INDEX `idx_category_parent_uuid` (`category_parent_uuid`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_category_parent_uuid` FOREIGN KEY (`category_parent_uuid`) 
        REFERENCES `t_shopai_categories` (`category_uuid`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;