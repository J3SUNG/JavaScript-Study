// To-Do 리스트 기능 구현

// 여기에 To-Do 리스트 애플리케이션 코드를 작성하세요.
// 요구사항:
// 1. 새 할 일 항목 추가
// 2. 기존 항목 삭제
// 3. 항목 완료 표시(체크)
// 4. 항목 수정
// 5. 항목 필터링 (전체, 완료됨, 미완료)
// 6. 로컬 스토리지를 사용하여 데이터 유지

const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");
let todos = getStorage();

addButton.addEventListener("click", () => {
  const value = todoInput.value;
  if (value === "") return;

  todos.push({ id: Date.now(), text: value, completed: false });
  todoInput.value = "";
  update();
});

function renderTodoList() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", todo.completed);

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "todo-text";

    span.addEventListener("click", () => {
      todo.completed = !todo.completed;
      update();
    });

    const button = document.createElement("button");
    button.textContent = "X";
    button.className = "delete-btn";

    button.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      update();
    });

    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  });
}

function update() {
  setStorage();
  renderTodoList();
}

function setStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getStorage() {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
}

renderTodoList();
