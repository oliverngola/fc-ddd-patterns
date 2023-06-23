import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import type CostumerRepositoryInterface from '../../domain/repository/customer-repository'
import CostumerModel from '../db/sequelize/model/customer.model'

export default class CostumerRepository implements CostumerRepositoryInterface {
  async create (entity: Customer): Promise<void> {
    await CostumerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardsPoints
    })
  }

  async update (entity: Customer): Promise<void> {
    await CostumerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardsPoints
    }, {
      where: { id: entity.id }
    })
  }

  async find (id: string): Promise<Customer> {
    let costumerModel
    try {
      costumerModel = await CostumerModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error('Customer not found')
    }
    const customer = new Customer(id, costumerModel.name)
    customer.addRewardPoints(costumerModel.rewardPoints)
    customer.changeAddress(new Address(costumerModel.street, costumerModel.number, costumerModel.zipcode, costumerModel.city))
    return customer
  }

  async findAll (): Promise<Customer[]> {
    const costumerModels = await CostumerModel.findAll()
    const costumers = costumerModels.map(costumerModel => {
      const customer = new Customer(costumerModel.id, costumerModel.name)
      customer.addRewardPoints(costumerModel.rewardPoints)
      customer.changeAddress(new Address(costumerModel.street, costumerModel.number, costumerModel.zipcode, costumerModel.city))
      if (costumerModel.active) {
        customer.activate()
      }
      return customer
    })
    return costumers
  }
}
