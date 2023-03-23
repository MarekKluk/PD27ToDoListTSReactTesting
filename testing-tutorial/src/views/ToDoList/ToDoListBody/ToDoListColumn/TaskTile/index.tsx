import React, {MouseEventHandler} from 'react'
import {Task} from "../../../../../shared/types/Task";

interface Props  {
  task: Task,
  moveTaskLeft: MouseEventHandler<HTMLButtonElement>,
  moveTaskRight: MouseEventHandler<HTMLButtonElement>,

  deleteTask: MouseEventHandler<HTMLButtonElement>,
}
export const TaskTile = ({ task, moveTaskLeft, moveTaskRight, deleteTask }: Props) => (<div className="task">
  <h3>{task.title}</h3>
  {task.completed && <button onClick={moveTaskLeft}>left</button>}
  <button onClick={deleteTask} className="delete-button">delete</button>
  {!task.completed && <button className="move-right-button" onClick={moveTaskRight}>right</button>}
</div>)
