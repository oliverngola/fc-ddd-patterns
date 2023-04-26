import Product from "../entity/product"
import ProductService from "./product.service"

describe('ProductService Unit Tests', () => {
  it('Should change the price of all products', () => {
    const product1 = new Product("i1", "p1", 200)
    const product2 = new Product("i2", "p2", 150)
    const products = [product1, product2]
    ProductService.increasePrice(products, 100)
    expect(product1.price).toBe(400)
    expect(product2.price).toBe(300)
  })
})
