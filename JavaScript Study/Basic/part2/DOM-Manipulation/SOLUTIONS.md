# DOM 조작 문제 솔루션

이 파일에는 DOM 조작 문제의 솔루션이 포함되어 있습니다.

## 토글 버튼 (toggle-button.html)

```javascript
const toggleButton = document.getElementById('toggleButton');
const toggleText = document.getElementById('toggleText');

toggleButton.addEventListener('click', function() {
  // 텍스트 요소의 hidden 클래스 토글
  toggleText.classList.toggle('hidden');
  
  // 버튼 텍스트 변경 (선택적 향상)
  if (toggleText.classList.contains('hidden')) {
    toggleButton.textContent = '텍스트 보이기';
  } else {
    toggleButton.textContent = '텍스트 숨기기';
  }
});
```

## 동적 리스트 추가 (dynamic-list.html)

```javascript
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const itemList = document.getElementById('itemList');

// 항목 추가 버튼 이벤트 리스너
addButton.addEventListener('click', function() {
  const itemText = itemInput.value.trim();
  
  // 빈 텍스트는 추가하지 않음
  if (itemText !== '') {
    // 새 리스트 아이템 생성 및 추가
    const li = document.createElement('li');
    li.textContent = itemText;
    itemList.appendChild(li);
    
    // 입력 필드 비우기 및 포커스
    itemInput.value = '';
    itemInput.focus();
  }
});

// 모두 지우기 버튼 이벤트 리스너
clearButton.addEventListener('click', function() {
  // 리스트 내용 비우기
  itemList.innerHTML = '';
});

// Enter 키로도 추가 가능하게 하기 (선택적 향상)
itemInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addButton.click();
  }
});
```

## 고급 솔루션 (동적 리스트 항목 삭제 기능 추가)

```javascript
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const itemList = document.getElementById('itemList');

// 항목 추가 버튼 이벤트 리스너
addButton.addEventListener('click', function() {
  addItem();
});

// 항목 추가 함수
function addItem() {
  const itemText = itemInput.value.trim();
  
  if (itemText !== '') {
    // 새 리스트 아이템 생성
    const li = document.createElement('li');
    li.className = 'list-item';
    
    // 항목 텍스트 추가
    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;
    li.appendChild(textSpan);
    
    // 삭제 버튼 추가
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
      li.remove();
    };
    li.appendChild(deleteBtn);
    
    // 리스트에 항목 추가
    itemList.appendChild(li);
    
    // 입력 필드 초기화
    itemInput.value = '';
    itemInput.focus();
  }
}

// 모두 지우기 버튼 이벤트 리스너
clearButton.addEventListener('click', function() {
  itemList.innerHTML = '';
});

// Enter 키로도 추가 가능하게 하기
itemInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addItem();
  }
});
```

## 면접 시 주의사항

- 이벤트 위임을 사용하여 동적으로 생성된 요소에 이벤트를 처리하는 방법을 알고 있다면 설명하세요.
- innerHTML vs createElement/appendChild의 차이점과 각각의 장단점을 알고 있다면 언급하세요.
- 코드의 재사용성과 유지보수성을 고려한 함수 구성을 보여주세요.
- 브라우저 호환성 고려사항이 있다면 언급하세요.
