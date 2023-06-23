import Customer from '../entity/customer'
import Order from '../entity/order'
import OrderItem from '../entity/order_item'
import OrderService from './order.service'

describe('OrderService Unit Tests', () => {
  it('Should place an order', () => {
    const customer = new Customer('c1', 'Customer 1')
    const orderItem = new OrderItem('i1', 'Item 1', 10, 'p1', 1)
    const order = OrderService.placeOrder(customer, [orderItem])
    expect(customer.rewardsPoints).toBe(5)
    expect(order.total()).toBe(10)
  })

  it('Should get total of all orders', () => {
    const orderItem1 = new OrderItem('i1', 'Item 1', 200, 'p1', 1)
    const orderItem2 = new OrderItem('i2', 'Item 2', 50, 'p2', 1)
    const order1 = new Order('o1', 'c1', [orderItem1, orderItem2])
    const order2 = new Order('o1', 'c2', [orderItem2])
    const total = OrderService.total([order1, order2])
    expect(total).toBe(300)
  })
})
