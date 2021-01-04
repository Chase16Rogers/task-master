import { generateId } from "../Utils/GenerateId.js"



export default class Task {
  constructor({ task, parent, Id, checked }) {
    this.task = task
    this.Id = Id || generateId()
    this.parent = parent
    this.checked = checked || 0
  }

  get Template() {
    return /*html*/ `
    <div class="d-flex">
    <button id="${this.Id}task" class="btn text-dark align-self-center" onclick="app.listsController.countCheck('${this.Id}')">${this.CheckBox}</button> 
     <p class="my-0 align-self-center mr-3">${this.task}</p>
    <i class="fa fa-trash text-danger cursor-pointer m-0 align-self-center" onclick="app.tasksController.deleteTask('${this.Id}')" aria-hidden="true"></i>
    </div>
    `
  }

  get CheckBox() {
    if (this.checked < 1) {
      return `<i class="fa fa-square-o" aria-hidden="true"></i>`
    } else {
      return '<i class="fa fa-check-square-o" aria-hidden="true"></i>'
    }
  }
}