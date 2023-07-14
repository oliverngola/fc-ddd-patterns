import Address from '../value-object/address'
import Customer from './customer'

describe('Customer Unit Test', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('Id is required')
  })

  it('Should throw error when name is empty', () => {
    expect(() => new Customer('123', '')).toThrow('Name is required')
  })

  it('Should change name', () => {
    const customer = new Customer('123', 'John Doe')
    customer.changeName('Jane')
    expect(customer.name).toBe('Jane')
  })

  it('Should activate customer', () => {
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street 1', 123, '133300', 'São Paulo')
    customer.address = address
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('Should deactivate customer', () => {
    const customer = new Customer('123', 'John Doe')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('Should not activate customer if address is undefined', () => {
    expect(() => {
      const customer = new Customer('123', 'John Doe')
      customer.activate()
    }).toThrowError('Adress is mandatory to activate a customer')
  })

  it('Should add reward points', () => {
    const customer = new Customer('c1', 'Customer')
    expect(customer.rewardsPoints).toBe(0)
    customer.addRewardPoints(10)
    expect(customer.rewardsPoints).toBe(10)
    customer.addRewardPoints(20)
    expect(customer.rewardsPoints).toBe(30)
  })
})
