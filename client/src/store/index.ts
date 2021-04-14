import {observable} from "mobx"
// import axios from "axios"
import {TaskType} from "./types"
import apis from '../api'

class Store{

  @observable tasks: TaskType[] = []
  @observable loading: boolean = true
  @observable comments: any
  @observable loadingComments: boolean = true

  // TASKS
  async getTasks() {
    const tasks: TaskType[] = []
    await apis.getAllTasks()
      .then(response => {
        for(let key in response.data.data){
          tasks.push({...response.data.data[key], key: key})
        }
        this.tasks = tasks.reverse()
        this.loading = false
    })
  }

  async addTask(task: TaskType) {
    console.log(task);
    await apis.addTask(task)
    this.getTasks()
  }

  async updateTask(task: any){
    await apis.updateTask(task._id, task)
    this.getTasks()
  }

  async deleteTask(id: string){
    await apis.deleteTask(id)
    // this.deleteComments(id)
    this.getTasks()
  }

  // COMMENTS
  async getComments(ID: string, showLoading: boolean = true) {
    this.loadingComments = showLoading
    await apis.getAllComments(ID)
      .then(responce => {
        console.log('responce', responce);
        
        this.comments = responce.data.data
        this.loadingComments = false
      })
  }

  async postComment(taskId: string, comment: string){
    await apis.addComment({taskId, comment})
    this.getComments(taskId, false)
  }

  async deleteComment(taskId: string){
    await apis.deleteComment(taskId)
    this.getComments(taskId)
  }

}

export const store  = new Store()
