import Order from "./order"
import OrderItem from "./order_item"

describe('Order Unit Test', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      let order = new Order("", "123", [])
    }).toThrowError("Id is required")
  })

  it('Should throw error when costumerId is empty', () => {
    expect(() => {
      let order = new Order("12", "", [])
    }).toThrowError("CostumerId is required")
  })

  it('Should throw error when quantity is empty', () => {
    expect(() => {
      let order = new Order("123", "123", [])
    }).toThrowError("Items are requrired")
  })

  it('Should calculate total', () => {
    const item1 = new OrderItem("i1", "Item 1", 234, 4)
    const item2 = new OrderItem("i2", "Item 2", 234, 4)
    const order = new Order("123", "123", [item1, item2])
    const total = order.total()
    expect(total).toBe(468)
  })
})
