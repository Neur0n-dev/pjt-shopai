import type {
  CreateProductDto,
  CreateProductResponse,
  ProductDetailResponse,
  ProductListQueryDto,
  ProductListResponse,
  UpdateProductDto,
  UpdateProductResponse,
} from './product.dto';
import { NotFoundError, ValidationError } from '../../common/errors';
import prisma from '../../common/prisma';
import { Prisma } from '../../generated/prisma/client';

export const productService = {
  // === 상품 등록 ===
  createProduct: async (
    userUuid: string,
    dto: CreateProductDto,
  ): Promise<CreateProductResponse> => {
    // 1. 카테고리 존재 확인
    const category = await prisma.t_shopai_categories.findFirst({
      where: { category_uuid: dto.categoryUuid, delete_flag: 'N' },
    });
    if (!category) throw new NotFoundError('카테고리를 찾을 수 없습니다.');

    // 2. 상품 등록
    const product = await prisma.t_shopai_products.create({
      data: {
        user_uuid: userUuid,
        category_uuid: dto.categoryUuid,
        product_name: dto.name,
        product_description: dto.description ?? null,
        product_price: dto.price,
        product_stock: dto.stock,
        product_image: dto.image ?? null,
      },
    });

    // 3. 응답 데이터
    return {
      productUuid: product.product_uuid,
      categoryUuid: product.category_uuid,
      name: product.product_name,
      description: product.product_description,
      price: product.product_price,
      stock: product.product_stock,
      image: product.product_image,
      status: product.product_status,
      createdDate: product.created_date,
    };
  },

  // === 상품 목록 조회 ===
  getProductList: async (query: ProductListQueryDto): Promise<ProductListResponse> => {
    const { categoryUuid, status, search, sort, page, limit } = query;

    // 1. 필터 조건 구성 (카테고리 / 상태 / 상품명 검색)
    const where: Prisma.t_shopai_productsWhereInput = { delete_flag: 'N' };
    if (categoryUuid) where.category_uuid = categoryUuid;
    if (status) where.product_status = status;
    if (search) where.product_name = { contains: search };

    // 2. 정렬 조건 구성 (가격 낮은순 / 높은순 / 기본: 최신순)
    const orderBy =
      sort === 'price_asc'
        ? { product_price: 'asc' as const }
        : sort === 'price_desc'
          ? { product_price: 'desc' as const }
          : { created_date: 'desc' as const };

    // 3. 목록 조회 + 전체 개수 병렬 조회
    const [list, total] = await Promise.all([
      prisma.t_shopai_products.findMany({
        where,
        select: {
          product_uuid: true,
          category_uuid: true,
          product_name: true,
          product_price: true,
          product_stock: true,
          product_image: true,
          product_status: true,
          created_date: true,
          category: { select: { category_name: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.t_shopai_products.count({ where }),
    ]);

    // 4. 응답 데이터
    return {
      list: list.map((item) => ({
        productUuid: item.product_uuid,
        categoryUuid: item.category_uuid,
        categoryName: item.category.category_name,
        name: item.product_name,
        price: item.product_price,
        stock: item.product_stock,
        image: item.product_image,
        status: item.product_status,
        createdDate: item.created_date,
      })),
      total,
      page,
      limit,
    };
  },

  // === 상품 상세 조회 ===
  getProductDetail: async (productUuid: string): Promise<ProductDetailResponse> => {
    // 1. 상품 존재 확인
    const product = await prisma.t_shopai_products.findFirst({
      where: { product_uuid: productUuid, delete_flag: 'N' },
      select: {
        product_uuid: true,
        category_uuid: true,
        product_name: true,
        product_description: true,
        product_ai_description: true,
        product_price: true,
        product_stock: true,
        product_image: true,
        product_status: true,
        created_date: true,
        category: { select: { category_name: true } },
      },
    });
    if (!product) throw new NotFoundError('상품을 찾을 수 없습니다.');

    // 2. 응답 데이터
    return {
      productUuid: product.product_uuid,
      categoryUuid: product.category_uuid,
      categoryName: product.category.category_name,
      name: product.product_name,
      description: product.product_description,
      aiDescription: product.product_ai_description,
      price: product.product_price,
      stock: product.product_stock,
      image: product.product_image,
      status: product.product_status,
      createdDate: product.created_date,
    };
  },

  // === 상품 수정 ===
  updateProduct: async (
    productUuid: string,
    dto: UpdateProductDto,
  ): Promise<UpdateProductResponse> => {
    // 1. 상품 존재 확인
    const product = await prisma.t_shopai_products.findFirst({
      where: { product_uuid: productUuid, delete_flag: 'N' },
    });
    if (!product) throw new NotFoundError('상품을 찾을 수 없습니다.');

    // 2. 카테고리 변경 시 존재 확인
    if (dto.categoryUuid) {
      const category = await prisma.t_shopai_categories.findFirst({
        where: { category_uuid: dto.categoryUuid, delete_flag: 'N' },
      });
      if (!category) throw new NotFoundError('카테고리를 찾을 수 없습니다.');
    }

    // 3. 상품 수정
    const data: Prisma.t_shopai_productsUncheckedUpdateInput = {};
    if (dto.categoryUuid !== undefined) data.category_uuid = dto.categoryUuid;
    if (dto.name !== undefined) data.product_name = dto.name;
    if (dto.description !== undefined) data.product_description = dto.description;
    if (dto.price !== undefined) data.product_price = dto.price;
    if (dto.stock !== undefined) data.product_stock = dto.stock;
    if (dto.image !== undefined) data.product_image = dto.image;
    if (dto.status !== undefined) data.product_status = dto.status;

    if (Object.keys(data).length === 0) {
      throw new ValidationError('수정할 항목을 하나 이상 입력해주세요.');
    }

    const updated = await prisma.t_shopai_products.update({
      where: { product_uuid: productUuid },
      data,
    });

    // 4. 응답 데이터
    return {
      productUuid: updated.product_uuid,
      categoryUuid: updated.category_uuid,
      name: updated.product_name,
      description: updated.product_description,
      price: updated.product_price,
      stock: updated.product_stock,
      image: updated.product_image,
      status: updated.product_status,
      updatedDate: updated.updated_date,
    };
  },

  // === 상품 삭제 ===
  deleteProduct: async (productUuid: string): Promise<{ message: string }> => {
    // 1. 상품 존재 확인
    const product = await prisma.t_shopai_products.findFirst({
      where: { product_uuid: productUuid, delete_flag: 'N' },
    });
    if (!product) throw new NotFoundError('상품을 찾을 수 없습니다.');

    // 2. 소프트 삭제
    await prisma.t_shopai_products.update({
      where: { product_uuid: productUuid },
      data: { delete_flag: 'Y' },
    });

    return { message: '상품이 삭제됐습니다.' };
  },
};
