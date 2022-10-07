import React, {useState, useEffect, Fragment } from "react"
import {store} from "../../store/index"
import {observer} from "mobx-react"
import TaskCardHeader from './TaskCardHeader'
import Comment from '../Comment/Comment'
import MyEditor from '../../UI/MyEditor'
import {CardContent, DialogTitle, DialogContent, TextField, CircularProgress} from '@mui/material'
import {TaskType} from "../../store/types"

type TaskCardType = {
  handleClose: () => void,
  task: TaskType
}

const TaskCard: React.FC<TaskCardType> = ({handleClose, task}) => {  
  const { loadingComments } = store;
  const [formValues, setFormValues] = useState<TaskType>({...task});

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, title: event.target.value })
  }

  useEffect(() => {
   store.getComments(task._id);
  }, []);

  return (
    <Fragment>
      <DialogTitle>
        <TaskCardHeader 
          closeDialog={handleClose}
          task={formValues}
        />
      </DialogTitle>
      { loadingComments 
        ? <div className="loading"><CircularProgress/></div>
        : <DialogContent dividers={true}>
            <CardContent className="task-content">
              <TextField
                name="title"
                className="title"
                value={formValues.title}
                variant="outlined"
                fullWidth
                onChange={changeHandler}
              />
              <MyEditor setFormValues={setFormValues} formValues={formValues}/>
              <Comment taskID={task._id}/>
            </CardContent>
          </DialogContent>
      }
    </Fragment>
  )
}

export default observer(TaskCard)