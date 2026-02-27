-- ==========================================================
-- 1. 관리자 및 기초 설정
-- ==========================================================
SET @admin_uuid = (SELECT user_uuid FROM t_shopai_users WHERE user_email = 'admin@shopai.com' LIMIT 1);

-- ==========================================================
-- 2. 디지털/가전 (4개 중분류)
-- ==========================================================
-- [모바일/태블릿]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '아이폰 15 프로 256GB', '티타늄 소재와 A17 Pro 칩', 1550000, 50, 'https://picsum.photos/id/160/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '갤럭시 S24 울트라', 'AI 실시간 통역 지원', 1690000, 45, 'https://picsum.photos/id/161/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '아이패드 프로 M2 11형', '전문가용 디스플레이와 성능', 1240000, 30, 'https://picsum.photos/id/162/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '갤럭시 탭 S9 128GB', '몰입감 넘치는 대화면 아몰레드', 990000, 25, 'https://picsum.photos/id/163/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '구글 픽셀 8 Pro', '구글의 순정 안드로이드 경험', 1150000, 20, 'https://picsum.photos/id/164/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '샤오미 레드미 노트 13', '최고의 가성비 스마트폰', 290000, 100, 'https://picsum.photos/id/165/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mobile-tablet'), '애플워치 시리즈 9', '가장 진보된 건강 파트너', 599000, 40, 'https://picsum.photos/id/166/400/400', 'ACTIVE');

-- [노트북/PC]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), '맥북 에어 13 M3', '얇고 가벼운 최고의 노트북', 1590000, 60, 'https://picsum.photos/id/1/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), 'LG 그램 16인치', '1199g의 초경량 대화면', 1850000, 40, 'https://picsum.photos/id/2/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), '갤럭시 북4 프로 터치', '다이내믹 아몰레드 2X', 1980000, 35, 'https://picsum.photos/id/3/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), 'ASUS ROG 제피러스 G14', '게이밍 노트북의 끝판왕', 2450000, 10, 'https://picsum.photos/id/4/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), '델 XPS 13 플러스', '베젤리스 프리미엄 울트라북', 2150000, 15, 'https://picsum.photos/id/5/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), '레노버 요가 7i', '360도 회전 2-in-1', 1350000, 20, 'https://picsum.photos/id/6/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'pc-laptop'), '아이맥 24 M3', '화사한 컬러의 올인원 PC', 1990000, 12, 'https://picsum.photos/id/7/400/400', 'ACTIVE');

-- [주방가전]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '발뮤다 더 토스터', '죽은 빵도 살려내는 스팀 토스터', 319000, 80, 'https://picsum.photos/id/10/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '쿠쿠 IH 압력밥솥', '트윈프레셔 고화력 밥맛', 420000, 100, 'https://picsum.photos/id/11/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '네스프레소 시티즈', '에스프레소 추출의 정석', 189000, 150, 'https://picsum.photos/id/12/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '필립스 에어프라이어 XXL', '기름 쏙 뺀 건강한 튀김 요리', 259000, 120, 'https://picsum.photos/id/13/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '바이타믹스 초고속 블렌더', '모든 재료를 부드럽게 가는 힘', 680000, 30, 'https://picsum.photos/id/14/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '드롱기 데디카 머신', '집에서 즐기는 정통 라떼', 350000, 50, 'https://picsum.photos/id/16/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchen-appliances'), '비스포크 전자레인지', '감각적인 컬러와 디자인', 199000, 90, 'https://picsum.photos/id/15/400/400', 'ACTIVE');

-- [생활/계절가전]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), '다이슨 V15 디텍트', '미세먼지까지 보이는 흡입력', 1090000, 40, 'https://picsum.photos/id/20/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), '로보락 S8 Pro', '자동 세척 및 건조 로봇청소기', 1550000, 25, 'https://picsum.photos/id/21/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), 'LG 퓨리케어 360', '초미세먼지 완벽 정화 가전', 950000, 50, 'https://picsum.photos/id/22/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), '발뮤다 그린팬 S', '자연풍을 재현한 저소음 선풍기', 450000, 70, 'https://picsum.photos/id/23/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), '위닉스 뽀송 제습기', '장마철에도 상쾌한 실내 공기', 380000, 100, 'https://picsum.photos/id/24/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), '다이슨 에어랩 멀티', '열 손상 없는 헤어 스타일링', 740000, 80, 'https://picsum.photos/id/25/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-appliances'), '샤오미 스마트 가습기', 'APP 연동 가능한 초음파식', 89000, 150, 'https://picsum.photos/id/26/400/400', 'ACTIVE');

-- ==========================================================
-- 3. 패션의류 (4개 중분류)
-- ==========================================================
-- [여성패션]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), '캐시미어 브이넥 가디건', '부드러운 촉감의 천연 캐시미어', 89000, 100, 'https://picsum.photos/id/100/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), 'H라인 트위드 스커트', '격식 있는 자리에 어울리는 무드', 65000, 150, 'https://picsum.photos/id/101/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), '린넨 셔츠 원피스', '시원한 소재의 데일리 원피스', 72000, 80, 'https://picsum.photos/id/102/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), '와이드 데님 슬랙스', '다리가 길어 보이는 편안한 핏', 45000, 200, 'https://picsum.photos/id/103/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), '핸드메이드 울 코트', '호주산 울 90% 하이퀄리티 코트', 249000, 30, 'https://picsum.photos/id/104/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), '플로럴 쉬폰 블라우스', '여성스러운 무드의 잔꽃 블라우스', 38000, 120, 'https://picsum.photos/id/105/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'womens-wear'), '베이직 실크 스카프', '포인트 주기 좋은 실크 100%', 25000, 300, 'https://picsum.photos/id/106/400/400', 'ACTIVE');

-- [남성패션]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '셀비지 리지드 데님', '입을수록 멋스러운 생지 청바지', 75000, 100, 'https://picsum.photos/id/110/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '옥스포드 버튼다운 셔츠', '단정한 비즈니스 캐주얼의 정석', 45000, 300, 'https://picsum.photos/id/111/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '세미오버핏 케이블 니트', '클래식한 꽈배기 패턴 스웨터', 62000, 150, 'https://picsum.photos/id/112/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '슬림핏 코튼 치노팬츠', '사계절 착용 가능한 면바지', 39000, 250, 'https://picsum.photos/id/113/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '오버사이즈 마원 자켓', '트렌디한 MA-1 항공점퍼', 98000, 60, 'https://picsum.photos/id/114/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '경량 덕다운 조끼', '겨울철 이너로 필수인 아이템', 55000, 200, 'https://picsum.photos/id/115/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'mens-wear'), '기모 조거 스웨트팬츠', '편안한 원마일웨어 팬츠', 32000, 400, 'https://picsum.photos/id/116/400/400', 'ACTIVE');

-- [신발/잡화]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '클래식 가죽 페니 로퍼', '천연 소가죽의 부드러운 로퍼', 129000, 50, 'https://picsum.photos/id/21/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '캔버스 데일리 스니커즈', '가볍고 편안한 화이트 단화', 42000, 300, 'https://picsum.photos/id/22/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '사피아노 가죽 벨트', '깔끔한 실버 버클 정장 벨트', 35000, 100, 'https://picsum.photos/id/23/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '캔버스 노트북 백팩', '대학생 추천 수납력 좋은 가방', 55000, 80, 'https://picsum.photos/id/24/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '실버 925 체인 팔찌', '심플한 디자인의 데일리 팔찌', 28000, 150, 'https://picsum.photos/id/25/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '캐시미어 100 머플러', '부드럽고 따뜻한 겨울 목도리', 69000, 60, 'https://picsum.photos/id/26/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'shoes-acc'), '미니멀 라운드 워치', '가죽 스트랩의 클래식 시계', 145000, 40, 'https://picsum.photos/id/27/400/400', 'ACTIVE');

-- [키즈패션]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '오가닉 코튼 배냇저고리', '신생아를 위한 무형광 순면', 15000, 200, 'https://picsum.photos/id/30/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '키즈 숏 푸퍼 다운', '보온성이 뛰어난 가벼운 패딩', 89000, 50, 'https://picsum.photos/id/31/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '캐릭터 상하복 세트', '아이들이 좋아하는 공룡 자수', 28000, 150, 'https://picsum.photos/id/32/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '파스텔 키즈 레인코트', '비오는 날에도 안전한 반사광', 22000, 100, 'https://picsum.photos/id/33/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '컬러풀 키즈 비니', '귀여운 방울 포인트 털모자', 12000, 300, 'https://picsum.photos/id/34/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '논슬립 아동 양말(5켤레)', '미끄럼 방지가 되어 안전한 양말', 9900, 500, 'https://picsum.photos/id/35/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kids-fashion'), '순면 키즈 파자마', '잠잘 때 편안한 루즈핏 잠옷', 19000, 200, 'https://picsum.photos/id/36/400/400', 'ACTIVE');

-- ==========================================================
-- 4. 뷰티 (4개 중분류)
-- ==========================================================
-- [스킨케어]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '히알루론산 수분 크림', '72시간 유지되는 꽉 찬 보습', 24000, 500, 'https://picsum.photos/id/40/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '시카 카밍 앰플', '붉은기 진정에 탁월한 앰플', 32000, 200, 'https://picsum.photos/id/41/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '비타C 브라이트닝 세럼', '안색 개선과 잡티 케어 전용', 38000, 150, 'https://picsum.photos/id/42/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '약산성 마일드 클렌저', '당김 없는 부드러운 세안', 15000, 400, 'https://picsum.photos/id/43/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '데일리 에어리 선크림', '끈적임 없는 가벼운 자차', 19000, 600, 'https://picsum.photos/id/44/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '레티놀 탄력 아이크림', '눈가 주름 개선 기능성 크림', 45000, 120, 'https://picsum.photos/id/45/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'skincare'), '티트리 마스크팩(10매)', '트러블 긴급 진정 시트마스크', 12000, 1000, 'https://picsum.photos/id/46/400/400', 'ACTIVE');

-- [메이크업]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '글래스 워터 틴트', '유리알 광택의 촉촉한 틴트', 14000, 300, 'https://picsum.photos/id/50/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '밀착 커버 쿠션', '다크닝 없이 화사한 베이스', 28000, 200, 'https://picsum.photos/id/51/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '데일리 무드 섀도우', '활용도 높은 9구 팔레트', 32000, 150, 'https://picsum.photos/id/52/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '슬림 프루프 라이너', '번짐 없는 초슬림 아이라이너', 9000, 500, 'https://picsum.photos/id/53/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '픽싱 롱래쉬 마스카라', '뭉침 없이 길어지는 속눈썹', 16000, 250, 'https://picsum.photos/id/54/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '피니쉬 노세범 파우더', '유분기를 잡아주는 보송한 마무리', 12000, 400, 'https://picsum.photos/id/55/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'makeup'), '톤업 실크 프라이머', '모공을 메워주는 매끈 베이스', 18000, 180, 'https://picsum.photos/id/56/400/400', 'ACTIVE');

-- [헤어/바디]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'hair-body'), '단백질 손상모 샴푸', '고영양 단백질로 케어하는 모발', 22000, 300, 'https://picsum.photos/id/60/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'hair-body'), '화이트머스크 바디워시', '포근한 향기가 오래가는 샤워', 18000, 400, 'https://picsum.photos/id/61/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'hair-body'), '모로코 아르간 헤어오일', '윤기 나는 머릿결을 위한 솔루션', 25000, 150, 'https://picsum.photos/id/62/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'hair-body'), '그레인 바디 스크럽', '각질 제거와 보습을 한 번에', 16000, 200, 'https://picsum.photos/id/63/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'hair-body'), '세라마이드 바디로션', '극건성을 위한 고보습 로션', 21000, 350, 'https://picsum.photos/id/64/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'hair-body'), '리프레싱 두피 스케일러', '답답한 두피를 시원하게 청소', 19000, 180, 'https://picsum.photos/id/65/400/400', 'ACTIVE');

-- [향수]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'perfume'), '시트러스 가든 EDP', '싱그러운 레몬과 풀 향기', 58000, 100, 'https://picsum.photos/id/70/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'perfume'), '미드나잇 우디 EDT', '깊고 차분한 샌달우드의 잔향', 62000, 80, 'https://picsum.photos/id/71/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'perfume'), '블루밍 플로럴 퍼퓸', '만개한 장미 정원의 우아함', 75000, 60, 'https://picsum.photos/id/72/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'perfume'), '퓨어 머스크 고체향수', '살결 냄새처럼 은은한 향기', 24000, 200, 'https://picsum.photos/id/73/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'perfume'), '소프 캔버스 EDP', '방금 세탁한 셔츠의 깨끗함', 49000, 120, 'https://picsum.photos/id/74/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'perfume'), '블랙 페퍼 솔리드', '중성적인 매력의 우디 페퍼', 35000, 150, 'https://picsum.photos/id/75/400/400', 'ACTIVE');

-- ==========================================================
-- 5. 식품 (4개 중분류)
-- ==========================================================
-- [신선식품]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '샤인머스캣 2kg (특)', '고당도 산지직송 프리미엄', 35000, 100, 'https://picsum.photos/id/80/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '한우 등심 구이용 300g', '마블링이 훌륭한 1등급 한우', 48000, 50, 'https://picsum.photos/id/81/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '노르웨이 생연어 500g', '슈페리어 등급 항공 직송', 29000, 60, 'https://picsum.photos/id/82/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '제주 노지 감귤 5kg', '겨울 제철 새콤달콤 감귤', 18000, 200, 'https://picsum.photos/id/83/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '친환경 샐러드팩 5종', '세척되어 바로 먹는 신선 채소', 12500, 150, 'https://picsum.photos/id/84/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '대란 30구 (무항생제)', '건강하게 키운 닭이 낳은 알', 8500, 500, 'https://picsum.photos/id/85/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fresh-food'), '국산 1A등급 우유 2.3L', '진하고 고소한 신선 우유', 6200, 300, 'https://picsum.photos/id/86/400/400', 'ACTIVE');

-- [가공식품]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '유기농 즉석밥 12입', '전자레인지 2분 건강 식단', 18900, 400, 'https://picsum.photos/id/90/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '저당 닭가슴살 스테이크', '식단 관리용 고단백 한끼', 2500, 2000, 'https://picsum.photos/id/91/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '사골 곰탕 밀키트', '진하게 우려낸 고소한 국물', 15900, 100, 'https://picsum.photos/id/92/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '프리미엄 포기김치 5kg', '국산 재료로 담근 깊은 맛', 32000, 80, 'https://picsum.photos/id/93/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '순살 치킨 가라아게', '에어프라이어 전용 냉동 간식', 11000, 300, 'https://picsum.photos/id/94/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '트러플 오일 라면 4입', '풍미 가득한 고급스러운 면 요리', 6900, 500, 'https://picsum.photos/id/95/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'processed-food'), '라이트 참치 캔 10입', '기름기를 줄인 담백한 참치', 19800, 250, 'https://picsum.photos/id/96/400/400', 'ACTIVE');

-- [생수/음료]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'beverages'), '천연 암반수 생수 2L*6', '깨끗하고 투명한 미네랄 워터', 4500, 1000, 'https://picsum.photos/id/110/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'beverages'), '레몬 라임 탄산수 500ml*20', '강한 탄산과 시원한 향', 12000, 500, 'https://picsum.photos/id/111/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'beverages'), '유기농 사과주스 1L', '물 한 방울 안 섞은 착즙 주스', 5900, 300, 'https://picsum.photos/id/112/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'beverages'), '콜드브루 커피 원액', '깊은 풍미의 대용량 원액', 18000, 150, 'https://picsum.photos/id/113/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'beverages'), '고소한 보리차 500ml*24', '언제 어디서나 구수한 차', 15000, 400, 'https://picsum.photos/id/114/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'beverages'), '슈가프리 에너지 드링크', '칼로리 걱정 없는 파워 충전', 24000, 200, 'https://picsum.photos/id/115/400/400', 'ACTIVE');

-- [건강식품]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'health-food'), '6년근 홍삼정 프리미엄', '면역력 증진을 위한 고농축액', 129000, 100, 'https://picsum.photos/id/120/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'health-food'), '100억 유산균 2개월분', '장 건강을 위한 생유산균', 35000, 500, 'https://picsum.photos/id/121/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'health-food'), '알티지 오메가3 고함량', '혈행 개선 및 눈 건강 관리', 28000, 400, 'https://picsum.photos/id/122/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'health-food'), '멀티비타민 앤 미네랄', '하루 한 알로 챙기는 활력', 19000, 600, 'https://picsum.photos/id/123/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'health-food'), '피쉬 콜라겐 파우더', '피부 흡수율 높은 저분자 콜라겐', 22000, 300, 'https://picsum.photos/id/124/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'health-food'), '마리골드 루테인 지아잔틴', '침침한 눈을 위한 필수 영양소', 25000, 250, 'https://picsum.photos/id/125/400/400', 'ACTIVE');

-- ==========================================================
-- 6. 주방/생활 (4개 중분류)
-- ==========================================================
-- [주방용품]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '내열 유리 밀폐용기 6종', '전자레인지/오븐 모두 사용 가능', 29000, 300, 'https://picsum.photos/id/130/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '세라믹 코팅 프라이팬', '눌어붙지 않는 건강한 조리', 34000, 200, 'https://picsum.photos/id/131/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '독일 스테인리스 칼 3종', '절삭력이 뛰어난 주방 칼 세트', 58000, 100, 'https://picsum.photos/id/132/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '대나무 항균 도마 세트', '위생적이고 칼집이 덜 나는 원목', 22000, 150, 'https://picsum.photos/id/133/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '실리콘 조리도구 5종', '냄비 손상 없는 부드러운 도구', 26000, 250, 'https://picsum.photos/id/134/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '미니 주방 전자저울', '1g 단위 정밀 측정이 가능한 저울', 12000, 400, 'https://picsum.photos/id/135/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'kitchenware'), '전동 와인 오프너 세트', '고급스러운 오픈과 디캔팅', 38000, 80, 'https://picsum.photos/id/136/400/400', 'ACTIVE');

-- [생활용품]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'daily-necessities'), '대나무사 고중량 타월 5장', '흡수력과 건조 속도가 빠른 수건', 28000, 500, 'https://picsum.photos/id/140/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'daily-necessities'), '고농축 액체 세제 3L', '찌든 때까지 지워주는 강력 세척', 15000, 400, 'https://picsum.photos/id/141/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'daily-necessities'), '3겹 소프트 롤 화장지 30롤', '먼지 날림 없는 부드러운 티슈', 19000, 600, 'https://picsum.photos/id/142/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'daily-necessities'), '토탈 케어 치약 10개입', '구취 제거와 치아 미백 효과', 18000, 300, 'https://picsum.photos/id/143/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'daily-necessities'), '향균 버블 핸드워시', '미세먼지까지 씻어내는 거품형', 12000, 500, 'https://picsum.photos/id/144/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'daily-necessities'), '생분해성 대형 쓰레기봉투', '환경을 생각한 탄탄한 봉투', 9000, 1000, 'https://picsum.photos/id/145/400/400', 'ACTIVE');

-- [홈인테리어]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-interior'), '우드스틱 아로마 디퓨저', '공간을 채우는 우디 향기', 22000, 300, 'https://picsum.photos/id/150/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-interior'), '미니멀 단스탠드 조명', '따뜻한 노란 빛의 무드 등', 35000, 150, 'https://picsum.photos/id/151/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-interior'), '모던 무소음 벽시계', '깔끔한 디자인의 정소음 설계', 19000, 200, 'https://picsum.photos/id/152/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-interior'), '북유럽 기하학 패턴 러그', '거실 분위기를 살리는 고급 카펫', 68000, 80, 'https://picsum.photos/id/153/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-interior'), '투명 크리스탈 화병', '꽃을 더욱 돋보이게 하는 화병', 15000, 300, 'https://picsum.photos/id/154/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'home-interior'), '전신 비정형 거울', '셀카 찍기 좋은 인테리어 거울', 120000, 40, 'https://picsum.photos/id/155/400/400', 'ACTIVE');

-- [침구]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'bedding'), '호텔급 구스다운 이불', '한겨울에도 따뜻한 거위털 충전', 189000, 50, 'https://picsum.photos/id/160/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'bedding'), '메모리폼 경추 베개', '목이 편안한 인체공학적 설계', 35000, 200, 'https://picsum.photos/id/161/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'bedding'), '고밀도 7존 매트리스 토퍼', '꺼진 침대도 살려주는 푹신함', 98000, 100, 'https://picsum.photos/id/162/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'bedding'), '냉감 소재 여름 이불', '닿는 순간 시원한 쿨링 기능성', 45000, 300, 'https://picsum.photos/id/163/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'bedding'), '프릴 순면 침대 스커트', '침대 하단을 깔끔하게 가려주는', 28000, 150, 'https://picsum.photos/id/164/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'bedding'), '알러지 케어 베개커버', '집먼지 진드기를 차단하는 원단', 9900, 500, 'https://picsum.photos/id/165/400/400', 'ACTIVE');

-- ==========================================================
-- 7. 스포츠/레저 (4개 중분류)
-- ==========================================================
-- [등산/아웃도어]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'outdoor'), '고어텍스 바람막이 자켓', '완벽한 방풍과 방수 기능', 198000, 60, 'https://picsum.photos/id/170/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'outdoor'), '경량 발수 등산화', '미끄럼 방지 아웃솔과 편안함', 145000, 80, 'https://picsum.photos/id/171/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'outdoor'), '전문가용 30L 등산 배낭', '허리 지지력이 뛰어난 수납 가방', 89000, 50, 'https://picsum.photos/id/172/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'outdoor'), '카본 3단 등산 스틱', '충격 흡수가 탁월한 초경량 스틱', 52000, 150, 'https://picsum.photos/id/173/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'outdoor'), '스마트 터치 등산 장갑', '추위 속에서도 폰 사용 가능', 18000, 300, 'https://picsum.photos/id/174/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'outdoor'), '자외선 차단 아웃도어 햇', '목 뒤까지 가려주는 챙 넓은 모자', 24000, 200, 'https://picsum.photos/id/175/400/400', 'ACTIVE');

-- [캠핑]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), '4인용 오토 원터치 텐트', '3초 만에 펼쳐지는 간편 설치', 159000, 40, 'https://picsum.photos/id/180/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), '알루미늄 롤 캠핑 테이블', '튼튼하고 가벼운 접이식 테이블', 85000, 100, 'https://picsum.photos/id/181/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), '초경량 릴렉스 체어', '머리까지 편하게 받쳐주는 의자', 42000, 250, 'https://picsum.photos/id/182/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), '주물 무쇠 그리들 33cm', '야외 고기 파티의 필수품', 39000, 120, 'https://picsum.photos/id/183/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), 'LED 감성 캠핑 랜턴', '충전식으로 오래가는 밝은 랜턴', 28000, 300, 'https://picsum.photos/id/184/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), '혹한기 사계절 침낭', '영하에서도 따뜻한 프리미엄 충전', 65000, 90, 'https://picsum.photos/id/185/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'camping'), '강력 화력 캠핑 버너', '바람막이가 내장된 휴대용 스토브', 32000, 150, 'https://picsum.photos/id/186/400/400', 'ACTIVE');

-- [골프]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '프리미엄 드라이버 (남성)', '비거리 증대와 직진성을 위한 설계', 550000, 20, 'https://picsum.photos/id/190/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '카본 아이언 7세트', '초중급자를 위한 쉬운 조작감', 890000, 15, 'https://picsum.photos/id/191/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '일자형 정밀 퍼터', '안정적인 스트로크를 돕는 퍼터', 180000, 30, 'https://picsum.photos/id/192/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '3피스 고탄성 골프공 12입', '안정적인 스핀과 압도적 비거리', 35000, 500, 'https://picsum.photos/id/193/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '경량 휠 스탠드 골프백', '이동이 간편한 바퀴 달린 캐디백', 220000, 40, 'https://picsum.photos/id/194/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '양피 골프 장갑 3매', '최상의 그립감을 선사하는 가죽 장갑', 28000, 300, 'https://picsum.photos/id/195/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'golf'), '자석 볼마커 세트', '모자에 간편하게 부착하는 마커', 15000, 200, 'https://picsum.photos/id/196/400/400', 'ACTIVE');

-- [헬스/요가]
INSERT INTO `t_shopai_products` (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status) VALUES 
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '조절식 덤벨 세트', '공간 절약형 원터치 무게 조절', 129000, 50, 'https://picsum.photos/id/200/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '고밀도 TPE 요가매트', '미끄럼 없는 논슬립 친환경 소재', 25000, 300, 'https://picsum.photos/id/201/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '딥티슈 폼롤러 60cm', '뭉친 근육을 시원하게 풀어주는', 18000, 250, 'https://picsum.photos/id/202/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '라텍스 저항 루프밴드', '단계별 강도 조절 하체 운동 필수', 9900, 600, 'https://picsum.photos/id/203/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '스테인리스 쉐이크통', '냄새 배임 없는 튼튼한 쉐이커', 15000, 400, 'https://picsum.photos/id/204/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '홈짐용 마사지 짐볼', '코어 강화와 자세 교정에 좋은', 12000, 200, 'https://picsum.photos/id/205/400/400', 'ACTIVE'),
(UUID(), @admin_uuid, (SELECT category_uuid FROM t_shopai_categories WHERE category_slug = 'fitness'), '강철 케틀벨 12kg', '전신 운동을 위한 튼튼한 마감', 35000, 100, 'https://picsum.photos/id/206/400/400', 'ACTIVE');