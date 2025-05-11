# JavaScript 알고리즘 문제 솔루션

이 파일에는 JavaScript 알고리즘 문제의 솔루션이 포함되어 있습니다.

## 배열 뒤집기 (array-reverse.js)

```javascript
function reverseArray(arr) {
  // 방법 1: 새 배열 생성 후 역순으로 채우기
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
  
  // 방법 2: 배열의 앞뒤 요소를 교환하기
  // const result = [...arr]; // 원본 배열 복사
  // for (let i = 0; i < Math.floor(arr.length / 2); i++) {
  //   const temp = result[i];
  //   result[i] = result[arr.length - 1 - i];
  //   result[arr.length - 1 - i] = temp;
  // }
  // return result;
  
  // 방법 3: map 메소드 사용
  // return arr.map((_, i) => arr[arr.length - 1 - i]);
}
```

## 회문 확인 (palindrome.js)

```javascript
function isPalindrome(str) {
  // 알파벳과 숫자만 남기고 소문자로 변환
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // 방법 1: 문자열의 앞뒤를 비교
  for (let i = 0; i < Math.floor(cleanStr.length / 2); i++) {
    if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
  
  // 방법 2: 문자열을 뒤집어서 비교
  // return cleanStr === cleanStr.split('').reverse().join('');
}
```

## 피보나치 수열 (fibonacci.js)

```javascript
function fibonacci(n) {
  // 방법 1: 반복문 사용 (시간 복잡도: O(n), 공간 복잡도: O(1))
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
  
  // 방법 2: 재귀 사용 (시간 복잡도: O(2^n), 공간 복잡도: O(n))
  // - 주의: 큰 수에서는 성능 이슈가 있음
  // if (n <= 1) return n;
  // return fibonacci(n - 1) + fibonacci(n - 2);
  
  // 방법 3: 메모이제이션을 사용한 재귀 (시간 복잡도: O(n), 공간 복잡도: O(n))
  // const memo = {};
  // 
  // function fibMemo(x) {
  //   if (x <= 1) return x;
  //   if (memo[x]) return memo[x];
  //   
  //   memo[x] = fibMemo(x - 1) + fibMemo(x - 2);
  //   return memo[x];
  // }
  // 
  // return fibMemo(n);
}
```

## 면접 시 주의사항

- 시간 복잡도와 공간 복잡도를 고려하여 최적의 솔루션을 선택하세요.
- 에지 케이스에 대한 처리를 설명하세요 (빈 배열, 빈 문자열, 음수 입력 등).
- 가독성과 유지보수성이 좋은 코드를 작성하세요.
- 가능하다면 여러 가지 해결 방법을 알고 있다는 것을 보여주세요.
