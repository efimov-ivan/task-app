import React, { useEffect } from "react"
import {store} from "./store/index"
import { observer } from "mobx-react"
import Tasks from "./Components/Task/Tasks"

const App: React.FC = () => {
  const { tasks } = store
  const colsCount: number[] = [0, 1, 2]

  useEffect(() => {
    store.getTasks()
  }, [])

  return (
    <div className="App container">
      {colsCount.map(i => 
        <div className="column" key={i}>
          { tasks.length
            ? <Tasks tasks={tasks.filter(task => task.col === i)} col={i} />
            : null 
          }
        </div>
      )} 
    </div>
  );
}

export default observer(App);
