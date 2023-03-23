export function modifyTask (taskId: number, status: boolean) {
  return (
    fetch(
      `http://localhost:3000/todos/${taskId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          completed: status
        }),
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
