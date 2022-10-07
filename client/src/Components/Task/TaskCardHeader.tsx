import React, {useState} from 'react'
import {store} from "../../store/index"
import {observer} from "mobx-react"
import ActionButton from '../../UI/ActionButton'
import {Select, SelectChangeEvent, CardHeader, MenuItem } from '@mui/material'
import {Delete, Save} from '@mui/icons-material'
import {TaskType} from "../../store/types"

type TaskCardHeaderType = {
  task: TaskType,
  closeDialog: () => void,
}

const TaskCardHeader: React.FC<TaskCardHeaderType> = ({task, closeDialog}) => {

  const [disableButton, setDisableButton] = useState({move:false,update:false,delete:false})

  const selectHandler = (event: SelectChangeEvent<number>, child: React.ReactNode) =>  {
    updateTask({col: event.target.value})
    closeDialog()
  }

  const deleteTask = () => {
    store.deleteTask(task._id);
    closeDialog();
  };

  const updateTask = (values: {}) => {
    store.updateTask({...task, ...values});
    setDisableButton({move:false,update:false,delete:false})
    closeDialog()
  };

  const SelectMoveItems = () => {
    const items: {value: number, name: string}[] = [
      {
        value: 3,
        name: 'Moveto'
      },
      {
        value: 1,
        name: 'Tasks'
      },
      {
        value: 2,
        name: 'Question'
      },
      {
        value: 0,
        name: 'Completed'
      }
    ]
    return items.map(({value, name}) => {
      return <MenuItem 
              value={value}
              key={value}
              disabled={value === 3 || value === task.col}
            >
              {name}
            </MenuItem>
    })
  }

  return (
    <CardHeader
    className="card-top"
    title="Wednesday, July 1, 2020"
    action={
      <div>
        <Select 
          value={task.col} 
          variant="outlined" 
          onChange={selectHandler} 
          className="action-button" disabled={disableButton.move}>
          {SelectMoveItems()}
        </Select>
        <ActionButton 
          icon={<Save />} 
          fn={updateTask.bind(true, task)}
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