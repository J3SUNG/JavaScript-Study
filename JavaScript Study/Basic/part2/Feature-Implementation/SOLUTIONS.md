# 간단한 기능 구현 문제 솔루션

이 파일에는 간단한 기능 구현 문제의 솔루션이 포함되어 있습니다.

## 간단한 카운터 (counter.html)

```javascript
const counter = document.getElementById('counter');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const increaseBtn = document.getElementById('increaseBtn');

let count = 0;

// 카운터 업데이트 함수
function updateCounter() {
  counter.textContent = count;
  
  // 카운터 값에 따라 색상 변경
  if (count < 0) {
    counter.style.color = '#f44336';  // 빨간색
  } else if (count > 0) {
    counter.style.color = '#4CAF50';  // 녹색
  } else {
    counter.style.color = '#000000';  // 검정색
  }
}

// 이벤트 리스너 등록
increaseBtn.addEventListener('click', function() {
  count++;
  updateCounter();
});

decreaseBtn.addEventListener('click', function() {
  count--;
  updateCounter();
});

resetBtn.addEventListener('click', function() {
  count = 0;
  updateCounter();
});

// 초기 상태 설정
updateCounter();
```

## 로컬 스토리지를 이용한 투두 리스트 (todo-local-storage.html)

```javascript
const todoForm = document.querySelector('.add-form');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// 로컬 스토리지에서 할 일 목록 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 할 일 목록 저장 함수
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 할 일 렌더링 함수
function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
      <span>${todo}</span>
      <button data-index="${index}">삭제</button>
    `;
    todoList.appendChild(todoItem);
  });
}

// 할 일 추가 함수
function addTodo(e) {
  e.preventDefault();
  
  const todoText = todoInput.value.trim();
  
  if (todoText) {
    todos.push(todoText);
    saveTodos();
    todoInput.value = '';
    renderTodos();
  }
}

// 할 일 삭제 함수
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// 이벤트 리스너
todoForm.addEventListener('submit', addTodo);

todoList.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    deleteTodo(parseInt(index));
  }
});

// 초기 렌더링
renderTodos();
```

## 고급 투두 리스트 (할 일 완료 상태 추가)

```javascript
const todoForm = document.querySelector('.add-form');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// 로컬 스토리지에서 할 일 목록 불러오기
// 할 일 구조: { id: 숫자, text: 문자열, completed: 불리언 }
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 할 일 목록 저장 함수
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 할 일 렌더링 함수
function renderTodos() {
  todoList.innerHTML = '';
  
  if (todos.length === 0) {
    todoList.innerHTML = '<div class="empty-list">할 일이 없습니다. 새로운 할 일을 추가하세요!</div>';
    return;
  }
  
  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.dataset.id = todo.id;
    
    // 완료 상태에 따라 클래스 추가
    if (todo.completed) {
      todoItem.classList.add('completed');
    }
    
    todoItem.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn">삭제</button>
    `;
    
    todoList.appendChild(todoItem);
  });
  
  // 체크박스 이벤트 리스너 등록
  const checkboxes = document.querySelectorAll('.todo-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', toggleTodoStatus);
  });
  
  // 삭제 버튼 이벤트 리스너 등록
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteTodo);
  });
}

// 할 일 추가 함수
function addTodo(e) {
  e.preventDefault();
  
  const todoText = todoInput.value.trim();
  
  if (todoText) {
    // 새로운 할 일 추가
    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    
    todos.push(newTodo);
    saveTodos();
    todoInput.value = '';
    renderTodos();
  }
}

// 할 일 완료 상태 토글 함수
function toggleTodoStatus(e) {
  const todoItem = e.target.closest('.todo-item');
  const todoId = parseInt(todoItem.dataset.id);
  
  // 해당 할 일 찾기
  const todo = todos.find(item => item.id === todoId);
  if (todo) {
    todo.completed = e.target.checked;
    todoItem.classList.toggle('completed', todo.completed);
    saveTodos();
  }
}

// 할 일 삭제 함수
function deleteTodo(e) {
  const todoItem = e.target.closest('.todo-item');
  const todoId = parseInt(todoItem.dataset.id);
  
  // 해당 할 일 제거
  todos = todos.filter(todo => todo.id !== todoId);
  saveTodos();
  renderTodos();
}

// 완료된 할 일 모두 삭제
function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
}

// 이벤트 리스너
todoForm.addEventListener('submit', addTodo);
clearCompletedBtn.addEventListener('click', clearCompleted);

// 초기 렌더링
renderTodos();
```

## 면접 시 주의사항

- 상태 관리 방식과 이벤트 처리에 대한 이해를 보여주세요.
- 로컬 스토리지의 특성(동기적으로 동작, 문자열만 저장 가능 등)과 한계(용량 제한, 보안 이슈 등)를 알고 있으면 좋습니다.
- 사용자 경험을 고려한 오류 처리와 UI 피드백을 제공하는 방법을 설명할 수 있어야 합니다.
- 코드의 재사용성과 유지보수성을 고려한 함수 분리와 모듈화 방법을 알고 있으면 좋습니다.
- 성능 최적화 관점에서 불필요한 DOM 조작을 최소화하는 방법을 알고 있으면 좋습니다.
