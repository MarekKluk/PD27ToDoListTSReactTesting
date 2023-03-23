import React, { useEffect, useState } from 'react';
import { fetchToDosApi } from "../../../shared/Api/fetchToDosApi";
import { splitListByStatus } from "./splitListByStatus";
import { Task } from "../../../shared/types/Task";
import { deleteTaskApi } from "../../../shared/Api/deleteTaskApi";
import { modifyTask } from "../../../shared/Api/modifyTask";
import { postTask } from "../../../shared/Api/postTask";
export function useToDoList () {
  const [taskInputValue, setTaskInputValue] = useState('')
  const [todoList, setToDoList] = useState<Task[]>([])
  const [finishedList, setFinishedList] = useState<Task[]>([])

  const handleTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInputValue(event.target.value)
  }
  useEffect(() => {
    async function fetchToDos () {
      const todoListArray = await fetchToDosApi()
      const splittedLists = splitListByStatus(todoListArray)
      setToDoList(splittedLists.todo)
      setFinishedList(splittedLists.finished)
    }
    fetchToDos()
  }, [])

  const deleteTask = (task: Task) => {
    let taskIndexToDelete = null
    const listForOperation: Task[] = task.completed ? finishedList || [] : todoList || []
    taskIndexToDelete = listForOperation.findIndex(searchedTask => searchedTask.id === task.id)
    listForOperation.splice(taskIndexToDelete, 1)
    task.completed ? setFinishedList([...listForOperation]) : setToDoList([...listForOperation])
    deleteTaskApi(task.id)
      .catch(() => {
        alert('Failed to delete task.')
        listForOperation.push(task)
        task.completed ? setFinishedList([...listForOperation]) : setToDoList([...listForOperation])
      })
  }

  const moveTaskToToDosList = (task: Task) => {
    const taskIndexToMove = finishedList?.findIndex(searchedTask => searchedTask.id === task.id);
    task.completed = false;
    todoList?.push(task)
    setToDoList([...todoList])
    finishedList.splice(taskIndexToMove, 1)
    setFinishedList([...finishedList])
    modifyTask(task.id, false)
      .catch(() => {
        alert('Failed to move task.')
        task.completed = true
        todoList.splice(taskIndexToMove, 1)
        finishedList.push(task)
        setToDoList([...todoList])
        setFinishedList([...finishedList])
      })
  }
  const moveTaskToFinishedList = (task: Task) => {
    const taskIndexToMove = finishedList?.findIndex(searchedTask => searchedTask.id === task.id);
    task.completed = true;
    finishedList?.push(task)
    setFinishedList([...finishedList])
    todoList.splice(taskIndexToMove, 1)
    setToDoList([...todoList])
    modifyTask(task.id, true)
      .catch(() => {
        alert('Failed to move task.')
        task.completed = false
        finishedList.splice(taskIndexToMove, 1)
        todoList.push(task)
        setToDoList([...todoList])
        setFinishedList([...finishedList])
      })
  }
  const handleAddTaskButton = () => {
    const newTaskId = Math.round(Math.pow(1234, new Date().getUTCMilliseconds()))
    const taskToAdd: Task = {
      userId: 1,
      id: newTaskId,
      title: taskInputValue,
      completed: false
    }
    postTask(taskToAdd)
      .then(task => {
        todoList.push(task)
        setToDoList([...todoList])
        setTaskInputValue('')
      })
      .catch(() => alert('Failed to add new task.'))
  }
  return {
    handleTaskInputChange,
    taskInputValue,
    deleteTask,
    moveTaskToToDosList,
    moveTaskToFinishedList,
    handleAddTaskButton,
    todoList,
    finishedList,
  }
}
