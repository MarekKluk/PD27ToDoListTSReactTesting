import { describe, expect, Mock, test, vi } from 'vitest';
import { useToDoList } from "../index";
import { TestWrapper } from "../../../../utils/testWrapper";
import { fetchToDosApi}  from "../../../../shared/Api/fetchToDosApi";
import { Task } from "../../../../shared/types/Task";
import { postTask } from "../../../../shared/Api/postTask";
import { renderHook, waitFor } from "@testing-library/react";
import { modifyTask } from "../../../../shared/Api/modifyTask";

vi.mock('../../../../shared/Api/fetchToDosApi', () => {
  return {
    fetchToDosApi: vi.fn()
  };
});
vi.mock('../../../../shared/Api/postTask', () => {
  return {
    postTask: vi.fn()
  };
});

vi.mock('../../../../shared/Api/modifyTask', () => {
  return {
    modifyTask: vi.fn()
  };
});

describe('The UseToDoList hook', () => {
  let task1: Task
  let task2: Task
  let task3: Task
  let task4: Task
  let returnedToDoList: Task[]

  beforeEach(() => {
    task1 = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": true
    }
    task2 = {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    }
    task3 = {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    }
    task4 = {
      "userId": 1,
      "id": 4,
      "title": "qui ullam ratione quibusdam voluptatem quia omnis",
      "completed": true
    }
    returnedToDoList = [task1, task2, task3, task4]
    vi.clearAllMocks();
    (fetchToDosApi as Mock).mockResolvedValue(returnedToDoList);
  })

  test('should not crash when called', () => {
    expect(() => {
      renderHook(() => useToDoList(), {wrapper: TestWrapper})
    }).not.Throw;
  })

  describe('The handleAddTaskButton function', () => {
    const taskMock: Task = {
      "userId": 1,
      "id": 5,
      "title": 'abc',
      "completed": false
    }
  	test('should call postTask with correct task', async() => {
      (postTask as Mock).mockResolvedValue(taskMock)
  		const { result } = renderHook(() => useToDoList(), {wrapper: TestWrapper})
      await waitFor(() => result.current.setTaskInputValue('abc'))
      await waitFor(() => result.current.handleAddTaskButton())
      expect(postTask).toBeCalledWith(taskMock)
   	})
  })

  describe('The splitListByStatusAndFindBiggestId function', () => {
    test('should correctly split taskList to finished and toDo lists', async () => {
      const { result } = renderHook(() => useToDoList(), {wrapper: TestWrapper})
      const {todo, finished } = await waitFor(() => result.current.splitListByStatusAndFindBiggestId(returnedToDoList))
      expect(todo).toEqual([task2, task3])
      expect(finished).toEqual([task1, task4])
    })
  })

  describe('The moveTakToToDosList function', () => {
    const resolvedMockedTask = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    }
    test('should move task from finished list to toDo list', async() => {
      (modifyTask as Mock).mockResolvedValue(resolvedMockedTask)
      const { result } = renderHook(() => useToDoList(), {wrapper: TestWrapper})
      await waitFor(() => result.current.moveTaskToToDosList(task1))
      expect(result.current.todoList).toEqual([task1, task2, task3]);
      expect(result.current.finishedList).toEqual([task4]);
      expect(task1.completed).toBe(false);
    })
  })

  describe('moveTaskToFinishedList function', () => {
    const resolvedMockedTask = {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": true
    }
    test('should move task from toDo list to finished list', async() => {
      (modifyTask as Mock).mockResolvedValue(resolvedMockedTask)
      const { result } = renderHook(() => useToDoList(), {wrapper: TestWrapper})
      await waitFor(() => result.current.moveTaskToFinishedList(task2))
      expect(result.current.todoList).toEqual([task3]);
      expect(result.current.finishedList).toEqual([task1, task2, task4]);
      expect(task2.completed).toBe(true);
    })
  })
})
