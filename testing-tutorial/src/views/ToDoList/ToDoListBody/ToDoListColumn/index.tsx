import React from 'react'
import { TaskTile } from './TaskTile'
import { Task } from "../../../../shared/types/Task";

interface Props  {
  tasksList: Task[],
  columnName: string,
  moveTaskToToDosList: (task: Task) => void,
  moveTaskToFinishedList: (task: Task) => void,

  deleteTask: (task: Task) => void,

}
export function ToDoListColumn ({ columnName, tasksList, moveTaskToToDosList, moveTaskToFinishedList, deleteTask }: Props) {
  const checkIfArrayIsEmpty = (list: Task[]) => {
    if (list && list.length) {
      return true
    }
  }
  return (<section className="column">
    <h2>{columnName}</h2>
    {
      checkIfArrayIsEmpty(tasksList) && tasksList.map(task => (
        <TaskTile
          key={task.id}
          task={task}
          moveTaskLeft={() => moveTaskToToDosList(task)}
          moveTaskRight={() => moveTaskToFinishedList(task)}
          deleteTask = {() => deleteTask(task)}
        />
      ))
    }
  </section>)
}
