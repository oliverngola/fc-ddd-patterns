import type OrderItem from './order_item'

export default class Order {
  private readonly _id: string
  private readonly _customerId: string
  private readonly _items: OrderItem[]
  private readonly _total: number

  constructor (id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get customerId (): string {
    return this._customerId
  }

  get items (): OrderItem[] {
    return this._items
  }

  validate (): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._customerId.length === 0) {
      throw new Error('CostumerId is required')
    }
    if (this._items.length === 0) {
      throw new Error('Items are requrired')
    }
    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than zero')
    }
    return true
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0)
  }
}
