import type Order from '../../domain/entity/order'
import OrderModel from '../db/sequelize/model/order.model'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import type RepositoryInterface from '../../domain/repository/repository-interface'

export default class OrderRepository implements RepositoryInterface<Order> {
  async create (entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update (entity: Order): Promise<void> {
    throw new Error('Not Implemented')
  }

  async find (id: string): Promise<Order> {
    throw new Error('Not Implemented')
  }

  async findAll (): Promise<Order[]> {
    throw new Error('Not Implemented')
  }
}
