import Address from "./address"
import Costumer from "./costumer"

describe('Costumer Unit Test', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      let costumer = new Costumer("", "John Doe")
    }).toThrow("Id is required")
  })

  it('Should throw error when name is empty', () => {
    expect(() => {
      let costumer = new Costumer("123", "")
    }).toThrow("Name is required")
  })

  it('Should change name', () => {
    const costumer = new Costumer("123", "John Doe")
    costumer.changeName("Jane")
    expect(costumer.name).toBe("Jane")
  })

  it('Should activate costumer', () => {
    const costumer = new Costumer("123", "John Doe")
    const address = new Address("Street 1", 123, "133300", "São Paulo")
    costumer.Address = address
    costumer.activate()
    expect(costumer.isActive()).toBe(true)
  })

  it('Should deactivate costumer', () => {
    const costumer = new Costumer("123", "John Doe")
    costumer.deactivate()
    expect(costumer.isActive()).toBe(false)
  })

  it('Should not activate costumer if address is undefined', () => {
    expect(() => {
      const costumer = new Costumer("123", "John Doe")
      costumer.activate()
    }).toThrowError("Adress is mandatory to activate a costumer")
  })
})
