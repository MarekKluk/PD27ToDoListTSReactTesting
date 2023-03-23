import { Task } from "../../../../shared/types/Task";

export function splitListByStatus (tasksList: Task[]) {
  const todo: Task[] = []
  const finished: Task[] = []

  tasksList.forEach(task => {
    const listToPushTo = task.completed ? finished : todo
    listToPushTo.push(task)
  })

  return {
    todo,
    finished
  }
}
