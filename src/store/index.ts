
// import React from "react"
import { decorate, observable, action } from "mobx";
import axios from "axios";

type Task = {
  title: string,
  content: string,
  col: number,
  key: string,
  order: number
}

class Store{

  @observable tasks: Task[] = []
  @observable loading: boolean = true
  @observable comments: any
  @observable loadingComments: boolean = true

  // TASKS
  getTasks() {
    const tasks: Task[] = []
    axios.get("https://my-tasks-797df.firebaseio.com/tasks.json")
      .then(response => {
        for(let key in response.data){
          tasks.push({...response.data[key], key: key})
        }
        this.tasks = tasks.reverse()
        this.loading = false
    })
  }

  async addTask(task: any) {
    await axios.post("https://my-tasks-797df.firebaseio.com/tasks.json", {
      order: task.order,
      title: task.title,
      content: task.content,
      col: task.col,
      key: ''
    });
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
    // const comments = []
    await axios.get(`https://my-tasks-797df.firebaseio.com/comments/${ID}.json`)
      .then(response => {
        // for(let key in response.data){
        //   comments.push({...response.data[key]})
        // }
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
