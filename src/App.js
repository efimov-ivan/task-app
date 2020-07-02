import React, { useEffect } from "react";
import store from "./store";
import { observer } from "mobx-react";
import Tasks from "./Components/Tasks";

function App() {
  const { tasks } = store
  const colsCount = [0, 1, 2]

  useEffect(() => {
    store.getTasks()
  }, [])

  return (
    <div className="App container">
      {colsCount.map(i => 
        <div className="column" key={i}>
          <Tasks tasks={tasks.filter(task => task.col === i)} col={i} />
        </div>
      )} 
    </div>
  );
}

export default observer(App);
