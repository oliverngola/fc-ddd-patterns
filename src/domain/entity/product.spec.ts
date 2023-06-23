import Product from './product'

describe('Product Unit Test', () => {
  test('Should throw error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrow('Id is required')
  })

  test('Should throw error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('Name is required')
  })

  test('Should throw error when price is less than zero', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrow('Price must be greater than zero')
  })

  test('Should change name', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  test('Should change price', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changePrice(150)
    expect(product.price).toBe(150)
  })
})
