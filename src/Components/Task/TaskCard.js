import React, {useState, useEffect, Fragment } from "react";
import Comment from '../Comment/Comment'
import MyEditor from '../../UI/MyEditor'
import ActionButton from '../../UI/ActionButton'
import Select from '@material-ui/core/Select';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {Delete, Save} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from "mobx-react";
import store from "../../store";

const TaskCard = props => {

  // const { loadingComments } = store;

  const [formValues, setFormValues] = useState({
    title: props.task.title,
    content: props.task.content,
    comment: ""
  });

  const [moveTo, setMoveTo] = useState(props.task.col)

  const moveTask = e => {
    setMoveTo(e.target.value)
    updateTask({col: e.target.value})
    props.handleClose()
  }

  const deleteTask = () => {
    store.deleteTask(props.task.key);
    props.handleClose();
  };

  const updateTask = (values) => {
    store.updateTask({...props.task, ...values});
  };

  useEffect(() => {
    store.getComments(props.task.key);
  }, [props.task.key]);

  const SelectMoveItems = (col) => {
    const items = {
      'Move to': 3, 
      'Tasks': 1,
      'Question': 2,
      'Completed': 0,
    }
    return Object.keys(items).map((val, i) => (
      <MenuItem 
        value={items[val]} 
        key={i}
        disabled={items[val] === 3 || items[val] === col }
      >
        {val}
      </MenuItem>
    ))
  }

  return (
    <Fragment>
      <DialogTitle>
        <CardHeader
          className="card-top"
          title="Wednesday, July 1, 2020"
          action={
            <Fragment>
              <Select value={moveTo} variant="outlined" onChange={moveTask}>
                {SelectMoveItems(props.task.col)}
              </Select>
              <ActionButton 
                icon={<Save />} 
                fn={updateTask.bind(true, formValues)}
                text="update"
                variant="outlined"
                size="small"
              />
              <ActionButton 
                icon={<Delete />} 
                fn={deleteTask} 
                text="delete" 
                variant="outlined" 
                size="small"
              />
            </Fragment>
          }
      />
      </DialogTitle>
      <DialogContent dividers={true}>
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
          <Comment taskKey={props.task.key}/>
        </CardContent>
      </DialogContent>
    </Fragment>
  );
};

export default observer(TaskCard);