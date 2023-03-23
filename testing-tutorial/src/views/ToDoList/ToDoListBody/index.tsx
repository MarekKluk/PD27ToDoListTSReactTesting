import React from 'react'
import { ToDoListColumn } from './ToDoListColumn'
import '../styles.css'
import {Task} from "../../../shared/types/Task";

interface Props  {
  todoList: Task[],
  finishedList: Task[],
  moveTaskToToDosList: (task: Task) => void,
  moveTaskToFinishedList: (task: Task) => void,

  deleteTask: (task: Task) => void,

}
export function ToDoListBody ({ todoList, finishedList, moveTaskToToDosList, moveTaskToFinishedList, deleteTask }: Props) {
  return (
    <div className="column-container">
      <ToDoListColumn columnName="To do" tasksList={todoList} moveTaskToFinishedList={moveTaskToFinishedList} moveTaskToToDosList={moveTaskToToDosList} deleteTask={deleteTask}/>
      <ToDoListColumn columnName="Finished" tasksList={finishedList} moveTaskToToDosList={moveTaskToToDosList} moveTaskToFinishedList={moveTaskToFinishedList} deleteTask={deleteTask} />
    </div>)
}
