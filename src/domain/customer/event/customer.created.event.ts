import EventInterface from '../../@shared/event/event.interface'

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date
  data: any

  constructor (eventData: any) {
    this.dataTimeOccurred = new Date()
    this.data = eventData
  }
}
