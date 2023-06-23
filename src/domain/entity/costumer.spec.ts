import Address from './address'
import Costumer from './costumer'

describe('Costumer Unit Test', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Costumer('', 'John Doe')).toThrow('Id is required')
  })

  it('Should throw error when name is empty', () => {
    expect(() => new Costumer('123', '')).toThrow('Name is required')
  })

  it('Should change name', () => {
    const costumer = new Costumer('123', 'John Doe')
    costumer.changeName('Jane')
    expect(costumer.name).toBe('Jane')
  })

  it('Should activate costumer', () => {
    const costumer = new Costumer('123', 'John Doe')
    const address = new Address('Street 1', 123, '133300', 'São Paulo')
    costumer.address = address
    costumer.activate()
    expect(costumer.isActive()).toBe(true)
  })

  it('Should deactivate costumer', () => {
    const costumer = new Costumer('123', 'John Doe')
    costumer.deactivate()
    expect(costumer.isActive()).toBe(false)
  })

  it('Should not activate costumer if address is undefined', () => {
    expect(() => {
      const costumer = new Costumer('123', 'John Doe')
      costumer.activate()
    }).toThrowError('Adress is mandatory to activate a costumer')
  })

  it('Should add reward points', () => {
    const costumer = new Costumer('c1', 'Costumer')
    expect(costumer.rewardsPoints).toBe(0)
    costumer.addRewardPoints(10)
    expect(costumer.rewardsPoints).toBe(10)
    costumer.addRewardPoints(20)
    expect(costumer.rewardsPoints).toBe(30)
  })
})
