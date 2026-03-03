const API = "http://localhost:5000/api/todos";

const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

async function getTodos() {
  const res = await fetch(API);
  const todos = await res.json();

  list.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.title;

    li.onclick = () => deleteTodo(todo._id);

    list.appendChild(li);
  });
}

async function addTodo() {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  getTodos();
}

async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  getTodos();
}

addBtn.onclick = addTodo;

getTodos(); 