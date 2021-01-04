import { ProxyState } from "../AppState.js"
import Task from "../Models/Task.js"
import { saveState } from "../Utils/LocalStorage.js"

function _drawLists() {
  let template = ""
  ProxyState.lists.forEach(l => template += l.Template)
  document.getElementById("listsHere").innerHTML = template
}

export default class TasksController {
  constructor() {
    ProxyState.on("tasks", saveState)
    ProxyState.on("tasks", _drawLists)
  }

  addTask(id) {
    window.event.preventDefault()
    let form = window.event.target
    let newTask = new Task({ task: form['tasky'].value, parent: id, })
    ProxyState.tasks = [...ProxyState.tasks, newTask]
    console.log(ProxyState.tasks)
    let parent = ProxyState.lists.findIndex(l => l.Id == id)
    ProxyState.lists[parent].taskCount++
    _drawLists()
  }

  deleteTask(id) {
    if (window.confirm("Confirm Delete? This cannot be undone!")) {
      ProxyState.tasks = ProxyState.tasks.filter(t => id != t.Id)
      _drawLists()
    }
  }


}
