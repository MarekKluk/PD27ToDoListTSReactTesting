import React, { useEffect, useState } from 'react';
import { fetchToDosApi } from "../../../shared/Api/fetchToDosApi";
import { Task } from "../../../shared/types/Task";
import { deleteTaskApi } from "../../../shared/Api/deleteTaskApi";
import { modifyTask } from "../../../shared/Api/modifyTask";
import { postTask } from "../../../shared/Api/postTask";
export function useToDoList () {
  const [taskInputValue, setTaskInputValue] = useState('')
  const [todoList, setToDoList] = useState<Task[]>([])
  const [finishedList, setFinishedList] = useState<Task[]>([])
  const [idCounter, setIdCounter] = useState<number>(0)

  const handleTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInputValue(event.target.value)
  }

  useEffect(() => {
    async function fetchToDos () {
      const todoListArray = await fetchToDosApi()
      const splittedLists = splitListByStatusAndFindBiggestId(todoListArray)
      setToDoList(splittedLists.todo)
      setFinishedList(splittedLists.finished)
    }
    fetchToDos()
  }, [])

  const splitListByStatusAndFindBiggestId = (toDoListArray: Task[]) => {
    const todo: Task[] = [];
    const finished: Task[] = [];
    let biggestId = 0;

    toDoListArray.forEach(task => {
      const listToPushTo = task.completed ? finished : todo;
      listToPushTo.push(task);
      biggestId = task.id > biggestId ? task.id : biggestId;
    });
    setIdCounter(biggestId);

    return {
      todo,
      finished
    };
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
    const taskIndexToMove = todoList?.findIndex(searchedTask => searchedTask.id === task.id);
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
  const getNewTask = () => {
    setIdCounter(idCounter + 1);
    return {
      userId: 1,
      id: idCounter + 1,
      title: taskInputValue,
      completed: false
    }
  }
  const handleAddTaskButton = () => {
    const taskToAdd = getNewTask()
    postTask(taskToAdd)
      .then(task => {
        todoList.push(task)
        setToDoList([...todoList])
        setTaskInputValue('')
      })
      .catch(() => alert('Failed to add new task.'))
  }

  const deleteTask = (task: Task) => {
    let taskIndexToDelete
    const listForOperation: Task[] = task.completed ? finishedList : todoList
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

  return {
    handleTaskInputChange,
    taskInputValue,
    deleteTask,
    moveTaskToToDosList,
    moveTaskToFinishedList,
    handleAddTaskButton,
    todoList,
    finishedList,
    splitListByStatusAndFindBiggestId,
    getNewTask,
    setTaskInputValue
  }
}
