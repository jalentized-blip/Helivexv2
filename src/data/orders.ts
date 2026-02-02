export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  strength: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
}

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    shippingAddress: '123 Research Lane, Science City, SC 12345',
    items: [
      { productId: 'tirz', name: 'TIRZEPATIDE', strength: '10mg', quantity: 2, price: 120.00 }
    ],
    totalAmount: 240.00,
    status: 'processing',
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    shippingAddress: '456 Lab Way, Innovation Park, IP 67890',
    items: [
      { productId: 'tesa', name: 'TESA', strength: '10mg', quantity: 1, price: 85.00 },
      { productId: 'vip', name: 'VIP', strength: '5mg', quantity: 1, price: 110.00 }
    ],
    totalAmount: 195.00,
    status: 'shipped',
    createdAt: '2026-01-30T14:30:00Z',
    trackingNumber: 'HXV123456789'
  }
];
