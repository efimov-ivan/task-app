import React, { useEffect } from "react"
import {store} from "./store/index"
import {observer} from "mobx-react"
import Tasks from "./Components/Task/Tasks"
import {CircularProgress} from '@material-ui/core'

const App: React.FC = () => {
  const { tasks, loading } = store
  const colsCount: number[] = [0, 1, 2]

  useEffect(() => {
    store.getTasks()
  }, [])

  return (
    <div className="App container">
      { loading
        ? <div className="loading"><CircularProgress/></div> 
        : colsCount.map( i =>
            <div className="column" key={i}>
              <Tasks tasks={tasks.filter(task => task.col === i)} col={i} />
            </div>
          )
      }
    </div>
  )
}

export default observer(App)
