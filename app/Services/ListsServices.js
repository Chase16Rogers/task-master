import { ProxyState } from "../AppState.js"


class ListService {

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


  }

}

export const listService = new ListService()