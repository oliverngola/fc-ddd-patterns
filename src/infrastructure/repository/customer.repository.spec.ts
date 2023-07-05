import { Sequelize } from 'sequelize-typescript'
import CostumerModel from '../db/sequelize/model/customer.model'
import CustomerRepository from './customer.repository'
import Customer from '../../domain/entity/customer'
import Address from '../../domain/entity/address'

describe('Customer Repository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([CostumerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('Should create a customer', async () => {
    const costumerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await costumerRepository.create(customer)
    const costumerModel = await CostumerModel.findOne({ where: { id: '123' } })
    expect(costumerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardsPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it('Should update a customer', async () => {
    const costumerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await costumerRepository.create(customer)
    customer.changeName('Customer 2')
    await costumerRepository.update(customer)
    const costumerModel = await CostumerModel.findOne({ where: { id: '123' } })
    expect(costumerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardsPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it('Should find a customer', async () => {
    const costumerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await costumerRepository.create(customer)
    const costumerResult = await costumerRepository.find(customer.id)
    expect(customer).toStrictEqual(costumerResult)
  })

  it('Should throw an error when customer is not found', async () => {
    const costumerRepository = new CustomerRepository()
    const promise = costumerRepository.find('ABC')
    await expect(promise).rejects.toThrow('Customer not found')
  })

  it('Should find a customer', async () => {
    const costumerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    customer.addRewardPoints(10)
    customer.activate()
    await costumerRepository.create(customer)
    const costumer2 = new Customer('1234', 'Customer 2')
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2')
    costumer2.changeAddress(address2)
    costumer2.addRewardPoints(5)
    costumer2.activate()
    await costumerRepository.create(costumer2)
    const foundCostumers = await costumerRepository.findAll()
    const costumers = [customer, costumer2]
    expect(costumers).toHaveLength(2)
    expect(costumers).toStrictEqual(foundCostumers)
  })
})
