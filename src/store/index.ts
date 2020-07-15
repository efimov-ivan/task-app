import {observable} from "mobx"
import axios from "axios"
import {TaskType} from "./types"

class Store{

  @observable tasks: TaskType[] = []
  @observable loading: boolean = true
  @observable comments: any
  @observable loadingComments: boolean = true

  // TASKS
  getTasks() {
    const tasks: TaskType[] = []
    axios.get("https://my-tasks-797df.firebaseio.com/tasks.json")
      .then(response => {
        for(let key in response.data){
          tasks.push({...response.data[key], key: key})
        }
        this.tasks = tasks.reverse()
        this.loading = false
    })
  }

  async addTask(task: TaskType) {
    await axios.post("https://my-tasks-797df.firebaseio.com/tasks.json", {...task});
    this.getTasks()
  }

  async updateTask(task: any){
    await axios.put(`https://my-tasks-797df.firebaseio.com/tasks/${task.key}.json`, {...task});
    this.getTasks()
  }

  async deleteTask(id: string){
    await axios.delete(`https://my-tasks-797df.firebaseio.com/tasks/${id}.json`);
    this.deleteComments(id)
    this.getTasks()
  }

  // COMMENTS
  async getComments(ID: string, showLoading: boolean = true) {
    this.loadingComments = showLoading
    await axios.get(`https://my-tasks-797df.firebaseio.com/comments/${ID}.json`)
      .then(response => {
        this.comments = response.data
        this.loadingComments = false
    })
  }

  async postComment(taskId: string, comment: {}){
    await axios.post(`https://my-tasks-797df.firebaseio.com/comments/${taskId}.json`, {comment});
    this.getComments(taskId, false)
  }

  async deleteComments(taskId: string, id: string = ''){
    await axios.delete(`https://my-tasks-797df.firebaseio.com/comments/${taskId}/${id}.json`);
    this.getComments(taskId, false)
  }

}

// Store = decorate(Store, {
//   tasks: observable,
//   loading: observable,
//   comments: observable,
//   loadingComments: observable,
//   addTask: action,
//   getTasks: action,
//   getComments: action
// });

export const store  = new Store()
