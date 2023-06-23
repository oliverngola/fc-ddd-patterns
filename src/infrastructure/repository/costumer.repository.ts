import Address from '../../domain/entity/address'
import Costumer from '../../domain/entity/costumer'
import type CostumerRepositoryInterface from '../../domain/repository/costumer-repository'
import CostumerModel from '../db/sequelize/model/costumer.model'

export default class CostumerRepository implements CostumerRepositoryInterface {
  async create (entity: Costumer): Promise<void> {
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

  async update (entity: Costumer): Promise<void> {
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

  async find (id: string): Promise<Costumer> {
    let costumerModel
    try {
      costumerModel = await CostumerModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error('Costumer not found')
    }
    const costumer = new Costumer(id, costumerModel.name)
    costumer.addRewardPoints(costumerModel.rewardPoints)
    costumer.changeAddress(new Address(costumerModel.street, costumerModel.number, costumerModel.zipcode, costumerModel.city))
    return costumer
  }

  async findAll (): Promise<Costumer[]> {
    const costumerModels = await CostumerModel.findAll()
    const costumers = costumerModels.map(costumerModel => {
      const costumer = new Costumer(costumerModel.id, costumerModel.name)
      costumer.addRewardPoints(costumerModel.rewardPoints)
      costumer.changeAddress(new Address(costumerModel.street, costumerModel.number, costumerModel.zipcode, costumerModel.city))
      if (costumerModel.active) {
        costumer.activate()
      }
      return costumer
    })
    return costumers
  }
}
