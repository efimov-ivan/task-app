import React, {useState} from 'react'
import ActionButton from '../../UI/ActionButton'
import {Select, CardHeader, MenuItem } from '@material-ui/core'
import {Delete, Save} from '@material-ui/icons'
import { observer } from "mobx-react"
import {store} from "../../store/index"

type TaskCardHeaderType = {
  formValues: any,
  task: any,
  closeDialog: any
}

const TaskCardHeader: React.FC<TaskCardHeaderType> = ({formValues, task, closeDialog}) => {

  const [disableButton, setDisableButton] = useState({move:false,update:false,delete:false})
  const [moveTo, setMoveTo] = useState(task.col)

  const moveTask = (e: React.ChangeEvent<{name?: string | undefined;value: unknown;}>, child: React.ReactNode) => {
    setMoveTo(e.target.value)
    updateTask({col: e.target.value})
    closeDialog()
  }

  const deleteTask = () => {
    store.deleteTask(task.key);
    closeDialog();
  };

  const updateTask = (values: {}) => {
    store.updateTask({...task, ...values});
    setDisableButton({move:false,update:false,delete:false})
  };

  const SelectMoveItems = (): any => {
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