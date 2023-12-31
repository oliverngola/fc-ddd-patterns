export default class OrderItem {
  private readonly _id: string
  private readonly _productId: string
  private readonly _name: string
  private readonly _price: number
  private readonly _quantity: number
  private readonly _total: number

  constructor (id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
    this._total = this.total()
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get quantity (): number {
    return this._quantity
  }

  get price (): number {
    return this._price
  }

  get productId (): string {
    return this._productId
  }

  total (): number {
    return this._price * this._quantity
  }
}
