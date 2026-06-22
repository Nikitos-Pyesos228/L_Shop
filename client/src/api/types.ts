/**
 * Интерфейс товара в корзине.
 */
export interface IBasketItem {
  productId: string;
  quantity: number;
}

/**
 * Структура данных корзины, приходящая от API.
 */
export interface IBasket {
  userId: string;
  items: IBasketItem[];
}

/**
 * Тип ответа при успешном оформлении заказа.
 */
export interface ICheckoutResponse {
  message: string;
  orderId?: string;
}