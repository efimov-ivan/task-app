import {observable, makeObservable} from "mobx";
import {TaskType, taskID, commentID} from "./types"
import apis from '../api'

class Store{
  tasks: TaskType[] = [];
  loading: boolean = true;
  comments: any;
  loadingComments: boolean = true;

  constructor(){
    makeObservable(this, {
        tasks: observable,
        loading: observable,
        comments: observable,
        loadingComments: observable,
    });
  }

  // TASKS
  async getTasks() {
    let tasks: TaskType[] = [];
    try {
      await apis.getAllTasks()
      .then(response => {
        for(let key in response.data.data){
          tasks.push({...response.data.data[key], key: key})
        }       
        this.loading = false
        this.tasks = tasks.reverse()
      }) 
    } catch (error) {
      this.loading = false;
      //this.tasks = [];
    }
  }

  async addTask(task: TaskType) {
    await apis.addTask(task)
    this.getTasks()
  }

  async updateTask(task: TaskType){
    await apis.updateTask(task._id, task)
    this.getTasks()
  }

  async deleteTask(id: taskID){
    await apis.deleteTask(id)
    this.deleteTaskComments(id)
    this.getTasks()
  }

  // COMMENTS
  async getComments(ID: taskID, showLoading: boolean = true) {
    this.loadingComments = showLoading
    await apis.getAllComments(ID)
      .then(responce => {
        this.comments = responce.data.data
        this.loadingComments = false
      })
  }

  async postComment(taskId: taskID, comment: string){
    await apis.addComment({taskId, comment})
    this.getComments(taskId, false)
  }

  async deleteComment(taskId: taskID, commentId: commentID){
    await apis.deleteComment(commentId)
    this.getComments(taskId, false)
  }

  async deleteTaskComments(taskId: taskID){
    await apis.deleteTaskComments(taskId)
  }
}

export const store = new Store();
