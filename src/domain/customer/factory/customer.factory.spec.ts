import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('Customer Factory Unit Tests', () => {
  it('Should create a customer', () => {
    const customer = CustomerFactory.create('John')
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBeUndefined()
  })

  it('Should create a customer with address', () => {
    const address = new Address('Street', 1, 'Zip 1', 'City')
    const customer = CustomerFactory.createWithAddress('John', address)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBe(address)
  })
})
