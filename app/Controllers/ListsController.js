import { ProxyState } from "../AppState.js"
import List from "../Models/List.js"
import { saveState } from "../Utils/LocalStorage.js"

function _drawLists() {
  let template = ""
  ProxyState.lists.forEach(l => template += l.Template)
  document.getElementById("listsHere").innerHTML = template
}


export default class ListsController {

  constructor() {
    ProxyState.on("lists", saveState)
    ProxyState.on("lists", _drawLists)
    _drawLists()
  }

  createLists() {
    window.event.preventDefault()
    let form = window.event.target
    let newList = {
      name: form['listName'].value,
      color: form['listColor'].value,
    }
    console.log(ProxyState.lists)
    let list = new List(newList)
    ProxyState.lists = [...ProxyState.lists, list]
    _drawLists()
    form.reset()
  }

  countCheck(id) {
    let task = ProxyState.tasks.findIndex(t => t.Id == id)
    let list = ProxyState.lists.findIndex(l => l.Id == ProxyState.tasks[task].parent)

    if (ProxyState.tasks[task].checked == 0) {
      ProxyState.tasks[task].checked++
      ProxyState.lists[list].completed++
    } else {
      ProxyState.tasks[task].checked--
      ProxyState.lists[list].completed--
    }


    _drawLists()
  }

  deleteList(id) {
    let deleteList = ProxyState.lists.filter(l => l.Id != id)
    console.log(deleteList)
    ProxyState.lists = deleteList
  }

}