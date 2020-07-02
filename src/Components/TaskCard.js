import React, {useState, useEffect, Fragment } from "react";
import { observer } from "mobx-react";
import ActionButton from './ActionButton'
// import CardActions from "@material-ui/core/CardActions";
import Select from '@material-ui/core/Select';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {Delete, Save} from '@material-ui/icons';
// import {CheckCircle, Close, MoreVert} from '@material-ui/icons';
// import lightGreen from '@material-ui/core/colors/lightGreen';
import MyEditor from '../UI/MyEditor'
import Comment from './Comment/Comment'
import store from "../store";

import MenuItem from '@material-ui/core/MenuItem';

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
  }

  const deleteTask = () => {
    store.deleteTask(props.task.key);
    props.handleClose();
  };

  const updateTask = (values) => {
    store.updateTask({...props.task, ...values});
    //props.handleClose();
  };

  useEffect(() => {
    store.getComments(props.task.key);
  }, [props.task.key]);

  const getMoveItems = (col) => {
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
                {getMoveItems(props.task.col)}
                {/* <MenuItem value="empty" disabled={true}>Move to</MenuItem>
                <MenuItem value={0} {...props.task.col === 0 ? null : null}>Completed</MenuItem>
                <MenuItem value={1}>Tasks</MenuItem>
                <MenuItem value={2}>Question</MenuItem> */}
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