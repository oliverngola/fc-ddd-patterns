import Address from "./address"

export default class Costumer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    this._name = name
    this._id = id
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get rewardsPoints(): number {
    return this._rewardPoints
  }

  validate() {
    if(this._id.length === 0) {
      throw new Error("Id is required")
    }
    if(this._name.length === 0) {
      throw new Error("Name is required")
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if(this._address === undefined) {
      throw new Error("Adress is mandatory to activate a costumer")
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  set Address(address: Address) {
    this._address = address
  }
}