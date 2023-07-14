import Order from './order'
import OrderItem from './order_item'

describe('Order Unit Test', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrowError('Id is required')
  })

  it('Should throw error when customerId is empty', () => {
    expect(() => new Order('12', '', [])).toThrowError('CostumerId is required')
  })

  it('Should throw error when quantity is empty', () => {
    expect(() => new Order('123', '123', [])).toThrowError('Items are requrired')
  })

  it('Should calculate total', () => {
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 2)
    const item2 = new OrderItem('i2', 'Item 2', 200, 'p2', 3)
    const order = new Order('o1', 'c1', [item1, item2])
    const total = order.total()
    expect(total).toBe(800)
  })

  it('Should throw error if item quantity is less than zero', () => {
    expect(() => {
      const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 0)
      const order = new Order('o1', 'c1', [item1])
      order.total()
    }).toThrowError('Quantity must be greater than zero')
  })
})
