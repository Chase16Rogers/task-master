import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";
import Task from "../Models/Task.js";



export function saveState() {
  let listsArr = ProxyState.lists
  let tasksArr = ProxyState.tasks
  localStorage.setItem("taskData", JSON.stringify({ lists: listsArr, tasks: tasksArr }))
}

export function loadState() {
  let data = JSON.parse(localStorage.getItem("taskData"))
  if (data) {
    ProxyState.lists = data.lists.map(l => new List(l))
    ProxyState.tasks = data.tasks.map(t => new Task(t))

  }
}