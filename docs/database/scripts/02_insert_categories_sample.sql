-- ==========================================================
-- 1. 대분류 카테고리 (Depth 1) 생성 및 변수 저장
-- ==========================================
SET @cat_digital = UUID();
SET @cat_fashion = UUID();
SET @cat_beauty  = UUID();
SET @cat_food    = UUID();
SET @cat_living  = UUID();
SET @cat_sports  = UUID();

-- 대분류 Insert
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(@cat_digital, NULL, '디지털/가전', 'digital', 1, 1),
(@cat_fashion, NULL, '패션의류', 'fashion', 1, 2),
(@cat_beauty,  NULL, '뷰티', 'beauty', 1, 3),
(@cat_food,    NULL, '식품', 'food', 1, 4),
(@cat_living,  NULL, '주방/생활', 'living', 1, 5),
(@cat_sports,  NULL, '스포츠/레저', 'sports', 1, 6);

-- ==========================================================
-- 2. 중분류 카테고리 (Depth 2) 생성
-- ==========================================

-- [디지털/가전] 하위
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(UUID(), @cat_digital, '모바일/태블릿', 'mobile-tablet', 2, 1),
(UUID(), @cat_digital, '노트북/PC', 'pc-laptop', 2, 2),
(UUID(), @cat_digital, '주방가전', 'kitchen-appliances', 2, 3),
(UUID(), @cat_digital, '생활/계절가전', 'home-appliances', 2, 4);

-- [패션의류] 하위
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(UUID(), @cat_fashion, '여성패션', 'womens-wear', 2, 1),
(UUID(), @cat_fashion, '남성패션', 'mens-wear', 2, 2),
(UUID(), @cat_fashion, '신발/잡화', 'shoes-acc', 2, 3),
(UUID(), @cat_fashion, '키즈패션', 'kids-fashion', 2, 4);

-- [뷰티] 하위
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(UUID(), @cat_beauty, '스킨케어', 'skincare', 2, 1),
(UUID(), @cat_beauty, '메이크업', 'makeup', 2, 2),
(UUID(), @cat_beauty, '헤어/바디', 'hair-body', 2, 3),
(UUID(), @cat_beauty, '향수', 'perfume', 2, 4);

-- [식품] 하위
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(UUID(), @cat_food, '신선식품', 'fresh-food', 2, 1),
(UUID(), @cat_food, '가공식품', 'processed-food', 2, 2),
(UUID(), @cat_food, '생수/음료', 'beverages', 2, 3),
(UUID(), @cat_food, '건강식품', 'health-food', 2, 4);

-- [주방/생활] 하위
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(UUID(), @cat_living, '주방용품', 'kitchenware', 2, 1),
(UUID(), @cat_living, '생활용품', 'daily-necessities', 2, 2),
(UUID(), @cat_living, '홈인테리어', 'home-interior', 2, 3),
(UUID(), @cat_living, '침구', 'bedding', 2, 4);

-- [스포츠/레저] 하위
INSERT INTO `t_shopai_categories` (category_uuid, category_parent_uuid, category_name, category_slug, category_depth, category_sort_order) VALUES 
(UUID(), @cat_sports, '등산/아웃도어', 'outdoor', 2, 1),
(UUID(), @cat_sports, '캠핑', 'camping', 2, 2),
(UUID(), @cat_sports, '골프', 'golf', 2, 3),
(UUID(), @cat_sports, '헬스/요가', 'fitness', 2, 4);