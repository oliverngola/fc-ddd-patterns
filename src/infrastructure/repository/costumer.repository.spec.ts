import { Sequelize } from "sequelize-typescript"
import CostumerModel from "../db/sequelize/model/costumer.model"
import CostumerRepository from "./costumer.repository"
import Costumer from "../../domain/entity/costumer"
import Address from "../../domain/entity/address"

describe('Costumer Repository', () => {
  let sequelize: Sequelize

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: {force: true},
    })
    sequelize.addModels([CostumerModel])
    await sequelize.sync()
  })

  afterEach(async() =>{
    await sequelize.close()
  })

  it('Should create a costumer', async () => {
    const costumerRepository =  new CostumerRepository()
    const costumer = new Costumer("123", "Costumer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    costumer.changeAddress(address)
    await costumerRepository.create(costumer)
    const costumerModel = await CostumerModel.findOne({where: { id: "123" } })
    expect(costumerModel.toJSON()).toStrictEqual({
      id: "123",
      name: costumer.name,
      active: costumer.isActive(),
      rewardPoints: costumer.rewardsPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it('Should update a costumer', async () => {
    const costumerRepository =  new CostumerRepository()
    const costumer = new Costumer("123", "Costumer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    costumer.changeAddress(address)
    await costumerRepository.create(costumer)
    costumer.changeName("Costumer 2")
    await costumerRepository.update(costumer) 
    const costumerModel = await CostumerModel.findOne({where: { id: "123" }})
    expect(costumerModel.toJSON()).toStrictEqual({
      id: "123",
      name: costumer.name,
      active: costumer.isActive(),
      rewardPoints: costumer.rewardsPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  })

  it('Should find a costumer', async () => {
    const costumerRepository =  new CostumerRepository()
    const costumer = new Costumer("123", "Costumer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    costumer.changeAddress(address)
    await costumerRepository.create(costumer)
    const costumerResult = await costumerRepository.find(costumer.id)
    expect(costumer).toStrictEqual(costumerResult)
  })

  it('Should throw an error when costumer is not found', async () => {
    const costumerRepository = new CostumerRepository()
    expect(async () => {
      await costumerRepository.find("ABC")
    }).rejects.toThrow("Costumer not found")
  })

  it('Should find a costumer', async () => {
    const costumerRepository =  new CostumerRepository()
    const costumer = new Costumer("123", "Costumer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    costumer.changeAddress(address)
    costumer.addRewardPoints(10)
    costumer.activate()
    await costumerRepository.create(costumer)
    const costumer2 = new Costumer("1234", "Costumer 2")
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2")
    costumer2.changeAddress(address2)
    costumer2.addRewardPoints(5)
    costumer2.activate()
    await costumerRepository.create(costumer2)
    const foundCostumers = await costumerRepository.findAll()
    const costumers = [costumer, costumer2]
    expect(costumers).toHaveLength(2)
    expect(costumers).toStrictEqual(foundCostumers)
  })
})
