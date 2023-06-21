import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"

describe('Product Repository', () => {
  let sequelize: Sequelize

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      sync: {force: true},
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async() =>{
    await sequelize.close()
  })

  it('Should presents true', () => {
    expect(1).toBe(1)
  })
})
