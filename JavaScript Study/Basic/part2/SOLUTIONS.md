# 라이브코딩 연습 문제 솔루션

이 파일에는 각 연습 문제에 대한 솔루션이 포함되어 있습니다. 먼저 스스로 문제를 풀어보고, 필요할 때 참고하세요.

> **참고**: 면접에서는 솔루션을 암기하는 것보다 문제 해결 과정을 이해하는 것이 중요합니다. 이 솔루션은 참고용이며, 더 나은 방법이 있을 수 있습니다.

## 1. JavaScript 알고리즘

### 배열 뒤집기 (array-reverse.js)
```javascript
function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
  
  // 또는 한 줄로:
  // return arr.map((_, i) => arr[arr.length - 1 - i]);
}
```

### 회문 확인 (palindrome.js)
```javascript
function isPalindrome(str) {
  // 알파벳과 숫자만 남기고 소문자로 변환
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // 앞뒤로 비교
  for (let i = 0; i < Math.floor(cleanStr.length / 2); i++) {
    if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
  
  // 또는 한 줄로:
  // return cleanStr === cleanStr.split('').reverse().join('');
}
```

### 피보나치 수열 (fibonacci.js)
```javascript
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  let a = 0;
  let b = 1;
  let result;
  
  for (let i = 2; i <= n; i++) {
    result = a + b;
    a = b;
    b = result;
  }
  
  return result;
  
  // 또는 재귀적으로 (주의: 큰 수에서는 성능 이슈가 있음):
  // if (n <= 1) return n;
  // return fibonacci(n - 1) + fibonacci(n - 2);
}
```

## 2. DOM 조작

### 토글 버튼 (toggle-button.html)
```javascript
const toggleButton = document.getElementById('toggleButton');
const toggleText = document.getElementById('toggleText');

toggleButton.addEventListener('click', function() {
  toggleText.classList.toggle('hidden');
  
  // 버튼 텍스트 변경 (선택적)
  if (toggleText.classList.contains('hidden')) {
    toggleButton.textContent = '텍스트 보이기';
  } else {
    toggleButton.textContent = '텍스트 숨기기';
  }
});
```

### 동적 리스트 추가 (dynamic-list.html)
```javascript
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const itemList = document.getElementById('itemList');

// 항목 추가 버튼 이벤트 리스너
addButton.addEventListener('click', function() {
  const itemText = itemInput.value.trim();
  
  if (itemText !== '') {
    const li = document.createElement('li');
    li.textContent = itemText;
    itemList.appendChild(li);
    itemInput.value = '';
    itemInput.focus();
  }
});

// 모두 지우기 버튼 이벤트 리스너
clearButton.addEventListener('click', function() {
  itemList.innerHTML = '';
});

// Enter 키로도 추가 가능하게 하기 (선택적)
itemInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addButton.click();
  }
});
```

## 3. HTML/CSS 레이아웃

### 반응형 카드 레이아웃 (responsive-cards.html)
```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  flex: 1 1 30%;
  min-width: 250px;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
  }
  
  .card {
    width: 100%;
    flex: 1 1 100%;
  }
}
```

### 중앙 정렬 모달 (centered-modal.html)
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  max-width: 80%;
  max-height: 80%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

## 4. API 호출 및 비동기 처리

### 간단한 Fetch API 사용 (fetch-example.html)
```javascript
const loadButton = document.getElementById('loadButton');
const status = document.getElementById('status');
const userList = document.getElementById('userList');

loadButton.addEventListener('click', fetchUsers);

async function fetchUsers() {
  // 로딩 상태 표시
  status.textContent = '로딩 중...';
  status.className = 'loading';
  userList.innerHTML = '';
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    
    const users = await response.json();
    
    // 사용자 목록 표시
    status.textContent = `${users.length}명의 사용자를 불러왔습니다.`;
    status.className = '';
    
    users.forEach(user => {
      const li = document.createElement('li');
      li.className = 'user-item';
      li.innerHTML = `<strong>${user.name}</strong> <br> ${user.email}`;
      userList.appendChild(li);
    });
  } catch (error) {
    status.textContent = `오류 발생: ${error.message}`;
    status.className = 'error';
  }
}
```

### Promise 체이닝 (promise-chaining.js)
```javascript
function promiseSquare(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}

function promiseAddTwo(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num + 2);
    }, 1000);
  });
}

function promiseToString(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String(num));
    }, 1000);
  });
}

// 함수 체이닝
promiseSquare(3)
  .then(squared => promiseAddTwo(squared))
  .then(added => promiseToString(added))
  .then(result => {
    console.log(result);  // "11"
    console.log(typeof result);  // "string"
  });

// 또는 async/await 사용
async function processNumber(num) {
  const squared = await promiseSquare(num);
  const added = await promiseAddTwo(squared);
  const result = await promiseToString(added);
  console.log(result);  // "11"
  console.log(typeof result);  // "string"
}

// processNumber(3);  // 주석 해제하여 실행
```

## 5. 간단한 기능 구현

### 간단한 카운터 (counter.html)
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
```

### 로컬 스토리지를 이용한 투두 리스트 (todo-local-storage.html)
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

## 6. 폼 검증

### 비밀번호 강도 검사 (password-strength.html)
```javascript
const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strengthMeter');
const feedback = document.getElementById('feedback');

passwordInput.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
  const password = passwordInput.value;
  
  // 초기화
  let strength = 0;
  let message = '';
  
  // 문자 포함 검사
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  // 포함된 형식 개수 세기
  let typesCount = 0;
  if (hasLetters) typesCount++;
  if (hasNumbers) typesCount++;
  if (hasSpecialChars) typesCount++;
  
  // 강도 및 피드백 설정
  if (password.length === 0) {
    strength = 0;
    message = '';
  } else if (password.length < 8) {
    strength = 1;
    message = '너무 짧습니다. 8자 이상으로 작성하세요.';
  } else if (typesCount === 1) {
    strength = 1;
    message = '약함: 문자, 숫자, 특수문자를 혼합해 사용하세요.';
  } else if (typesCount === 2) {
    strength = 2;
    message = '중간: 더 강한 비밀번호를 위해 다른 형식의 문자도 추가하세요.';
  } else {
    strength = 3;
    message = '강함: 안전한 비밀번호입니다!';
  }
  
  // 화면 업데이트
  // strength: 0(비었음), 1(약함), 2(중간), 3(강함)
  const percent = (strength / 3) * 100;
  strengthMeter.style.width = `${percent}%`;
  
  // 클래스 제거
  strengthMeter.classList.remove('weak', 'medium', 'strong');
  
  // 강도에 따라 클래스 추가
  if (strength === 1) {
    strengthMeter.classList.add('weak');
  } else if (strength === 2) {
    strengthMeter.classList.add('medium');
  } else if (strength === 3) {
    strengthMeter.classList.add('strong');
  }
  
  feedback.textContent = message;
}
```

## 7. 이미지 슬라이더

### 간단한 이미지 슬라이더 (simple-slider.html)
```javascript
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicator = document.getElementById('indicator');

let currentIndex = 0;
const totalSlides = slides.length;

// 슬라이드 이동 함수
function goToSlide(index) {
  // 범위 검사
  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }
  
  // 현재 인덱스 업데이트
  currentIndex = index;
  
  // 슬라이드 이동 (트랜스폼 사용)
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
  });
  
  // 인디케이터 업데이트
  updateIndicator();
}

// 인디케이터 생성 함수
function createIndicators() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    indicator.appendChild(dot);
  }
}

// 인디케이터 업데이트 함수
function updateIndicator() {
  const dots = indicator.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// 버튼 클릭 이벤트 리스너
prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// 초기화
createIndicators();
goToSlide(0);

// 추가: CSS 초기화 (transform이 없으면 슬라이드가 겹쳐보임)
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});
```

## 8. 정렬 알고리즘 시각화

### 버블 정렬 시각화 (bubble-sort.html)
```javascript
const barsContainer = document.getElementById('barsContainer');
const generateBtn = document.getElementById('generateBtn');
const sortBtn = document.getElementById('sortBtn');
const resetBtn = document.getElementById('resetBtn');

let array = [];
let originalArray = [];
let sortInterval;
let isSorting = false;

// 무작위 배열 생성 함수
function generateRandomArray() {
  stopSorting();
  array = [];
  
  // 10개의 랜덤 수 (1-50) 생성
  for (let i = 0; i < 10; i++) {
    array.push(Math.floor(Math.random() * 50) + 1);
  }
  
  // 원본 배열 복사
  originalArray = [...array];
  
  renderBars();
}

// 배열을 기반으로 막대 렌더링
function renderBars(activeIndices = []) {
  barsContainer.innerHTML = '';
  
  array.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 5}px`;
    
    // 활성화된 아이템(비교중) 표시
    if (activeIndices.includes(index)) {
      bar.classList.add('active');
    }
    
    // 정렬이 완료된 아이템 표시
    if (isSorted() && isSorting) {
      bar.classList.add('sorted');
    }
    
    barsContainer.appendChild(bar);
  });
}

// 버블 정렬 알고리즘
function bubbleSort() {
  if (isSorting) return;
  isSorting = true;
  
  let i = 0;
  let j = 0;
  const n = array.length;
  
  sortInterval = setInterval(() => {
    if (i >= n - 1) {
      // 정렬 완료
      clearInterval(sortInterval);
      renderBars();
      return;
    }
    
    if (j >= n - i - 1) {
      // 하나의 패스 완료, 다음 패스로
      j = 0;
      i++;
    }
    
    // 현재 비교하는 두 요소 표시
    renderBars([j, j + 1]);
    
    // 비교 및 스왑
    if (array[j] > array[j + 1]) {
      // 요소 교환
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      
      // 막대 업데이트
      renderBars([j, j + 1]);
    }
    
    j++;
    
    // 정렬이 완료되면 중지
    if (isSorted()) {
      clearInterval(sortInterval);
      renderBars();
      isSorting = false;
    }
  }, 100);
}

// 정렬 중지 함수
function stopSorting() {
  if (sortInterval) {
    clearInterval(sortInterval);
    isSorting = false;
  }
}

// 배열이 정렬되었는지 확인
function isSorted() {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) return false;
  }
  return true;
}

// 초기화 함수
function resetArray() {
  stopSorting();
  array = [...originalArray];
  renderBars();
}

// 이벤트 리스너 등록
generateBtn.addEventListener('click', generateRandomArray);
sortBtn.addEventListener('click', bubbleSort);
resetBtn.addEventListener('click', resetArray);

// 초기 배열 생성
generateRandomArray();
```

## 9. 드래그 앤 드롭

### 정렬 가능한 리스트 (sortable-list.html)
```javascript
const sortableList = document.getElementById('sortableList');
const items = sortableList.querySelectorAll('.sortable-item');

// 드래그중인 요소
let draggedItem = null;

// 각 요소에 이벤트 리스너 추가
items.forEach(item => {
  // 드래그 시작
  item.addEventListener('dragstart', function(e) {
    draggedItem = this;
    setTimeout(() => {
      this.classList.add('dragging');
    }, 0);
  });
  
  // 드래그 종료
  item.addEventListener('dragend', function() {
    this.classList.remove('dragging');
    draggedItem = null;
    
    // 모든 드롭 영역 표시 제거
    items.forEach(item => item.classList.remove('drop-zone'));
  });
  
  // 드래그 중일 때
  item.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  
  // 드래그가 요소 위에 있을 때
  item.addEventListener('dragenter', function(e) {
    e.preventDefault();
    if (this !== draggedItem) {
      this.classList.add('drop-zone');
    }
  });
  
  // 드래그가 요소를 떠날 때
  item.addEventListener('dragleave', function() {
    this.classList.remove('drop-zone');
  });
  
  // 드롭
  item.addEventListener('drop', function(e) {
    e.preventDefault();
    
    if (this !== draggedItem) {
      // 겹쳐진 두 요소의 위치 비교
      let allItems = Array.from(sortableList.querySelectorAll('.sortable-item'));
      let draggedIndex = allItems.indexOf(draggedItem);
      let targetIndex = allItems.indexOf(this);
      
      // 드래그된 요소가 드롭 요소 앞에 오는지 뒤에 오는지 확인
      if (draggedIndex < targetIndex) {
        sortableList.insertBefore(draggedItem, this.nextSibling);
      } else {
        sortableList.insertBefore(draggedItem, this);
      }
      
      this.classList.remove('drop-zone');
    }
  });
});
```

## 10. 데이터 필터링 및 검색

### 상품 필터링 (product-filter.html)
```javascript
const searchInput = document.getElementById('searchInput');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const priceCheckboxes = document.querySelectorAll('input[name="price"]');
const productsList = document.getElementById('productsList');

// 상품 리스트 렌더링 함수
function renderProducts(productsToRender) {
  productsList.innerHTML = '';
  
  if (productsToRender.length === 0) {
    productsList.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
    return;
  }
  
  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()}원</p>
      <span class="category">${product.category}</span>
    `;
    
    productsList.appendChild(productCard);
  });
}

// 필터링 함수
function filterProducts() {
  // 검색어 가져오기
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  // 선택된 카테고리 가져오기
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  // 선택된 가격 범위 가져오기
  const selectedPriceRanges = Array.from(priceCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  // 필터링 적용
  const filteredProducts = products.filter(product => {
    // 검색어 필터
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    
    // 카테고리 필터
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    // 가격 필터
    let matchesPrice = selectedPriceRanges.length === 0;
    
    if (!matchesPrice) {
      for (const range of selectedPriceRanges) {
        if (range === '0-50000' && product.price < 50000) {
          matchesPrice = true;
          break;
        } else if (range === '50000-100000' && product.price >= 50000 && product.price < 100000) {
          matchesPrice = true;
          break;
        } else if (range === '100000+' && product.price >= 100000) {
          matchesPrice = true;
          break;
        }
      }
    }
    
    // 모든 조건 충족 (AND 조건)
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // 필터링된 상품 표시
  renderProducts(filteredProducts);
}

// 이벤트 리스너 등록
searchInput.addEventListener('input', filterProducts);

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterProducts);
});

priceCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterProducts);
});

// 초기 렌더링
renderProducts(products);
```
