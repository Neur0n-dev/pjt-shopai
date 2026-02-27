-- ================================================
-- 사전 준비: admin 유저 UUID 고정값 사용
-- @ADMIN_UUID = 'a0000000-0000-0000-0000-000000000001'
-- ================================================

-- ================================================
-- 모바일/태블릿
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '삼성 갤럭시 S24 Ultra 256GB', '최신 삼성 플래그십 스마트폰', 1350000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'mobile-tablet'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아이폰 15 Pro 128GB', '애플 최신 프리미엄 스마트폰', 1350000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'mobile-tablet'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '삼성 갤럭시 탭 S9 FE', '삼성 미드레인지 태블릿', 520000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'mobile-tablet'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아이패드 Air 5세대 64GB', '애플 고성능 태블릿', 899000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'mobile-tablet'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '샤오미 레드미 노트 12', '가성비 스마트폰', 280000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'mobile-tablet'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '갤럭시 버즈 2 Pro', '삼성 무선 이어폰', 189000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'mobile-tablet';

-- ================================================
-- 노트북/PC
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '삼성 갤럭시북 4 Pro 16인치', '삼성 프리미엄 노트북', 1890000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'laptop-pc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '애플 맥북 에어 M2 13인치', '애플 실리콘 탑재 노트북', 1590000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'laptop-pc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'LG 그램 17인치 2024', '초경량 고성능 노트북', 1750000, 18, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'laptop-pc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'ASUS ROG Zephyrus G14', '게이밍 노트북', 1990000, 12, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'laptop-pc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '삼성 오디세이 27인치 모니터', '고주사율 게이밍 모니터', 450000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'laptop-pc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '로지텍 MX Keys 무선키보드', '프리미엄 무선 키보드', 139000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'laptop-pc';

-- ================================================
-- 주방가전
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '쿠쿠 IH 전기밥솥 10인용', '고압 IH 전기밥솥', 289000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '브레빌 에스프레소 머신', '홈카페용 에스프레소 머신', 650000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '필립스 에어프라이어 XXL', '대용량 에어프라이어', 189000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '발뮤다 토스터 오븐', '프리미엄 스팀 토스터', 329000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'LG 디오스 식기세척기 12인용', '빌트인 식기세척기', 890000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '드롱기 전기포트 1.7L', '온도조절 전기포트', 89000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-appliance';

-- ================================================
-- 생활/계절가전
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'LG 퓨리케어 공기청정기 360', '360도 공기청정기', 650000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'life-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '위닉스 제습기 16L', '대용량 제습기', 289000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'life-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '다이슨 슈퍼소닉 드라이어', '프리미엄 헤어드라이어', 580000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'life-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '샤오미 로봇청소기 S10+', '자동 물걸레 로봇청소기', 450000, 22, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'life-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '코웨이 정수기 아이콘2', '직수형 냉온정수기', 199000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'life-appliance'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '신일 DCF 서큘레이터', '360도 회전 서큘레이터', 79000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'life-appliance';

-- ================================================
-- 여성패션
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '롱 플리츠 스커트 (베이지)', '봄/여름 플리츠 롱스커트', 45000, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '오버핏 린넨 블라우스 (화이트)', '시원한 린넨 소재 블라우스', 38000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '와이드 데님 팬츠 (블루)', '트렌디한 와이드 핏 청바지', 52000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '크롭 가디건 (라이트그레이)', '데일리 크롭 가디건', 42000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '플로럴 원피스 (네이비)', '봄 플라워 패턴 원피스', 65000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '트렌치코트 (카멜)', '클래식 트렌치코트', 128000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '니트 카라 티셔츠 (블랙)', '세련된 카라 니트 티셔츠', 35000, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'women-fashion';

-- ================================================
-- 남성패션
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '슬림핏 치노 팬츠 (베이지)', '깔끔한 슬림핏 치노', 48000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '옥스포드 셔츠 (화이트)', '클래식 옥스포드 셔츠', 42000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '레귤러핏 청바지 (인디고)', '데일리 레귤러핏 데님', 55000, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '맨투맨 스웨트셔츠 (그레이)', '베이직 맨투맨', 38000, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '울 혼방 코트 (차콜)', '겨울 울 혼방 코트', 148000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아노락 자켓 (올리브)', '스트릿 아노락 자켓', 89000, 45, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '폴로 피케 티셔츠 (네이비)', '클래식 폴로 티셔츠', 32000, 110, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'men-fashion';

-- ================================================
-- 신발/잡화
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '나이키 에어맥스 270 (화이트)', '에어쿠션 데일리 스니커즈', 139000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아디다스 스탠스미스 (화이트/그린)', '클래식 레더 스니커즈', 109000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '닥터마틴 1460 8홀 부츠 (블랙)', '클래식 워커 부츠', 229000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '뉴발란스 993 (그레이)', '데일리 러닝화', 189000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '코치 레더 토트백 (탄)', '프리미엄 레더 토트백', 380000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '빈폴 캔버스 백팩 (네이비)', '데일리 캔버스 백팩', 89000, 45, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '캐스키드슨 파우치 (플로럴)', '플로럴 패턴 파우치', 45000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'shoes-acc';

-- ================================================
-- 키즈패션
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아동 후드 집업 (핑크)', '귀여운 아동용 후드 집업', 28000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '키즈 데님 오버롤 (블루)', '트렌디한 아동 데님 오버롤', 35000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아동 운동화 (화이트)', '가벼운 아동 운동화', 42000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '유아 바디수트 5종 세트', '순면 유아 바디수트', 32000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '키즈 기모 트레이닝 세트', '따뜻한 기모 트레이닝', 38000, 75, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아동 패딩 점퍼 (네이비)', '가벼운 아동 경량 패딩', 65000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '유아 수면 조끼 (그레이)', '포근한 유아 수면 조끼', 22000, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kids-fashion';

-- ================================================
-- 스킨케어
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '이니스프리 그린티 씨드 세럼 80ml', '수분 충전 그린티 세럼', 32000, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '설화수 윤조에센스 150ml', '한방 성분 기능성 에센스', 145000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '라운드랩 자작나무 수분크림 80ml', '자작나무 수액 수분크림', 18000, 150, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '코스알엑스 달팽이 올인원 크림', '달팽이 분비물 재생크림', 22000, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'SK-II 페이셜 트리트먼트 에센스 230ml', '피테라 성분 에센스', 198000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아이오페 레티놀 엑스퍼트 0.1%', '고농도 레티놀 세럼', 68000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '닥터자르트 시카페어 크림 50ml', '진정 시카 크림', 29000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'skincare';

-- ================================================
-- 메이크업
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '맥 루비우 립스틱', '클래식 레드 립스틱', 35000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '롬앤 제로 벨벳 틴트 #누드베이지', '매트 벨벳 립틴트', 13000, 200, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '에스쁘아 프로 테일러 파운데이션', '커버력 높은 파운데이션', 38000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '클리오 킬커버 쿠션 #21호', '고커버 쿠션 파운데이션', 22000, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '투쿨포스쿨 아트클래스 쉐딩', '자연스러운 음영 쉐딩', 18000, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '나르시스트 워터리 틴트 #피치코럴', '촉촉한 워터리 틴트', 15000, 150, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '어바웃톤 선크림 50ml SPF50+', '가벼운 데일리 선크림', 16000, 180, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'makeup';

-- ================================================
-- 헤어/바디
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '케라스타즈 레지스탕스 샴푸 250ml', '손상모 전용 샴푸', 38000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '려 함빛 손상케어 트리트먼트 200ml', '한방 성분 트리트먼트', 18000, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '다이슨 에어랩 멀티스타일러', '올인원 헤어 스타일러', 699000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '니베아 보디로션 400ml', '촉촉한 수분 바디로션', 8900, 200, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '바이오더마 샤워오일 200ml', '민감성 피부 샤워오일', 24000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아로마티카 로즈마리 두피 토닉 100ml', '두피 강화 토닉', 19000, 110, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '해브앤비 닥터포헤어 샴푸 500ml', '탈모 케어 샴푸', 22000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hair-body';

-- ================================================
-- 향수
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '조말론 우드세이지앤씨솔트 100ml', '우디 시트러스 향수', 235000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '샤넬 No.5 오드퍼퓸 50ml', '클래식 플로럴 향수', 198000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '딥디크 오로즈 오드뚜왈렛 50ml', '로즈 플로럴 향수', 175000, 22, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '불가리 옴니아 크리스탈린 65ml', '청량한 플로럴 향수', 89000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아쿠아 디 파르마 콜로니아 100ml', '이탈리안 시트러스 향수', 145000, 18, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '르라보 샌달 33 50ml', '우디 샌달우드 향수', 289000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '몰튼브라운 오렌지앤베르가못 100ml', '시트러스 우디 향수', 78000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'perfume';

-- ================================================
-- 신선식품
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '국내산 한우 등심 500g (1++)', '최상급 한우 등심', 89000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '제주 갈치 손질 2마리', '제주산 손질 갈치', 28000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '친환경 유기농 방울토마토 1kg', '유기농 인증 방울토마토', 8900, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '국내산 삼겹살 500g', '신선한 국내산 돼지 삼겹살', 18000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '완도 활전복 10마리', '완도산 싱싱한 활전복', 35000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '제철 과일 혼합 세트 3kg', '사과/배/감귤 혼합 세트', 25000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '국내산 달걀 30구', '신선한 국내산 달걀', 8500, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fresh-food';

-- ================================================
-- 가공식품
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '신라면 멀티팩 20개입', '매콤한 국민 라면', 12800, 150, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'CJ 비비고 왕교자 1.05kg', '두툼한 고기 왕교자', 11900, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '동원 참치 135g 8캔', '국민 참치 캔 세트', 16800, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '오뚜기 진라면 순한맛 20개입', '부드러운 순한 라면', 11500, 130, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '하인즈 토마토 케첩 570g', '진한 토마토 케첩', 6500, 200, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '농심 새우깡 90g 10봉', '바삭한 새우맛 과자', 9800, 110, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '롯데 빼빼로 초코 20개 세트', '초코 빼빼로 선물 세트', 18000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'processed-food';

-- ================================================
-- 생수/음료
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '제주삼다수 2L 12병', '제주 화산암반수', 14400, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '스타벅스 콜드브루 블랙 275ml 10캔', '진한 콜드브루 커피', 22000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '포카리스웨트 500ml 20병', '이온 음료 대용량 세트', 18000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '비타500 100ml 10병', '비타민C 음료 세트', 6900, 150, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '산 페레그리노 스파클링 500ml 24병', '이탈리안 탄산수', 32000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '보성 녹차 티백 50개입', '국내산 녹차 티백', 12000, 110, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '네스카페 돌체구스토 캡슐 16개입', '홈카페 커피 캡슐', 14900, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'water-drink';

-- ================================================
-- 건강식품
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '종근당 오메가3 60캡슐', '혈행 개선 오메가3', 18900, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '한미 비타민C 1000mg 180정', '고함량 비타민C', 15900, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'GNC 프로퍼포먼스 유청단백질 2kg', '고품질 웨이프로틴', 89000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '정관장 홍삼정 에브리타임 10ml 30포', '고농축 홍삼 스틱', 78000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '뉴트리원 루테인 지아잔틴 60캡슐', '눈 건강 루테인', 22000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '센트룸 멀티비타민 100정', '종합 멀티비타민', 28000, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '일동후디스 하이뮨 프로틴 밸런스 280g', '단백질 영양 파우더', 32000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'health-food';

-- ================================================
-- 주방용품
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '르쿠르제 무쇠냄비 22cm (체리)', '프리미엄 에나멜 무쇠냄비', 398000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '테팔 인덕션 프라이팬 28cm', '코팅 프라이팬', 45000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '조셉조셉 도마 세트 4종', '위생적인 컬러 도마 세트', 38000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '글로벌 주방칼 세트 3종', '일본산 고급 주방칼', 189000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '옥소 스테인리스 계량컵 세트', '눈금 선명 계량컵 4종', 28000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '코렐 순백 그릇 16종 세트', '깔끔한 순백 식기 세트', 89000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '지퍼락 프리저백 대형 30매', '냉동 보관용 지퍼백', 8900, 150, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'kitchen-tools';

-- ================================================
-- 생활용품
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '다우니 섬유유연제 퍼플 2.6L', '향기로운 섬유유연제', 18900, 100, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '피지 주방세제 1L 2개입', '강력 세정 주방세제', 8900, 150, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '락앤락 클래식 밀폐용기 10종 세트', '냉장/냉동 밀폐용기', 35000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '3M 스카치브라이트 수세미 10개입', '내구성 강한 수세미', 6900, 200, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '유한킴벌리 크리넥스 티슈 30입', '부드러운 미용 티슈', 22000, 120, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '에코버 세탁세제 1.5L', '친환경 식물성 세탁세제', 16900, 90, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '다이소 수납박스 5종 세트', '정리정돈 수납박스', 15000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'daily-goods';

-- ================================================
-- 홈인테리어
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '이케아 KALLAX 선반 4칸 (화이트)', '모던 수납 선반', 89000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '북유럽 패브릭 쿠션 45x45 2개 세트', '인테리어 소파 쿠션', 28000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '캔들워머 램프 + 캔들 세트', '무화염 캔들 워머 세트', 45000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, 'LED 간접조명 스탠드 (화이트)', '무드 조명 스탠드', 38000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '행잉 플랜트 바구니 3종 세트', '라탄 플랜트 행거', 22000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '원목 사이드테이블 (내추럴)', '내추럴 원목 협탁', 65000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '무인양품 스틸 유닛 선반', '심플한 철제 수납 선반', 145000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'home-interior';

-- ================================================
-- 침구
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '이브자리 구스다운 이불 싱글', '따뜻한 구스다운 이불', 189000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '호텔식 순면 베개 2개 세트', '호텔 품질 면 베개', 65000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '한샘 매트리스 토퍼 퀸 7cm', '메모리폼 매트리스 토퍼', 128000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '무형광 순면 이불커버 퀸 (화이트)', '피부에 안전한 순면 커버', 48000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '극세사 전기요 싱글 (그레이)', '빠른 발열 전기요', 45000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '메모리폼 목베개 (라벤더)', '경추 지지 메모리폼 베개', 29000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '시몬스 베개 솜 2개입', '호텔식 베개 속 충전재', 38000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'bedding';

-- ================================================
-- 등산/아웃도어
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '노스페이스 눕시 다운재킷 (블랙)', '경량 구스다운 재킷', 398000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '살로몬 X울트라4 등산화 (그레이)', '방수 트레킹화', 189000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '블랙다이아몬드 트레킹폴 2개 세트', '알루미늄 트레킹폴', 98000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '오스프리 아텐 65L 배낭 (블루)', '대용량 등산 배낭', 298000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '파타고니아 소프트쉘 재킷', '방풍 소프트쉘 자켓', 248000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '아이젠 10발 크램폰 (겨울용)', '빙판길 안전 아이젠', 45000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '써멀 기능성 등산 내의 세트', '발열 기능성 이너웨어', 55000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'hiking-outdoor';

-- ================================================
-- 캠핑
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '코베아 엘리트 텐트 4인용', '방수 패밀리 텐트', 398000, 10, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '스노우피크 싱글 버너 GS-100', '경량 캠핑 버너', 89000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '콜맨 쿨러 28L (블루)', '아이스박스 쿨러', 89000, 25, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '헬리녹스 체어원 캠핑의자', '경량 폴딩 캠핑 의자', 148000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '네이처하이크 침낭 -5도', '3계절 경량 침낭', 89000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '이글크릭 캠핑 랜턴 LED', '충전식 LED 캠핑 랜턴', 45000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '캠핑 폴딩 테이블 알루미늄', '경량 접이식 캠핑 테이블', 65000, 30, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'camping';

-- ================================================
-- 골프
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '타이틀리스트 Pro V1 골프공 12개', '프로 투어 골프공', 78000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '캘러웨이 REVA 아이언 세트 7개', '여성용 아이언 세트', 890000, 8, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '테일러메이드 SIM2 드라이버', '고반발 드라이버', 650000, 10, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '풋조이 프로SLX 골프화 (화이트)', '방수 투어 골프화', 248000, 15, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '나이키 드라이핏 골프 폴로 티셔츠', '기능성 골프 티셔츠', 65000, 40, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '핑 후드 골프 캐디백 (네이비)', '대용량 스탠드 캐디백', 398000, 12, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '보이스 캐디 T9 거리측정기', '레이저 골프 거리측정기', 298000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'golf';

-- ================================================
-- 헬스/요가
-- ================================================
INSERT INTO products (product_uuid, user_uuid, category_uuid, product_name, product_description, product_price, product_stock, product_image, product_status, delete_flag, created_date, updated_date)
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '룰루레몬 얼라인 레깅스 (블랙)', '프리미엄 요가 레깅스', 148000, 50, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '만도라 TPE 요가매트 6mm', '미끄럼방지 요가 매트', 35000, 80, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '나이키 메트콘 8 트레이닝화', '크로스핏 트레이닝화', 138000, 35, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '보우플렉스 조절식 덤벨 24kg', '공간절약 가변 덤벨', 398000, 10, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '어더아머 컴프레션 반팔 (블랙)', '기능성 압박 티셔츠', 55000, 60, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '리복 폼롤러 45cm', '근막 이완 폼롤러', 28000, 70, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga'
UNION ALL
SELECT UUID(), 'a0000000-0000-0000-0000-000000000001', category_uuid, '가민 포어러너 265 스마트워치', 'GPS 러닝 스마트워치', 498000, 20, NULL, 'ACTIVE', 'N', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM categories WHERE category_slug = 'fitness-yoga';