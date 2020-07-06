import React, { useState } from "react"
import {DialogTitle, CardHeader, DialogContent, TextField} from "@material-ui/core";
import {Save} from '@material-ui/icons';
import ActionButton from '../../UI/ActionButton'
import MyEditor from '../../UI/MyEditor'
import store from "../../store"
import { observer } from "mobx-react"

const TaskForm = props => {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    col: props.col 
  })

  const handleSaveTask = () => {
    if(formValues.title) {
      store.addTask(formValues);
      setFormValues({ title: '', content: '' });
      props.handleClose();
    }
  };

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
          onChange={e => setFormValues({ ...formValues, title: e.target.value })}
          value={formValues.title}
        />
        <MyEditor setFormValues={setFormValues} formValues={formValues}/>
      </DialogContent>
    </form>
  )
}

export default observer(TaskForm);
