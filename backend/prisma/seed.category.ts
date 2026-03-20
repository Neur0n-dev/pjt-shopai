import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: '디지털/가전',
    slug: 'digital',
    children: [
      { name: '스마트폰', slug: 'smartphone' },
      { name: '노트북', slug: 'laptop' },
      { name: '태블릿', slug: 'tablet' },
      { name: '이어폰/헤드폰', slug: 'earphone' },
      { name: 'TV/모니터', slug: 'tv-monitor' },
    ],
  },
  {
    name: '패션의류',
    slug: 'fashion',
    children: [
      { name: '상의', slug: 'top' },
      { name: '하의', slug: 'bottom' },
      { name: '아우터', slug: 'outer' },
      { name: '신발', slug: 'shoes' },
      { name: '가방', slug: 'bag' },
    ],
  },
  {
    name: '뷰티',
    slug: 'beauty',
    children: [
      { name: '스킨케어', slug: 'skincare' },
      { name: '메이크업', slug: 'makeup' },
      { name: '헤어케어', slug: 'haircare' },
      { name: '바디케어', slug: 'bodycare' },
    ],
  },
  {
    name: '식품',
    slug: 'food',
    children: [
      { name: '신선식품', slug: 'fresh-food' },
      { name: '간편식', slug: 'instant-food' },
      { name: '음료/차', slug: 'beverage' },
      { name: '과자/간식', slug: 'snack' },
      { name: '건강식품', slug: 'health-food' },
    ],
  },
  {
    name: '주방/생활',
    slug: 'kitchen-life',
    children: [
      { name: '주방용품', slug: 'kitchen' },
      { name: '욕실용품', slug: 'bathroom' },
      { name: '청소용품', slug: 'cleaning' },
      { name: '생활잡화', slug: 'household' },
    ],
  },
  {
    name: '스포츠/레저',
    slug: 'sports',
    children: [
      { name: '운동복', slug: 'sportswear' },
      { name: '헬스/피트니스', slug: 'fitness' },
      { name: '아웃도어', slug: 'outdoor' },
      { name: '구기/라켓', slug: 'ball-racket' },
      { name: '수영/수상', slug: 'swimming' },
    ],
  },
];

async function main() {
  console.log('🌱 카테고리 Seed 시작...');

  for (const [index, category] of categories.entries()) {
    const parent = await prisma.t_shopai_categories.upsert({
      where: { category_slug: category.slug },
      update: {},
      create: {
        category_name: category.name,
        category_slug: category.slug,
        category_depth: 1,
        category_sort_order: index + 1,
        category_parent_uuid: null,
      },
    });

    for (const [childIndex, child] of category.children.entries()) {
      await prisma.t_shopai_categories.upsert({
        where: { category_slug: child.slug },
        update: {},
        create: {
          category_name: child.name,
          category_slug: child.slug,
          category_parent_uuid: parent.category_uuid,
          category_depth: 2,
          category_sort_order: childIndex + 1,
        },
      });
    }

    console.log(`✅ ${category.name} 등록 완료`);
  }

  console.log('🎉 카테고리 Seed 완료!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
