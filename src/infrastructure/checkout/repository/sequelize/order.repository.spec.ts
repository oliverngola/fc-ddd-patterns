import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'
import ProductModel from '../../../product/repository/sequelize/product.model'
import OrderModel from './order.model'
import OrderItemModel from './order-item.model'
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository'
import Customer from '../../../../domain/customer/entity/customer'
import Address from '../../../../domain/customer/value-object/address'
import ProductRepository from '../../../product/repository/sequelize/product.repository'
import Product from '../../../../domain/product/entity/product'
import OrderItem from '../../../../domain/checkout/entity/order_item'
import Order from '../../../../domain/checkout/entity/order'
import OrderRepository from './order.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('o1', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: 'o1',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: 'o1',
          product_id: '123'
        }
      ]
    })
  })

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'Customer 01')
    customer.changeAddress(new Address('Street 1', 1, 'Zipcode 1', 'City 1'))
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product 01', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem('i1', product.name, product.price, product.id, 2)

    const order = new Order('o1', customer.id, [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderItem2 = new OrderItem('i1', product.name, product.price, product.id, 4)
    const order2 = new Order('o1', customer.id, [orderItem2])
    await orderRepository.update(order2)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order2.id,
      customer_id: order2.customerId,
      total: order2.total(),
      items: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order2.id,
          product_id: orderItem2.productId
        }
      ]
    })
  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('o1', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderResult = await orderRepository.find(order.id)

    expect(order).toStrictEqual(orderResult)
  })

  it('Should throw an error when order is not found', async () => {
    const orderRepository = new OrderRepository()
    const promise = orderRepository.find('ABC')
    await expect(promise).rejects.toThrow('Order not found')
  })

  it('Should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('o1', '123', [orderItem])

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      4
    )
    const order2 = new Order('o2', '123', [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    await orderRepository.create(order2)

    const foundOrders = await orderRepository.findAll()
    const orders = [order, order2]
    expect(orders).toHaveLength(2)
    expect(orders).toStrictEqual(foundOrders)
  })
})
