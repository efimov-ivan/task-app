import { decorate, observable, action } from "mobx";
// import findKey from "lodash-es/findKey";
import axios from "axios";

class Store {

  tasks = []
  loading = true
  comments = []
  loadingComments = true

  // TASKS
  getTasks() {
    const tasks = []
    axios.get("https://my-tasks-797df.firebaseio.com/tasks.json")
      .then(response => {
        for(let key in response.data){
          tasks.push({...response.data[key], key: key})
        }
        this.tasks = tasks.reverse()
        this.loading = false
    })
  }

  async addTask(task) {
    await axios.post("https://my-tasks-797df.firebaseio.com/tasks.json", {
      order: 0,
      title: task.title,
      content: task.content,
      col: task.col
    });
    this.getTasks()
  }

  async updateTask(task){
    await axios.put(`https://my-tasks-797df.firebaseio.com/tasks/${task.key}.json`, {...task});
    this.getTasks()
  }

  async deleteTask(id){
    await axios.delete(`https://my-tasks-797df.firebaseio.com/tasks/${id}.json`);
    this.deleteComments(id)
    this.getTasks()
  }

  // COMMENTS
  async getComments(ID, showLoading = true) {
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

  async postComment(taskId, comment){
    await axios.post(`https://my-tasks-797df.firebaseio.com/comments/${taskId}.json`, {comment});
    this.getComments(taskId, false)
  }

  async deleteComments(taskId, id = ''){
    await axios.delete(`https://my-tasks-797df.firebaseio.com/comments/${taskId}/${id}.json`);
    this.getComments(taskId, false)
  }

}

Store = decorate(Store, {
  tasks: observable,
  loading: observable,
  comments: observable,
  loadingComments: observable,
  addTask: action,
  getTasks: action,
  getComments: action
});

export default new Store();
