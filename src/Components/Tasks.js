import React, { useState, Fragment } from "react";
import { observer } from "mobx-react";
// import store from "../store";
import TaskForm from "./TaskForm";

import Add from "@material-ui/icons/Add";
import MyModal from "../UI/MyModal";
import TaskCard from "./TaskCard";

const Tasks = ({ tasks, col }) => {

  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const showTask = (task) => {
    setCurrentTask(task)
    setAction('showTask')
    setOpenModal(true);
  }

  const addTask = e => {
    setAction(e);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const returnHeadings = (col) => {
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

      <MyModal open={openModal} handleClose={closeModal}>
        {action === "AddTask" ? (
          <TaskForm handleClose={closeModal} col={1}></TaskForm>
        ) : action === "AddQuestion" ? (
          <TaskForm handleClose={closeModal} col={2}></TaskForm>
        ) : (
          <TaskCard handleClose={closeModal} task={currentTask}></TaskCard>
        )}
      </MyModal>

    </div>
  );
};

export default observer(Tasks);
