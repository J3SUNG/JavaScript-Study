# API 요청 문제 솔루션

이 파일에는 API 요청 문제의 솔루션이 포함되어 있습니다.

## POST 요청 보내기 (post-request.html)

```javascript
const postForm = document.getElementById('postForm');
const resultDiv = document.getElementById('result');

postForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // 결과 표시 영역 초기화
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = '<div class="loading">요청 처리 중...</div>';
  resultDiv.className = 'result';
  
  // 폼 데이터 수집
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const userId = document.getElementById('userId').value;
  
  // 요청 데이터 구성
  const postData = {
    title,
    body,
    userId: Number(userId)
  };
  
  try {
    // fetch API를 사용하여 POST 요청 보내기
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    // 서버 응답 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    
    // JSON 응답 가져오기
    const data = await response.json();
    
    // 성공 결과 표시
    resultDiv.className = 'result success';
    resultDiv.innerHTML = `
      <h3>게시물이 성공적으로 생성되었습니다!</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    
    // 폼 초기화 (선택적)
    postForm.reset();
    
  } catch (error) {
    // 오류 처리
    resultDiv.className = 'result error';
    resultDiv.innerHTML = `
      <h3>오류 발생</h3>
      <p>${error.message}</p>
    `;
  }
});
```

## API 데이터 리스트와 필터링 (api-list-filter.html)

```javascript
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const loadButton = document.getElementById('loadButton');
const userList = document.getElementById('userList');
const errorDiv = document.getElementById('error');

// 사용자 데이터 저장 변수
let users = [];
let filteredUsers = [];

// 사용자 데이터 불러오기
async function fetchUsers() {
  // 로딩 상태 표시
  userList.innerHTML = '<div class="loading">사용자 데이터를 불러오는 중...</div>';
  errorDiv.style.display = 'none';
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    
    // 사용자 데이터 가져오기
    users = await response.json();
    filteredUsers = [...users];
    
    // 기본 정렬 적용
    applySorting();
    
    // 화면에 표시
    renderUsers();
    
  } catch (error) {
    // 오류 처리 
    errorDiv.style.display = 'block';
    errorDiv.textContent = `사용자 데이터를 불러오는 중 오류 발생: ${error.message}`;
    userList.innerHTML = '';
  }
}

// 사용자 리스트 렌더링 함수
function renderUsers() {
  userList.innerHTML = '';
  
  if (filteredUsers.length === 0) {
    userList.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
    return;
  }
  
  filteredUsers.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    
    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <div class="email">${user.email}</div>
      <div class="company">${user.company.name}</div>
    `;
    
    userList.appendChild(userCard);
  });
}

// 필터링 함수
function applyFilter() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm)
  );
  
  // 정렬 적용
  applySorting();
  
  // 화면 업데이트
  renderUsers();
}

// 정렬 함수
function applySorting() {
  const sortBy = sortSelect.value;
  
  filteredUsers.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'company') {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });
}

// 이벤트 리스너 등록
loadButton.addEventListener('click', fetchUsers);
searchInput.addEventListener('input', applyFilter);
sortSelect.addEventListener('change', () => {
  applySorting();
  renderUsers();
});

// 초기 데이터 로드 (선택적)
// fetchUsers();
```

## API 에러 핸들링 (error-handling.html)

```javascript
const successBtn = document.getElementById('successBtn');
const errorBtn = document.getElementById('errorBtn');
const timeoutBtn = document.getElementById('timeoutBtn');
const resultDiv = document.getElementById('result');

// 재시도 횟수 추적
let retryCount = 0;
const MAX_RETRIES = 3;

// 타임아웃 옵션이 있는 fetch 함수
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  // AbortController를 사용하여 타임아웃 구현
  const controller = new AbortController();
  const { signal } = controller;
  
  // 타이머 설정
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('요청이 시간 초과되었습니다.');
    }
    throw error;
  }
}

// API 요청 함수
async function makeRequest(url, timeout = 5000) {
  // 결과 표시 영역 초기화
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = '<div class="loading">요청 처리 중...</div>';
  resultDiv.className = 'result';
  
  try {
    // fetch 요청 보내기 (with timeout)
    const response = await fetchWithTimeout(url, {}, timeout);
    
    // 서버 응답 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    
    // JSON 응답 가져오기 
    const data = await response.json();
    
    // 성공 결과 표시
    resultDiv.className = 'result success';
    resultDiv.innerHTML = `
      <h3>요청이 성공했습니다!</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    
    // 재시도 횟수 초기화
    retryCount = 0;
    
  } catch (error) {
    // 오류 유형에 따라 다른 메시지 표시
    let errorMessage = error.message;
    let retryButton = '';
    
    // 재시도 가능 여부 확인
    if (retryCount < MAX_RETRIES) {
      retryButton = `<div class="retry-container">
        <button id="retryBtn">재시도</button>
        <span class="retry-count">${retryCount + 1}/${MAX_RETRIES} 시도</span>
      </div>`;
    }
    
    resultDiv.className = 'result error';
    resultDiv.innerHTML = `
      <h3>오류 발생</h3>
      <p>${errorMessage}</p>
      ${retryButton}
    `;
    
    // 재시도 버튼 클릭 이벤트 리스너 추가
    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', function() {
        retryCount++;
        makeRequest(url, timeout);
      });
    }
  }
}

// 버튼 클릭 이벤트 리스너
successBtn.addEventListener('click', function() {
  retryCount = 0;
  makeRequest('https://jsonplaceholder.typicode.com/posts/1');
});

errorBtn.addEventListener('click', function() {
  retryCount = 0;
  makeRequest('https://jsonplaceholder.typicode.com/non-existent');
});

timeoutBtn.addEventListener('click', function() {
  retryCount = 0;
  // 타임아웃 시간을 매우 짧게 설정하여 시뮬레이션
  makeRequest('https://jsonplaceholder.typicode.com/posts/1', 10);
});
```

## 면접 시 주의사항

- fetch API와 배경, 그리고 XMLHttpRequest와의 차이점을 설명할 수 있어야 합니다.
- Promise와 async/await의 개념과 차이점을 설명할 수 있어야 합니다.
- HTTP 메서드(GET, POST, PUT, DELETE 등)의 차이와 사용 사례를 알고 있으면 좋습니다.
- 네트워크 오류 처리 방법과 아래와 같은 상황에 대한 대처 방법을 설명하세요:
  - 서버 오류 (4xx, 5xx 상태 코드)
  - 네트워크 연결 문제
  - 타임아웃
  - 재시도 전략
- CORS(교차 출처 리소스 공유)에 대한 이해를 보여주세요.
