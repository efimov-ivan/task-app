import React, { useState, Fragment } from "react"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"
import MyDialog from "../../UI/MyDialog"
import Add from "@material-ui/icons/Add"

type TasksProps = {
  tasks: {
    title: string
    content: string
    order: number
    col: number
    key: string
  }[],
  col: number
}

const Tasks: React.FC<TasksProps> = ({tasks, col}) => {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');
  const [currentTask, setCurrentTask] = useState<{}>({});

  const showTask = (task: {}) => {
    setCurrentTask(task)
    setAction('showTask')
    setOpenModal(true);
  }

  const addTask = (e: any) => {
    setAction(e);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const returnHeadings = (col: number) => {
    switch(col){
      case 0:
        return <h3>Completed</h3>
      case 1:
        return (
          <Fragment>
            <h3>Tasks</h3>
            <Add
              className="add"
              fontSize="small"
              onClick={() => addTask("AddTask")}
            />
          </Fragment>
          )
      case 2:
        return (
          <Fragment>
            <h3>Question</h3>
            <Add
              className="add"
              fontSize="small"
              onClick={() => addTask("AddQuestion")}
            />
          </Fragment>
          )
      default: return null
    }
  }

  return (
    <div className="tasks-box">
      <div className="tasks-heading">
        {returnHeadings(col)}
      </div>

      <div className="tasks-list content">
        {tasks.map((task, key) =>
          <div key={key} onClick={() => showTask(task)}>
            {task.title.length > 60 ? task.title.slice(0,60) + '...' : task.title }
          </div>
        )}
      </div>

      <MyDialog open={openModal} handleClose={closeModal}>
        {action === "AddTask" ? (
          <TaskForm handleClose={closeModal} col={1}></TaskForm>
        ) : action === "AddQuestion" ? (
          <TaskForm handleClose={closeModal} col={2}></TaskForm>
        ) : (
          <TaskCard handleClose={closeModal} task={currentTask}></TaskCard>
        )}
      </MyDialog>

    </div>
  )
}

export default Tasks
