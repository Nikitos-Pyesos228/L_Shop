export interface BasketItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

export interface DeliveryOrder {
    orderId: string;
    userId: string;
    address: string;
    phone: string;
    paymentMethod: string;
    items: BasketItem[];
    totalPrice: number;
    createdAt: string;
}