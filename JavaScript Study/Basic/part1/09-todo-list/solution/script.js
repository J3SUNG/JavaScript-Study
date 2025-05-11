// DOM 요소 선택
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// 투두 아이템 배열
let todos = [];

// 현재 필터 (all, active, completed)
let currentFilter = 'all';

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 로컬스토리지에서 할 일 목록 불러오기
    loadTodos();
    
    // 할 일 추가 버튼 클릭 이벤트
    addButton.addEventListener('click', addTodo);
    
    // 엔터 키로 할 일 추가
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // 할 일 목록 클릭 이벤트 (이벤트 위임)
    todoList.addEventListener('click', function(e) {
        const target = e.target;
        
        // 삭제 버튼 클릭 시
        if (target.classList.contains('delete-btn')) {
            const todoId = parseInt(target.closest('.todo-item').dataset.id);
            deleteTodo(todoId);
        }
        // 수정 버튼 클릭 시
        else if (target.classList.contains('edit-btn')) {
            const todoItem = target.closest('.todo-item');
            const todoId = parseInt(todoItem.dataset.id);
            editTodo(todoId, todoItem);
        }
        // 할 일 텍스트 클릭 시 (완료/미완료 토글)
        else if (target.classList.contains('todo-text')) {
            const todoItem = target.closest('.todo-item');
            const todoId = parseInt(todoItem.dataset.id);
            toggleTodoStatus(todoId);
        }
    });
    
    // 더블 클릭으로 수정 모드 전환
    todoList.addEventListener('dblclick', function(e) {
        if (e.target.classList.contains('todo-text')) {
            const todoItem = e.target.closest('.todo-item');
            const todoId = parseInt(todoItem.dataset.id);
            editTodo(todoId, todoItem);
        }
    });
    
    // 필터 버튼 클릭 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성 필터 버튼 클래스 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 필터 적용
            currentFilter = button.dataset.filter;
            filterTodos();
        });
    });
});

// 할 일 추가 함수
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        // 새 할 일 객체 생성
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        // 배열에 추가
        todos.push(newTodo);
        
        // 화면에 표시
        renderTodo(newTodo);
        
        // 로컬스토리지 업데이트
        saveTodos();
        
        // 입력 필드 초기화
        todoInput.value = '';
        todoInput.focus();
    }
}

// 할 일 삭제 함수
function deleteTodo(id) {
    // 배열에서 해당 할 일 제거
    todos = todos.filter(todo => todo.id !== id);
    
    // 화면에서 해당 요소 제거
    const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
    todoItem.remove();
    
    // 로컬스토리지 업데이트
    saveTodos();
}

// 할 일 완료 상태 토글 함수
function toggleTodoStatus(id) {
    // 배열에서 해당 할 일 찾기
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        
        // 해당 요소의 클래스 토글
        const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
        todoItem.classList.toggle('completed', todo.completed);
        
        // 로컬스토리지 업데이트
        saveTodos();
        
        // 필터 적용 (완료됨/미완료 필터 시)
        filterTodos();
    }
}

// 할 일 수정 함수
function editTodo(id, todoItem) {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;
    
    // 현재 텍스트를 가진 입력 필드 생성
    const todoText = todoItem.querySelector('.todo-text');
    const currentText = todo.text;
    
    // 수정 중인지 확인
    if (todoItem.classList.contains('editing')) return;
    
    // 수정 모드로 변경
    todoItem.classList.add('editing');
    
    // 텍스트 요소를 숨기고 입력 필드 생성
    todoText.style.display = 'none';
    
    // 수정 폼 생성
    const editForm = document.createElement('form');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
        <input type="text" class="edit-input" value="${currentText}">
        <button type="submit" class="save-btn">저장</button>
    `;
    
    // 기존 액션 버튼 숨기기
    const actionButtons = todoItem.querySelector('.todo-actions');
    actionButtons.style.display = 'none';
    
    // 폼 삽입
    todoItem.insertBefore(editForm, actionButtons);
    
    // 입력 필드에 포커스
    const editInput = editForm.querySelector('.edit-input');
    editInput.focus();
    editInput.setSelectionRange(0, editInput.value.length);
    
    // 폼 제출 이벤트
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveEdit(id, editInput.value.trim());
    });
    
    // 폼 외부 클릭 시 저장
    function handleClickOutside(e) {
        if (!editForm.contains(e.target)) {
            saveEdit(id, editInput.value.trim());
            document.removeEventListener('click', handleClickOutside);
        }
    }
    
    // 약간의 딜레이 후 외부 클릭 이벤트 등록 (입력 필드 클릭과 겹치지 않도록)
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 100);
    
    // 편집 내용 저장 함수
    function saveEdit(id, newText) {
        // 수정 모드 해제
        todoItem.classList.remove('editing');
        
        // 빈 텍스트면 삭제
        if (!newText) {
            deleteTodo(id);
            return;
        }
        
        // 텍스트 업데이트
        todo.text = newText;
        todoText.textContent = newText;
        
        // 원래 UI로 복원
        todoText.style.display = 'block';
        actionButtons.style.display = 'flex';
        editForm.remove();
        
        // 로컬스토리지 업데이트
        saveTodos();
    }
}

// 할 일 필터링 함수
function filterTodos() {
    const todoItems = document.querySelectorAll('.todo-item');
    
    todoItems.forEach(item => {
        const id = parseInt(item.dataset.id);
        const todo = todos.find(t => t.id === id);
        
        switch (currentFilter) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'active':
                item.style.display = todo && !todo.completed ? 'flex' : 'none';
                break;
            case 'completed':
                item.style.display = todo && todo.completed ? 'flex' : 'none';
                break;
        }
    });
}

// 할 일 렌더링 함수
function renderTodo(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.dataset.id = todo.id;
    
    todoItem.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <div class="todo-actions">
            <button class="edit-btn">수정</button>
            <button class="delete-btn">삭제</button>
        </div>
    `;
    
    // 필터에 맞는 경우에만 표시
    switch (currentFilter) {
        case 'all':
            todoItem.style.display = 'flex';
            break;
        case 'active':
            todoItem.style.display = !todo.completed ? 'flex' : 'none';
            break;
        case 'completed':
            todoItem.style.display = todo.completed ? 'flex' : 'none';
            break;
    }
    
    todoList.appendChild(todoItem);
}

// 할 일 목록 로컬스토리지에 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 할 일 목록 로컬스토리지에서 불러오기
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        
        // 화면에 표시
        todos.forEach(todo => {
            renderTodo(todo);
        });
    }
}
