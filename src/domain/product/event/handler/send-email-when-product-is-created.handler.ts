import type EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import type ProductCreatedEvent from '../product-created.event'

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle (event: ProductCreatedEvent): void {
    console.log('Sending email to ...')
  }
}
