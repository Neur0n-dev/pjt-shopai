import type {
  CartListResponse,
  CreateCartDto,
  CreateCartResponse,
  UpdateCartDto,
  UpdateCartResponse,
} from './cart.dto';
import { ConflictError, NotFoundError } from '../../common/errors';
import prisma from '../../common/prisma';

export const cartService = {
  // === 장바구니 등록 ===
  createCart: async (userUuid: string, dto: CreateCartDto): Promise<CreateCartResponse> => {
    // 1. 상품 존재 확인
    const product = await prisma.t_shopai_products.findFirst({
      where: { product_uuid: dto.productUuid, delete_flag: 'N' },
    });

    if (!product) throw new NotFoundError('존재하지 않는 상품입니다.');

    // 2. 장바구니 중복 확인
    const isCart = await prisma.t_shopai_cart_items.findFirst({
      where: { user_uuid: userUuid, product_uuid: dto.productUuid },
    });

    if (isCart) throw new ConflictError('이미 장바구니에 담긴 상품입니다.');

    // 3. 장바구니 등록
    const cart = await prisma.t_shopai_cart_items.create({
      data: {
        user_uuid: userUuid,
        product_uuid: dto.productUuid,
        cart_item_quantity: dto.itemQuantity,
      },
    });

    // 4. 응답 데이터
    return {
      cartItemUuid: cart.cart_item_uuid,
      userUuid: userUuid,
      productUuid: cart.product_uuid,
      itemQuantity: cart.cart_item_quantity,
      createdDate: cart.created_date,
    };
  },

  // === 장바구니 목록 조회 ===
  getCartList: async (userUuid: string): Promise<CartListResponse[]> => {
    // 1. 장바구니 목록 조회 (상품 정보 포함, 최신 등록순)
    const carts = await prisma.t_shopai_cart_items.findMany({
      where: { user_uuid: userUuid },
      include: {
        product: {
          select: {
            product_uuid: true,
            product_name: true,
            product_price: true,
            product_image: true,
            product_stock: true,
            product_status: true,
            delete_flag: true,
          },
        },
      },
      orderBy: { created_date: 'desc' },
    });

    // 2. 응답 데이터 (삭제된 상품 제외)
    return carts.filter((cart) => cart.product.delete_flag === 'N').map((cart) => ({
      cartItemUuid: cart.cart_item_uuid,
      itemQuantity: cart.cart_item_quantity,
      createdDate: cart.created_date,
      product: {
        productUuid: cart.product.product_uuid,
        productName: cart.product.product_name,
        productPrice: cart.product.product_price,
        productImage: cart.product.product_image,
        productStock: cart.product.product_stock,
        productStatus: cart.product.product_status,
      },
    }));
  },

  // === 장바구니 수정 ===
  updateCart: async (
    userUuid: string,
    cartUuid: string,
    dto: UpdateCartDto,
  ): Promise<UpdateCartResponse> => {
    // 1. 장바구니 아이템 존재 확인
    const cart = await prisma.t_shopai_cart_items.findFirst({
      where: { cart_item_uuid: cartUuid, user_uuid: userUuid },
    });

    if (!cart) throw new NotFoundError('장바구니 아이템을 찾을 수 없습니다.');

    // 2. 수량 업데이트
    const updatedCart = await prisma.t_shopai_cart_items.update({
      where: { cart_item_uuid: cartUuid },
      data: { cart_item_quantity: dto.itemQuantity },
    });

    // 3. 응답 데이터
    return {
      cartItemUuid: updatedCart.cart_item_uuid,
      itemQuantity: updatedCart.cart_item_quantity,
      updatedDate: updatedCart.updated_date,
    };
  },

  // === 장바구니 한건 삭제 ===
  deleteCart: async (userUuid: string, cartUuid: string): Promise<{ message: string }> => {
    // 1. 장바구니 아이템 존재 확인 (상품명 포함)
    const cart = await prisma.t_shopai_cart_items.findFirst({
      where: { cart_item_uuid: cartUuid, user_uuid: userUuid },
      include: { product: { select: { product_name: true } } },
    });

    if (!cart) throw new NotFoundError('장바구니 아이템을 찾을 수 없습니다.');

    // 2. 장바구니 아이템 삭제
    await prisma.t_shopai_cart_items.delete({
      where: { cart_item_uuid: cartUuid },
    });

    // 3. 응답 데이터
    return { message: `${cart.product.product_name}이(가) 삭제되었습니다.` };
  },

  // === 장바구니 전체 삭제 ===
  deleteAllCart: async (userUuid: string): Promise<{ message: string }> => {
    // 1. 장바구니 아이템 전체 삭제
    await prisma.t_shopai_cart_items.deleteMany({
      where: { user_uuid: userUuid },
    });

    // 2. 응답 데이터
    return { message: '장바구니가 전체 삭제 되었습니다.' };
  },
};
