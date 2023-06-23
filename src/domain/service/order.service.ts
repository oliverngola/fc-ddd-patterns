import type Costumer from '../entity/costumer'
import Order from '../entity/order'
import type OrderItem from '../entity/order_item'
import { v4 as uuid } from 'uuid'

export default class OrderService {
  static placeOrder (costumer: Costumer, items: OrderItem[]): Order {
    const order = new Order(uuid(), costumer.id, items)
    costumer.addRewardPoints(order.total() / 2)
    return order
  }

  static total (orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }
}
