import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository"
import Product from "../../domain/entity/product"

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

  it('Should create a product', async () => {
    const productRepository =  new ProductRepository()
    const product = new Product("1", "Product 1", 100)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({where: {id: 1}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    })
  })

  it('Should update a product', async () => {
    const productRepository =  new ProductRepository()
    const product = new Product("1", "Product 1", 100)
    await productRepository.create(product)
    product.changeName("Product 2")
    product.changePrice(50)
    await productRepository.update(product) 
    const productModel = await ProductModel.findOne({where: {id: 1}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 50
    })
  })

  it('Should find a product', async () => {
    const productRepository =  new ProductRepository()
    const product = new Product("1", "Product 1", 100)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({where: {id: 1}})
    const foundProduct = await productRepository.find("1")
    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  it('Should find a product', async () => {
    const productRepository =  new ProductRepository()
    const product = new Product("p1", "Product 1", 100)
    await productRepository.create(product)
    const product2 = new Product("p2", "Product 2", 36)
    await productRepository.create(product2)
    const foundProducts = await productRepository.findAll()
    const products = [product, product2]
    expect(products).toStrictEqual(foundProducts)
  })
})
