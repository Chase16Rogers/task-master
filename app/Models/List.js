import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"



export default class List {
  constructor({ name, color, id }) {
    this.name = name
    this.color = color
    this.taskCount = 0
    this.completed = 0
    this.Id = id || generateId()
    console.log(this.Id)
  }


  get Template() {
    return /*html*/`
    
    <div class="col-3">

      <div class="card">
          <div class="card-header text-light text-center" style="background-color:${this.color}">
              <h4 class="mb-0 text-shadow text-right"><i class="fa fa-window-close cursor-pointer" id="removeList" data-toggle="modal" data-target="#delete-${this.Id}" aria-hidden="true"></i></h4>
              <h3 class="mb-0 text-shadow">${this.name}</h3>
              <h5 class="text-shadow">${this.completed}/${this.taskCount}</h5>
          </div>
          <div class="card-body d-flex flex-column align-items-center">

          <div id="tasksHere">
          ${this.Tasks}
          </div>

          <div class="d-flex">
            <form onsubmit="app.tasksController.addTask('${this.Id}')">
              <input id="tasky" name="tasky" class="borders" type="text" placeholder="Add Task..." minlength="3" maxlength="50" required>
              <button class="btn input-color" type="submit"><i class="fa fa-plus-square-o plus cursor-pointer" aria-hidden="true"></i></button>
            </form>
          </div>

          </div>
      </div>
    </div>


    <div class="modal fade" id="delete-${this.Id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <h2>Confirm Delete?</h2>
              <i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i>
              <h4>THIS CONNOT BE UNDONE!</h4>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger"
                            data-dismiss="modal">Cancel</button>
                        <button onclick="app.listsController.deleteList('${this.Id}')" data-dismiss="modal" class="btn btn-success">Delete</button>
                    </div>
            </div>
        </div>
    </div>
</div>



`
  }

  get Tasks() {
    let template = ""
    let tasks = ProxyState.tasks.filter(ta => ta.parent == this.Id)
    tasks.forEach(t => template += t.Template)
    return template
  }


}