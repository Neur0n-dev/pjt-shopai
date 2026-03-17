import type {
  CategoryChildResponse,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './category.dto';
import { ConflictError, NotFoundError } from '../../common/errors';
import prisma from '../../common/prisma';

export const categoryService = {
  // === 카테고리 등록 ===
  createCategory: async (dto: CreateCategoryDto): Promise<CategoryResponse> => {
    // 1. name/slug 중복 확인
    const [nameConflict, slugConflict] = await Promise.all([
      prisma.t_shopai_categories.findFirst({
        where: { category_name: dto.name, delete_flag: 'N' },
      }),
      prisma.t_shopai_categories.findFirst({
        where: { category_slug: dto.slug, delete_flag: 'N' },
      }),
    ]);

    if (nameConflict) throw new ConflictError('이미 사용 중인 카테고리 명입니다.');
    if (slugConflict) throw new ConflictError('이미 사용 중인 슬러그입니다.');

    // 2. parentUuid 존재 확인 + depth 계산
    let depth = 1;
    if (dto.parentUuid) {
      const parent = await prisma.t_shopai_categories.findFirst({
        where: { category_uuid: dto.parentUuid, delete_flag: 'N' },
      });
      if (!parent) throw new NotFoundError('상위 카테고리를 찾을 수 없습니다.');
      depth = parent.category_depth + 1;
    }

    // 3. 카테고리 등록
    const category = await prisma.t_shopai_categories.create({
      data: {
        category_parent_uuid: dto.parentUuid ?? null,
        category_name: dto.name,
        category_slug: dto.slug,
        category_sort_order: dto.sortOrder,
        category_depth: depth,
      },
    });

    // 4. 응답 데이터
    return {
      categoryUuid: category.category_uuid,
      parentUuid: category.category_parent_uuid,
      name: category.category_name,
      slug: category.category_slug,
      sortOrder: category.category_sort_order,
      depth: category.category_depth,
      createdDate: category.created_date,
      children: [],
    };
  },

  // === 카테고리 조회 ===
  getCategory: async (): Promise<CategoryResponse[]> => {
    const categories = await prisma.t_shopai_categories.findMany({
      where: { category_parent_uuid: null, delete_flag: 'N' },
      include: {
        children: {
          where: { delete_flag: 'N' },
          orderBy: { category_sort_order: 'asc' },
        },
      },
      orderBy: { category_sort_order: 'asc' },
    });

    return categories.map((category) => ({
      categoryUuid: category.category_uuid,
      parentUuid: category.category_parent_uuid,
      name: category.category_name,
      slug: category.category_slug,
      sortOrder: category.category_sort_order,
      depth: category.category_depth,
      createdDate: category.created_date,
      children: category.children.map(
        (child): CategoryChildResponse => ({
          categoryUuid: child.category_uuid,
          name: child.category_name,
          slug: child.category_slug,
          sortOrder: child.category_sort_order,
          depth: child.category_depth,
          createdDate: child.created_date,
        }),
      ),
    }));
  },

  // === 카테고리 수정 ===
  updateCategory: async (
    categoryUuid: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryResponse> => {
    // 1. 카테고리 존재 확인
    const category = await prisma.t_shopai_categories.findFirst({
      where: { category_uuid: categoryUuid, delete_flag: 'N' },
    });
    if (!category) throw new NotFoundError('카테고리를 찾을 수 없습니다.');

    // 2. name/slug 중복 확인
    const [nameConflict, slugConflict] = await Promise.all([
      prisma.t_shopai_categories.findFirst({
        where: { category_name: dto.name, delete_flag: 'N', NOT: { category_uuid: categoryUuid } },
      }),
      prisma.t_shopai_categories.findFirst({
        where: { category_slug: dto.slug, delete_flag: 'N', NOT: { category_uuid: categoryUuid } },
      }),
    ]);

    if (nameConflict) throw new ConflictError('이미 사용 중인 카테고리 명입니다.');
    if (slugConflict) throw new ConflictError('이미 사용 중인 슬러그입니다.');

    // 3. 카테고리 수정
    const updatedCategory = await prisma.t_shopai_categories.update({
      where: { category_uuid: categoryUuid },
      data: {
        category_name: dto.name,
        category_slug: dto.slug,
        category_sort_order: dto.sortOrder,
      },
    });

    // 4. 응답 데이터
    return {
      categoryUuid: updatedCategory.category_uuid,
      parentUuid: updatedCategory.category_parent_uuid,
      name: updatedCategory.category_name,
      slug: updatedCategory.category_slug,
      sortOrder: updatedCategory.category_sort_order,
      depth: updatedCategory.category_depth,
      createdDate: updatedCategory.created_date,
      children: [],
    };
  },

  // === 카테고리 삭제 ===
  deleteCategory: async (categoryUuid: string): Promise<{ message: string }> => {
    // 1. 카테고리 존재 확인
    const exists = await prisma.t_shopai_categories.count({
      where: { category_uuid: categoryUuid, delete_flag: 'N' },
    });

    if (!exists) throw new NotFoundError('카테고리를 찾을 수 없습니다.');

    // 2. 상품 존재 확인 (본인 + 하위 카테고리 포함)
    const productCount = await prisma.t_shopai_products.count({
      where: {
        OR: [{ category_uuid: categoryUuid }, { category: { category_parent_uuid: categoryUuid } }],
        delete_flag: 'N',
      },
    });
    if (productCount > 0) {
      throw new ConflictError('상품이 존재하는 카테고리는 삭제할 수 없습니다.');
    }

    // 3. 소프트 삭제 (본인 + 하위 카테고리)
    await prisma.t_shopai_categories.updateMany({
      where: {
        OR: [{ category_uuid: categoryUuid }, { category_parent_uuid: categoryUuid }],
      },
      data: { delete_flag: 'Y' },
    });

    return { message: '카테고리가 삭제됐어요.' };
  },
};
