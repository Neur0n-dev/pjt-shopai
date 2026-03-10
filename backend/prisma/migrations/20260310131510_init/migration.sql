-- CreateTable
CREATE TABLE `t_shopai_users` (
    `user_uuid` VARCHAR(36) NOT NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_name` VARCHAR(50) NOT NULL,
    `user_phone` VARCHAR(20) NULL,
    `user_role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `t_shopai_users_user_email_key`(`user_email`),
    PRIMARY KEY (`user_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_addresses` (
    `address_uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `address_name` VARCHAR(50) NOT NULL,
    `address_recipient` VARCHAR(50) NOT NULL,
    `address_zip_code` VARCHAR(10) NOT NULL,
    `address_base` VARCHAR(255) NOT NULL,
    `address_detail` VARCHAR(255) NULL,
    `address_default` CHAR(1) NOT NULL DEFAULT 'N',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`address_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_refresh_tokens` (
    `token_uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `token_value` VARCHAR(500) NOT NULL,
    `token_expires_date` DATETIME(3) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`token_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_categories` (
    `category_uuid` VARCHAR(36) NOT NULL,
    `category_parent_uuid` VARCHAR(36) NULL,
    `category_name` VARCHAR(50) NOT NULL,
    `category_slug` VARCHAR(50) NOT NULL,
    `category_sort_order` INTEGER NOT NULL,
    `category_depth` TINYINT NOT NULL,
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `t_shopai_categories_category_name_key`(`category_name`),
    UNIQUE INDEX `t_shopai_categories_category_slug_key`(`category_slug`),
    PRIMARY KEY (`category_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_products` (
    `product_uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `category_uuid` VARCHAR(36) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_description` TEXT NULL,
    `product_ai_description` TEXT NULL,
    `product_price` INTEGER NOT NULL,
    `product_stock` INTEGER NOT NULL,
    `product_image` VARCHAR(500) NULL,
    `product_status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`product_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_cart_items` (
    `cart_item_uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `product_uuid` VARCHAR(36) NOT NULL,
    `cart_item_quantity` INTEGER NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cart_item_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_orders` (
    `order_uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `order_number` VARCHAR(50) NOT NULL,
    `order_status` ENUM('PENDING', 'PAID', 'SHIPPING', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `order_total_amount` INTEGER NOT NULL,
    `order_recipient_name` VARCHAR(50) NOT NULL,
    `order_recipient_phone` VARCHAR(20) NOT NULL,
    `order_delivery_address` VARCHAR(500) NOT NULL,
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `t_shopai_orders_order_number_key`(`order_number`),
    PRIMARY KEY (`order_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_order_items` (
    `item_uuid` VARCHAR(36) NOT NULL,
    `order_uuid` VARCHAR(36) NOT NULL,
    `product_uuid` VARCHAR(36) NOT NULL,
    `item_product_name` VARCHAR(255) NOT NULL,
    `item_product_price` INTEGER NOT NULL,
    `item_quantity` INTEGER NOT NULL,
    `item_subtotal` INTEGER NOT NULL,
    `item_reviewed` CHAR(1) NOT NULL DEFAULT 'N',
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`item_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_payments` (
    `payment_uuid` VARCHAR(36) NOT NULL,
    `order_uuid` VARCHAR(36) NOT NULL,
    `payment_imp_uid` VARCHAR(100) NOT NULL,
    `payment_merchant_uid` VARCHAR(50) NOT NULL,
    `payment_amount` INTEGER NOT NULL,
    `payment_method` VARCHAR(100) NOT NULL,
    `payment_status` ENUM('PENDING', 'PAID', 'CANCELLED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `payment_receipt_url` VARCHAR(500) NULL,
    `payment_fail_reason` VARCHAR(255) NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `t_shopai_payments_order_uuid_key`(`order_uuid`),
    UNIQUE INDEX `t_shopai_payments_payment_imp_uid_key`(`payment_imp_uid`),
    UNIQUE INDEX `t_shopai_payments_payment_merchant_uid_key`(`payment_merchant_uid`),
    PRIMARY KEY (`payment_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_reviews` (
    `review_uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `product_uuid` VARCHAR(36) NOT NULL,
    `item_uuid` VARCHAR(36) NOT NULL,
    `review_rating` INTEGER NOT NULL,
    `review_content` TEXT NOT NULL,
    `delete_flag` CHAR(1) NOT NULL DEFAULT 'N',
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`review_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shopai_review_summaries` (
    `summary_uuid` VARCHAR(36) NOT NULL,
    `product_uuid` VARCHAR(36) NOT NULL,
    `last_review_uuid` VARCHAR(36) NOT NULL,
    `summary_content` TEXT NOT NULL,
    `summary_count` INTEGER NOT NULL,
    `expires_date` DATETIME(3) NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`summary_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_shopai_addresses` ADD CONSTRAINT `t_shopai_addresses_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `t_shopai_users`(`user_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_refresh_tokens` ADD CONSTRAINT `t_shopai_refresh_tokens_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `t_shopai_users`(`user_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_categories` ADD CONSTRAINT `t_shopai_categories_category_parent_uuid_fkey` FOREIGN KEY (`category_parent_uuid`) REFERENCES `t_shopai_categories`(`category_uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_products` ADD CONSTRAINT `t_shopai_products_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `t_shopai_users`(`user_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_products` ADD CONSTRAINT `t_shopai_products_category_uuid_fkey` FOREIGN KEY (`category_uuid`) REFERENCES `t_shopai_categories`(`category_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_cart_items` ADD CONSTRAINT `t_shopai_cart_items_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `t_shopai_users`(`user_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_cart_items` ADD CONSTRAINT `t_shopai_cart_items_product_uuid_fkey` FOREIGN KEY (`product_uuid`) REFERENCES `t_shopai_products`(`product_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_orders` ADD CONSTRAINT `t_shopai_orders_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `t_shopai_users`(`user_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_order_items` ADD CONSTRAINT `t_shopai_order_items_order_uuid_fkey` FOREIGN KEY (`order_uuid`) REFERENCES `t_shopai_orders`(`order_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_order_items` ADD CONSTRAINT `t_shopai_order_items_product_uuid_fkey` FOREIGN KEY (`product_uuid`) REFERENCES `t_shopai_products`(`product_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_payments` ADD CONSTRAINT `t_shopai_payments_order_uuid_fkey` FOREIGN KEY (`order_uuid`) REFERENCES `t_shopai_orders`(`order_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_reviews` ADD CONSTRAINT `t_shopai_reviews_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `t_shopai_users`(`user_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_reviews` ADD CONSTRAINT `t_shopai_reviews_product_uuid_fkey` FOREIGN KEY (`product_uuid`) REFERENCES `t_shopai_products`(`product_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_reviews` ADD CONSTRAINT `t_shopai_reviews_item_uuid_fkey` FOREIGN KEY (`item_uuid`) REFERENCES `t_shopai_order_items`(`item_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_review_summaries` ADD CONSTRAINT `t_shopai_review_summaries_product_uuid_fkey` FOREIGN KEY (`product_uuid`) REFERENCES `t_shopai_products`(`product_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shopai_review_summaries` ADD CONSTRAINT `t_shopai_review_summaries_last_review_uuid_fkey` FOREIGN KEY (`last_review_uuid`) REFERENCES `t_shopai_reviews`(`review_uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
