import Task from "./Models/Task.js"
import List from "./Models/List.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {List[]} */
  lists = [new List({ name: "Code Things", color: "blue", id: 5 })]

  /** @type {Task[]} */
  tasks = [new Task({ task: "Type this", parent: 5, id: 6 })]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
