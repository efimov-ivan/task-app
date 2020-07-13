import React, {useState, useEffect, Fragment } from "react"
import TaskCardHeader from './TaskCardHeader'
import Comment from '../Comment/Comment'
import MyEditor from '../../UI/MyEditor'
import {CardContent, DialogTitle, DialogContent, TextField, CircularProgress} from '@material-ui/core'
import {store} from "../../store/index"
import { observer } from "mobx-react"

type TaskCardType = {
  handleClose: () => void,
  task: any
}

const TaskCard: React.FC<TaskCardType> = ({handleClose, task}) => {

  const { loadingComments } = store;

  const [formValues, setFormValues] = useState({
    title: task.title,
    content: task.content,
    comment: ""
  });

  useEffect(() => {
    store.getComments(task.key);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <DialogTitle>
        <TaskCardHeader 
          task={task}
          closeDialog={handleClose}
          formValues={formValues}
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
                onChange={e => setFormValues({ ...formValues, title: e.target.value })}
              />
              <MyEditor setFormValues={setFormValues} formValues={formValues}/>
              <Comment taskKey={task.key}/>
            </CardContent>
          </DialogContent>
      }
    </Fragment>
  )
}

export default observer(TaskCard)