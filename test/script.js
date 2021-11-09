let root = document.querySelector(".tbody");
let todo = document.querySelector(".todo");
let todoId = document.querySelector(".todo__id");
let todoTitle = document.querySelector(".todo__input");
let createBtn = document.querySelector(".todo__create-btn");
let content = document.querySelector(".todo__list");
let todoList;

if (localStorage.getItem("todoList") === null) {
  todoList = [
    {
      id: Math.floor(Date.now() * Math.random()),
      title: "Из сказанного выше ясно, что генератор Lorem Ipsum не подойдёт",
      completed: false,
    },
    {
      id: Math.floor(Date.now() * Math.random()),
      title: "эффекта рандомного уникального текста можно добиться в сервисе",
      completed: false,
    },
  ];
} else {
  todoList = JSON.parse(localStorage["todoList"]);
}

function templete(todo) {
  root.innerHTML += `
    <tr class="todo__list">
    <td class="todo__id">${todo.id}</td>
    <td>${todo.title}</td>
    <td>
    <input class="todo__checkbox" type="checkbox">
    <button class="todo__remove">Удалить</button>
  </td>
  </tr>
    `;
}

function render() {
  root.innerHTML = "";
  todoList.forEach((todo) => {
    templete(todo);
  });
}

render();

todo.addEventListener("click", remove);
createBtn.addEventListener("click", create);

function remove(event) {
  if (!event.target.classList.contains("todo__remove")) return;
  let id = +event.target.closest(".todo__list").querySelector(".todo__id")
    .innerHTML;
  let index = todoList.findIndex((item) => item.id === id);
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  render();
}

function create() {
  let todo = {
    id: Math.floor(Date.now() * Math.random()),
    title: todoTitle.value,
    completed: false,
  };
  todoList.push(todo);

  localStorage.setItem("todoList", JSON.stringify(todoList));

  render();
}

let checkbox = document.querySelector(".todo__checkbox");
todo.addEventListener("click", completed);

function completed(event) {
  if (!event.target.classList.contains("todo__checkbox")) return;
  let id = +event.target.closest(".todo__list").querySelector(".todo__id")
    .innerHTML;
  let checkbox = event.target
    .closest(".todo__list")
    .querySelector(".todo__checkbox");
  let content = event.target.closest(".todo__list");

  todoList.forEach((item) => {
    if (item.id === id) {
      item.completed = checkbox.checked;
      content.classList.toggle("bg");
    }
  });
}
