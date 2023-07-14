import type EventInterface from './event.interface'
import type EventHandlerInterface from './event-handler.interface'

export default class EventDispatcher implements EventDispatcher {
  private eventHandlers: Record<string, EventHandlerInterface[]> = {}

  get getEventHandlers (): Record<string, EventHandlerInterface[]> {
    return this.eventHandlers
  }

  notify (event: EventInterface): void {
  }

  register (eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister (eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler)
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll (): void {
    this.eventHandlers = {}
  }
}
