let addBtn = document.getElementById("add-todo-btn");
let inputElm = document.getElementById("input-todo");
let todoList = document.getElementById("todos-list");

function createTaskLi(newTask, complete = false) {
  let li = document.createElement("li");
  li.classList.add("todo")
  li.innerHTML = `
        <div class="todo-text-container">
          <input type="checkbox" class="check-todo-btn" ${complete ? "checked" : ""} />
          <p class="todo-text ${complete ? "strike": ""}">
            ${newTask}
          </p>
          <input class="todo-text hide edit-todo-input" />
        </div>
        <div class="btn-container">
          <button class="delete-todo-btn">
            <i class="fal fa-trash fa-lg"></i>
          </button>
          <button class="edit-todo-btn">
            <i class="fal fa-edit fa-lg"></i>
          </button>
          <button class="hide confirm-edit-btn">
            <i class="fal fa-check-circle fa-lg"></i>
          </button>
        </div>`
  let checkBtn = li.querySelector(".check-todo-btn")
  let taskText = li.querySelector(".todo-text")
  let deleteBtn = li.querySelector(".delete-todo-btn")
  let editBtn = li.querySelector(".edit-todo-btn")
  let editInput = li.querySelector(".edit-todo-input")
  let confirmBtn = li.querySelector(".confirm-edit-btn")


  checkBtn.addEventListener("change", (ev) => {
    taskText.classList.toggle("strike", ev.target.checked);
    saveToLocal();
  })
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveToLocal();
  })
  editBtn.addEventListener("click", (ev) => {
    taskText.classList.add("hide")
    editBtn.classList.add("hide")
    editInput.classList.remove("hide")
    editInput.value = taskText.textContent.trim();
    editInput.select();
    confirmBtn.classList.remove("hide")
  })

  confirmBtn.addEventListener("click", () => {
    taskText.classList.remove("hide")
    editBtn.classList.remove("hide")
    editInput.classList.add("hide")
    taskText.textContent = editInput.value;

    confirmBtn.classList.add("hide")
    saveToLocal()
  })
  return li;
}

function loadFromLocal() {
  let todosStr = localStorage.getItem("todos");
  let todos = JSON.parse(todosStr)
  if (!Array.isArray(todos))  return;

  let taskLis = todos.map(todo => {
    return createTaskLi(todo.task, todo.complete);
  })
  todoList.append(...taskLis);
}
loadFromLocal();
//ahgkjhkjh
function saveToLocal() {
  let todos = [];
  Array.from(todoList.querySelectorAll("li")).forEach(li => {
    let task = li.querySelector(".todo-text").textContent.trim();
    let complete = li.querySelector(".check-todo-btn").checked;
    todos.push({task, complete})
  })
  localStorage.setItem("todos", JSON.stringify(todos, null, 4));
}

addBtn.addEventListener("click", () => {
  let newTask = inputElm.value;
  inputElm.value = "";
  let li = createTaskLi(newTask);


  todoList.appendChild(li);
  saveToLocal()
})
