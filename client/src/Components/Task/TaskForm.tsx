import React, { useState } from "react"
import { observer } from "mobx-react"
import {Save} from '@mui/icons-material'
import {DialogTitle, CardHeader, DialogContent, TextField} from "@mui/material";
import ActionButton from '../../UI/ActionButton'
import MyEditor from '../../UI/MyEditor'
import { store } from "../../store/index"
import {taskInit} from "../../store/initialStates"
import {TaskType} from '../../store/types'

type TaskFormProps = {
  col: number,
  handleClose: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({handleClose, col}) => {
  const [formValues, setFormValues] = useState<TaskType>({...taskInit, col})

  const handleSaveTask = () => {
    if(formValues.title) {
      store.addTask(formValues);
      setFormValues(taskInit);
      handleClose();
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, title: event.target.value })
  }

  return (
    <form noValidate autoComplete="off">
      <DialogTitle>
        <CardHeader
            className="card-top"
            title="Wednesday, July 1, 2020"
            action={
              <ActionButton 
                icon={<Save />} 
                fn={handleSaveTask}
                text="add" 
                variant="outlined" 
                size="small"
              />
            }
        />
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          onChange={changeHandler}
          value={formValues.title ? formValues.title : ''}
        />
        <MyEditor setFormValues={setFormValues} formValues={formValues}/>
      </DialogContent>
    </form>
  )
}

export default observer(TaskForm);
