# 정렬 알고리즘 시각화 문제 솔루션

이 파일에는 정렬 알고리즘 시각화 문제의 솔루션이 포함되어 있습니다.

## 버블 정렬 시각화 (bubble-sort.html)

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

## 다른 정렬 알고리즘 구현 (선택 정렬)

```javascript
// 선택 정렬 알고리즘
function selectionSort() {
  if (isSorting) return;
  isSorting = true;
  
  let i = 0;
  let j = 0;
  let minIndex = 0;
  const n = array.length;
  
  sortInterval = setInterval(() => {
    if (i >= n - 1) {
      // 정렬 완료
      clearInterval(sortInterval);
      renderBars();
      isSorting = false;
      return;
    }
    
    // 최소값 찾기 과정
    if (j === 0) {
      // 새로운 패스의 시작
      minIndex = i;
      j = i + 1;
    }
    
    // 현재 비교 중인 요소 표시
    renderBars([minIndex, j]);
    
    // 최소값 찾기
    if (array[j] < array[minIndex]) {
      minIndex = j;
    }
    
    j++;
    
    // 현재 패스에서 모든 요소 비교 완료
    if (j >= n) {
      // 최소값을 현재 위치로 스왑
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
      
      // 다음 패스로 이동
      i++;
      j = 0;
      
      // 결과 렌더링
      renderBars();
    }
  }, 100);
}
```

## 모든 정렬 알고리즘을 지원하는 고급 시각화

```javascript
// 정렬 알고리즘 선택 요소
const algorithmSelect = document.getElementById('algorithmSelect');
const speedRange = document.getElementById('speedRange');

// 정렬 속도 (밀리초)
let sortSpeed = 100;

// 선택된 정렬 알고리즘 실행
function startSorting() {
  if (isSorting) return;
  
  const algorithm = algorithmSelect.value;
  
  // 현재 속도 가져오기
  sortSpeed = 500 - speedRange.value;
  
  // 선택된 알고리즘에 따라 다른 정렬 함수 실행
  switch (algorithm) {
    case 'bubble':
      bubbleSort();
      break;
    case 'selection':
      selectionSort();
      break;
    case 'insertion':
      insertionSort();
      break;
    case 'quick':
      // 퀵 정렬은 재귀적이므로 다른 방식으로 구현해야 함
      quickSortVisual();
      break;
    case 'merge':
      // 병합 정렬도 재귀적이므로 다른 방식으로 구현해야 함
      mergeSortVisual();
      break;
    default:
      bubbleSort();
  }
}

// 삽입 정렬 알고리즘
function insertionSort() {
  if (isSorting) return;
  isSorting = true;
  
  let i = 1;
  let j = i;
  const n = array.length;
  
  sortInterval = setInterval(() => {
    if (i >= n) {
      // 정렬 완료
      clearInterval(sortInterval);
      renderBars();
      isSorting = false;
      return;
    }
    
    // 처음 시작할 때 현재 요소를 저장
    if (j === i) {
      currentElement = array[j];
    }
    
    // 비교 요소 시각화
    renderBars([j - 1, j]);
    
    // 이전 요소가 현재 요소보다 크면 이동
    if (j > 0 && array[j - 1] > currentElement) {
      array[j] = array[j - 1];
      j--;
    } else {
      // 적절한 위치를 찾았으면 저장하고 다음 요소로 이동
      array[j] = currentElement;
      i++;
      j = i;
    }
    
    renderBars([j - 1, j]);
  }, sortSpeed);
}

// 정렬 알고리즘별 시간 복잡도 정보 표시
function showAlgorithmInfo() {
  const algorithm = algorithmSelect.value;
  const infoElement = document.getElementById('algorithmInfo');
  
  const complexityInfo = {
    bubble: {
      name: '버블 정렬',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      desc: '인접한 두 요소를 비교하여 정렬하는 알고리즘입니다. 구현이 간단하지만 대규모 데이터에는 비효율적입니다.'
    },
    selection: {
      name: '선택 정렬',
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      desc: '현재 위치에 들어갈 값을 찾기 위해 배열 전체를 탐색하는 알고리즘입니다. 교환 횟수가 적다는 장점이 있습니다.'
    },
    insertion: {
      name: '삽입 정렬',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      desc: '현재 요소를 이미 정렬된 부분에 삽입하는 알고리즘입니다. 거의 정렬된 배열에서 효율적입니다.'
    },
    quick: {
      name: '퀵 정렬',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      desc: '분할 정복 기법을 사용하는 알고리즘으로, 피벗을 기준으로 배열을 나누어 정렬합니다. 평균적으로 가장 빠른 정렬 알고리즘 중 하나입니다.'
    },
    merge: {
      name: '병합 정렬',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      desc: '분할 정복 기법을 사용하는 알고리즘으로, 배열을 나누고 병합하면서 정렬합니다. 안정적인 성능을 보장하지만 추가 메모리가 필요합니다.'
    }
  };
  
  const info = complexityInfo[algorithm];
  
  infoElement.innerHTML = `
    <h3>${info.name}</h3>
    <p><strong>시간 복잡도:</strong></p>
    <ul>
      <li>최선의 경우: ${info.best}</li>
      <li>평균: ${info.average}</li>
      <li>최악의 경우: ${info.worst}</li>
    </ul>
    <p><strong>공간 복잡도:</strong> ${info.space}</p>
    <p>${info.desc}</p>
  `;
}

// 알고리즘 선택 변경 시 정보 업데이트
algorithmSelect.addEventListener('change', showAlgorithmInfo);

// 초기 알고리즘 정보 표시
showAlgorithmInfo();
```

## 면접 시 주의사항

- 다양한 정렬 알고리즘의 시간 복잡도와 공간 복잡도를 비교하고 설명할 수 있어야 합니다.
- 각 정렬 알고리즘의 장단점과 적합한 사용 사례를 알고 있어야 합니다.
- 자바스크립트의 내장 정렬 메서드인 Array.prototype.sort()의 구현과 시간 복잡도를 알고 있으면 좋습니다.
- 비동기 처리와 타이밍 함수(setTimeout, setInterval)의 작동 방식을 이해하고 있어야 합니다.
- 시각화의 교육적 가치와 알고리즘 이해에 미치는 영향을 설명할 수 있으면 좋습니다.
- 더 복잡한 정렬 알고리즘(퀵 정렬, 병합 정렬 등)을 시각화할 때의 어려움과 해결 방법을 알고 있으면 매우 좋습니다.
