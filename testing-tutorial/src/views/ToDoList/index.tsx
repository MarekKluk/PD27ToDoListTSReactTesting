import React from 'react'
import { useToDoList } from "./useToDoList";
import { ToDoListBody } from './ToDoListBody'

export function ToDoList () {

  const {
    handleTaskInputChange,
    taskInputValue,
    deleteTask,
    moveTaskToToDosList,
    moveTaskToFinishedList,
    handleAddTaskButton,
    todoList,
    finishedList,
  } = useToDoList()

  return (
    <div className="app-container">
      <h1>To do:</h1>
      <div className="input-and-button-wrap">
        <input
          onInput={handleTaskInputChange}
          value={taskInputValue}
          placeholder="task name"
        />
        <button className="add-task-button" onClick={() => handleAddTaskButton()}>Add task</button>
      </div>
      {
        todoList &&
				<ToDoListBody
					todoList={todoList}
					finishedList={finishedList}
					moveTaskToToDosList={moveTaskToToDosList}
					moveTaskToFinishedList={moveTaskToFinishedList}
					deleteTask={deleteTask}
				/>
      }
    </div>
  )
}
