-- 1. 사용자 테이블
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

-- 2. 사용자 리프레시 토큰 테이블
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

-- 3. 사용자 주소 테이블
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

-- 4. 쇼핑몰 카테고리 테이블
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

-- 5. 제품 테이블
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

-- 6. 사용자 장바구니 테이블
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

-- 7. 사용자 주문 테이블
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

-- 8. 주문 상품 상세 테이블
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

-- 9. 결제 마스터 테이블
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

-- 10. 상품 리뷰 테이블
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

-- 11. 리뷰 요약 AI 테이블
CREATE TABLE `t_shopai_review_summaries` (
    `summary_uuid` VARCHAR(36) NOT NULL COMMENT '리뷰 요약 UUID',
    `product_uuid` VARCHAR(36) NOT NULL COMMENT '상품 UUID',
    `summary_content` TEXT NOT NULL COMMENT 'AI 요약 내용',
    `summary_count` INT NOT NULL DEFAULT 0 COMMENT '요약된 리뷰 수',
    `last_review_uuid` VARCHAR(36) DEFAULT NULL COMMENT '마지막 반영 리뷰 ID(비교용)',
    `expires_date` DATETIME NOT NULL COMMENT '캐시 만료 시점',
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    
    -- 기본키 및 유니크 키 설정
    PRIMARY KEY (`summary_uuid`),
    UNIQUE KEY `uk_summary_product_uuid` (`product_uuid`),
    
    -- 외래키 설정: 약속된 fk_[테이블]_[컬럼] 규칙 적용
    CONSTRAINT `fk_summary_product_uuid` FOREIGN KEY (`product_uuid`) 
        REFERENCES `t_shopai_products` (`product_uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;