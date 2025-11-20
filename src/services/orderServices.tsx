import type { CartItem, ShippingInfo } from '../types/product'; // ✅ Importar desde types

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: Date;
  paymentIntentId?: string;
}

/**
 * Servicio para manejar órdenes (temporalmente en memoria)
 * ⚠️ EN PRODUCCIÓN: Reemplazar con llamadas a tu backend
 */
class OrderService {
  private mockOrders: Order[] = [];

  /**
   * Crea una orden temporal después del pago exitoso
   * @param cartItems - Productos del carrito
   * @param shippingInfo - Información de envío
   * @param totalAmount - Monto total pagado
   * @param paymentIntentId - ID de Stripe para referencia
   * @returns ID de la orden creada
   */
  async createOrder(
    cartItems: CartItem[],
    shippingInfo: ShippingInfo,
    totalAmount: number,
    paymentIntentId: string
  ): Promise<string> {
    // TODO: En producción, llamar a tu backend aquí:
    // const response = await fetch(`${API_URL}/orders`, { method: 'POST', ... });
    // return response.json();

    // Simulación para desarrollo:
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      shippingInfo,
      totalAmount,
      status: 'paid',
      createdAt: new Date(),
      paymentIntentId,
    };

    this.mockOrders.push(order);
    console.log('✅ Orden creada (mock):', order);
    
    // Guardar en localStorage para persistencia básica
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    return order.id;
  }

  /**
   * Obtiene una orden por ID (útil para página de seguimiento)
   * @param orderId - ID de la orden
   */
  async getOrder(orderId: string): Promise<Order | null> {
    // TODO: En producción: await fetch(`${API_URL}/orders/${orderId}`)
    return this.mockOrders.find(order => order.id === orderId) || null;
  }

  /**
   * Obtiene la última orden del usuario (para página de éxito)
   */
  getLastOrder(): Order | null {
    const stored = localStorage.getItem('lastOrder');
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Limpia la última orden (después de mostrarla)
   */
  clearLastOrder(): void {
    localStorage.removeItem('lastOrder');
  }
}

// Exporta una instancia única (singleton)
export const orderService = new OrderService();