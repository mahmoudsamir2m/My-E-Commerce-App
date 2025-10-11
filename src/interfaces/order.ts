export interface OrderItem {
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  totalOrderPrice: number;
  items: OrderItem[];
  paymentMethod: string;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  createdAt: string;
  isDelivered: boolean;
}

export interface OrderResponse {
  status: string;
  data: Order[];
}
