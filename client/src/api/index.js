import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
})

const getAllTasks = () => api.get('/tasks')
const addTask = payload => api.post('/task', payload)
const updateTask = (id, payload) => api.put(`/task/${id}`, payload)
const deleteTask = id => api.delete(`/task/${id}`)

const getAllComments = id => api.get(`/comments/${id}`)
const addComment = payload => api.post('/comment', payload)
const deleteComment = id => api.delete(`/comment/${id}`)
const deleteTaskComments = id => api.delete(`/comments/${id}`)

const apis = {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    getAllComments,
    addComment,
    deleteComment,
    deleteTaskComments
}

export default apis;