import React, { useState, forwardRef } from "react";
import store from "../store";
import { observer } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MyEditor from '../UI/MyEditor'

const TaskForm = forwardRef((props, ref) => {
  const [formValues, setFormValues] = useState({ title: '', content: '', col: props.col });

  const handleSaveTask = () => {
    store.addTask(formValues);
    setFormValues({ title: '', content: '' });
    props.handleClose();
  };

  return (
    <form noValidate autoComplete="off">
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
      <Button variant="contained" color="primary" onClick={handleSaveTask}>
        Add
      </Button>
    </form>
  );
});

export default observer(TaskForm);
