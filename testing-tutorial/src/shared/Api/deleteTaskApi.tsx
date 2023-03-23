export function deleteTaskApi (taskId: number) {
  return (
    fetch(
      `http://localhost:3000/todos/${taskId}`,
      {
        method: 'DELETE',
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
