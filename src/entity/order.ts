import OrderItem from "./order_item"

export default class Order {
  private _id: string
  private _costumerId: string
  private _items: OrderItem[]
  private _total: number 

  constructor(id: string, costumerId: string, items: OrderItem[]){
    this._id = id
    this._costumerId = costumerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  validate():boolean {
    if(this._id.length === 0) {
      throw new Error("Id is required")
    }
    if(this._costumerId.length === 0) {
      throw new Error("CostumerId is required")
    }
    if(this._items.length === 0) {
      throw new Error("Items are requrired")
    }
    return true
  }

  total():number {
    return this._items.reduce((acc, item) => acc+item.price, 0)
  }
}