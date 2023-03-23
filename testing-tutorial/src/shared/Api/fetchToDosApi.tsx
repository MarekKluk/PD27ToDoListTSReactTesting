export function fetchToDosApi () {
  return (
    fetch(`http://localhost:3000/todos`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include'
      })
      .then(response => response.json())
  )
}
