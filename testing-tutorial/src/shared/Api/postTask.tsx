import { Task } from "../types/Task";
export function postTask (taskToAdd: Task) {
  return (
    fetch(
      `http://localhost:3000/todos`,
      {
        method: 'POST',
        body: JSON.stringify(taskToAdd),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include'
      }
    )
      .then(response => response.json())
  )
}
