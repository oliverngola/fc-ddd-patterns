import EventDispatcher from '../../@shared/event/event-dispatcher'
import CustomerCreatedEvent from './customer.created.event'
import EnviaConsoleLog1Handler from './handler/first-customer-is-created.handler'
import EnviaConsoleLog2Handler from './handler/second-customer-is-created.handler'

describe('', () => {
  it('Shoud notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()
    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1)
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2)
    const customerCreateEvent = new CustomerCreatedEvent({
      name: 'Customer 1',
      description: 'Customer 1 description',
      price: 10.0
    })
    eventDispatcher.notify(customerCreateEvent)
    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })
})
