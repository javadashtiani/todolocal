const input = document.querySelector("input");
const addTodoBtn = document.querySelector("#add");
const todoList = document.querySelector(".todo-list");
const selectBox = document.querySelector(".filter");
// Add todo
addTodoBtn.addEventListener("click", addTodo);
//   save to do in document
document.addEventListener("DOMContentLoaded", saveTodoInDom);
//   add to do
function addTodo() {
  if (input.value == "") {
    alert("fill the gap");
  }
  localStorageToDO(input.value);
  let liElement = document.createElement("li");
  liElement.innerHTML = `
          ${input.value}
            <div>
              <span class="check"><i class="bi bi-check-lg"></i></span>
              <span class="trash"><i class="bi bi-trash3"></i></span>
            </div>
          `;
  todoList.appendChild(liElement);
  input.value = "";
  input.focus();

  //  checked todo
  let checkBtn = document.querySelectorAll(".check");
  let i = 1;
  checkBtn.forEach((val) => {
    val.addEventListener("click", (event) => {
      let liTag = event.target.parentElement.parentElement.parentElement;
      if (i % 2) {
        liTag.classList.add("complete-todo");
      } else {
        liTag.classList.remove("complete-todo");
      }
      i++;
    });
  });
  // delete todo
  let deleteBtn = document.querySelectorAll(".trash");
  deleteBtn.forEach((val) => {
    val.addEventListener("click", (event) => {
      _li = event.target.parentElement.parentElement.parentElement;
      removeLocalStorageToDo(_li);
      console.log(_li);
      _li.remove();
    });
  });
}

//   Local storage

function localStorageToDO(input) {
  let toDO;
  if (localStorage.getItem("todoList") === null) {
    toDO = [];
  } else {
    toDO = JSON.parse(localStorage.getItem("todoList"));
  }
  toDO.push(input);
  localStorage.setItem("todoList", JSON.stringify(toDO));
}

//   remove local storage
function removeLocalStorageToDo(_li) {
  let toDO;
  if (localStorage.getItem("todoList") === null) {
    toDO = [];
  } else {
    toDO = JSON.parse(localStorage.getItem("todoList"));
  }
  const todoIndex = _li.innerText;
  toDO.splice(toDO.indexOf(todoIndex), 1);
  localStorage.setItem("todoList", JSON.stringify(toDO));
}
// check to do
function checkLocalStorageTodo(liTag) {
  let toDO;
  if (localStorage.getItem("todoList") === null) {
    toDO = [];
  } else {
    toDO = JSON.parse(localStorage.getItem("todoList"));
  }
  liTag.classList.toggle("complete-todo");
}
//   save to do in document
function saveTodoInDom() {
  let toDO;
  if (localStorage.getItem("todoList") === null) {
    toDO = [];
  } else {
    toDO = JSON.parse(localStorage.getItem("todoList"));
  }
  toDO.forEach((val) => {
    let liElement = document.createElement("li");
    liElement.innerHTML = `
          ${val}
            <div>
              <span class="check"><i class="bi bi-check-lg"></i></span>
              <span class="trash"><i class="bi bi-trash3"></i></span>
            </div>
          `;
    todoList.appendChild(liElement);
  });
}
