const API = "/api/tasks"

async function loadTasks() {

  const res = await fetch(API)

  const tasks = await res.json()

  renderTasks(tasks)
}

function renderTasks(tasks) {

  const table = document.getElementById("taskTable")

  table.innerHTML = ""

  tasks.forEach(task => {

    table.innerHTML += `
      <tr>

        <td>${task.id}</td>

        <td>
          <input value="${task.title}" id="title-${task.id}">
        </td>

        <td>
          <input value="${task.description}" id="desc-${task.id}">
        </td>

        <td>
          <select id="status-${task.id}">
            <option value="pending" ${task.status === "pending" ? "selected" : ""}>pending</option>
            <option value="completed" ${task.status === "completed" ? "selected" : ""}>completed</option>
          </select>
        </td>

        <td>
          <button onclick="updateTask(${task.id})">Update</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </td>

      </tr>
    `
  })
}

async function createTask() {

  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const status = document.getElementById("status").value

  await fetch(API, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title,
      description,
      status
    })

  })

  loadTasks()
}

async function deleteTask(id) {

  await fetch(API + "/" + id, {
    method: "DELETE"
  })

  loadTasks()
}

async function updateTask(id) {

  const title = document.getElementById(`title-${id}`).value
  const description = document.getElementById(`desc-${id}`).value
  const status = document.getElementById(`status-${id}`).value

  await fetch(API + "/" + id, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title,
      description,
      status
    })

  })

  loadTasks()
}

async function getTaskById() {

  const id = document.getElementById("searchId").value

  const res = await fetch(API + "/" + id)

  if (!res.ok) {
    alert("Task not found")
    return
  }

  const task = await res.json()

  renderTasks([task])
}

loadTasks()