# API 호출 및 비동기 처리 문제 솔루션

이 파일에는 API 호출 및 비동기 처리 문제의 솔루션이 포함되어 있습니다.

## 간단한 Fetch API 사용 (fetch-example.html)

```javascript
const loadButton = document.getElementById('loadButton');
const status = document.getElementById('status');
const userList = document.getElementById('userList');

loadButton.addEventListener('click', fetchUsers);

// 방법 1: async/await 사용
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

// 방법 2: Promise 체이닝 사용
/*
function fetchUsers() {
  // 로딩 상태 표시
  status.textContent = '로딩 중...';
  status.className = 'loading';
  userList.innerHTML = '';
  
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      // 사용자 목록 표시
      status.textContent = `${users.length}명의 사용자를 불러왔습니다.`;
      status.className = '';
      
      users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';
        li.innerHTML = `<strong>${user.name}</strong> <br> ${user.email}`;
        userList.appendChild(li);
      });
    })
    .catch(error => {
      status.textContent = `오류 발생: ${error.message}`;
      status.className = 'error';
    });
}
*/
```

## Promise 체이닝 (promise-chaining.js)

```javascript
// 제곱 함수
function promiseSquare(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}

// 숫자에 2 더하는 함수
function promiseAddTwo(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num + 2);
    }, 1000);
  });
}

// 문자열로 변환하는 함수
function promiseToString(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String(num));
    }, 1000);
  });
}

// 방법 1: Promise 체이닝 사용
promiseSquare(3)
  .then(squared => promiseAddTwo(squared))
  .then(added => promiseToString(added))
  .then(result => {
    console.log(result);  // "11"
    console.log(typeof result);  // "string"
  });

// 방법 2: async/await 사용
async function processNumber(num) {
  const squared = await promiseSquare(num);
  console.log(`제곱: ${squared}`);
  
  const added = await promiseAddTwo(squared);
  console.log(`2 더하기: ${added}`);
  
  const result = await promiseToString(added);
  console.log(`최종 결과: ${result} (타입: ${typeof result})`);
  
  return result;
}

// 실행
// processNumber(3);
```

## 고급 Promise 활용 예제 (병렬 처리)

```javascript
function promiseSquare(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${num}의 제곱 계산 완료`);
      resolve(num * num);
    }, 1000);
  });
}

function promiseDouble(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${num}의 2배 계산 완료`);
      resolve(num * 2);
    }, 1500);
  });
}

function promiseAddFive(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${num}에 5 더하기 완료`);
      resolve(num + 5);
    }, 800);
  });
}

// 순차 실행 (약 3.3초 소요)
async function sequentialProcess(num) {
  console.time('순차 실행');
  
  const squared = await promiseSquare(num);
  const doubled = await promiseDouble(num);
  const added = await promiseAddFive(num);
  
  const result = squared + doubled + added;
  
  console.timeEnd('순차 실행');
  console.log(`결과 (순차): ${result}`);
  
  return result;
}

// 병렬 실행 (약 1.5초 소요)
async function parallelProcess(num) {
  console.time('병렬 실행');
  
  const [squared, doubled, added] = await Promise.all([
    promiseSquare(num),
    promiseDouble(num),
    promiseAddFive(num)
  ]);
  
  const result = squared + doubled + added;
  
  console.timeEnd('병렬 실행');
  console.log(`결과 (병렬): ${result}`);
  
  return result;
}

// 실행 예제
// sequentialProcess(4).then(() => parallelProcess(4));

// Promise.race 예제 (가장 빨리 완료되는 작업 처리)
async function raceExample(num) {
  console.time('경쟁 실행');
  
  const winner = await Promise.race([
    promiseSquare(num),
    promiseDouble(num),
    promiseAddFive(num)
  ]);
  
  console.timeEnd('경쟁 실행');
  console.log(`가장 빨리 완료된 결과: ${winner}`);
  
  return winner;
}

// raceExample(4);
```

## 면접 시 주의사항

- Promise와 async/await의 개념적 차이점과 각각의 장단점을 명확히 설명할 수 있어야 합니다.
- fetch API가 기본적으로 제공하지 않는 기능(타임아웃, 자동 재시도 등)을 어떻게 구현할 수 있는지 알고 있으면 좋습니다.
- Promise.all(), Promise.race(), Promise.allSettled() 등 Promise 메서드들의 차이점과 사용 사례를 알고 있으면 좋습니다.
- 비동기 코드 디버깅 방법과 오류 처리 전략에 대해 설명할 수 있어야 합니다.
- 마이크로태스크 큐와 태스크 큐의 차이점을 알고 있으면 좋습니다(Promise의 then() 콜백과 setTimeout의 콜백 실행 순서 차이).
