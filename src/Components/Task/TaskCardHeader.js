import React, {useState} from 'react'
import ActionButton from '../../UI/ActionButton'
import {Select, CardHeader, MenuItem } from '@material-ui/core'
import {Delete, Save} from '@material-ui/icons'
import { observer } from "mobx-react"
import store from "../../store"

const TaskCardHeader = ({formValues, task, closeDialog}) => {

  const [disableButton, setDisableButton] = useState({move:false,update:false,delete:false})

  const [moveTo, setMoveTo] = useState(task.col)

  const moveTask = e => {
    setMoveTo(e.target.value)
    updateTask({col: e.target.value})
    closeDialog()
  }

  const deleteTask = () => {
    store.deleteTask(task.key);
    closeDialog();
  };

  const updateTask = (values) => {
    store.updateTask({...task, ...values});
    setDisableButton({move:false,update:false,delete:false})
  };

  const SelectMoveItems = () => {
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
        disabled={items[val] === 3 || items[val] === task.col }
      >
        {val}
      </MenuItem>
    ))
  }

  return (
    <CardHeader
    className="card-top"
    title="Wednesday, July 1, 2020"
    action={
      <div>
        <Select value={moveTo} variant="outlined" onChange={moveTask} className="action-button" disabled={disableButton.move}>
          {SelectMoveItems()}
        </Select>
        <ActionButton 
          icon={<Save />} 
          fn={updateTask.bind(true, formValues)}
          text="update"
          className="action-button"
          disabled={disableButton.update}
          clearDisableButton={() => setDisableButton({update: false, move:false, delete:false})}
          disableButtons={() => setDisableButton({...disableButton, move:true, delete:true})}
        />
        <ActionButton 
          icon={<Delete />} 
          fn={deleteTask} 
          text="delete"
          className="action-button"
          disabled={disableButton.delete}
          clearDisableButton={() => setDisableButton({update: false, move:false, delete:false})}
          disableButtons={() => setDisableButton({...disableButton, move:true, update:true})}
        />
      </div>
    }
/>
  )
}

export default observer(TaskCardHeader)