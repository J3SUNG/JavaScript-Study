// Generators는 함수의 실행을 중간에 멈추고 재개할 수 있는 함수이다.
// 함수를 호출하면 제너레이터 객체가 반환되며, 제너레이터 객체의 next 메소드를 호출하면 함수의 실행이 시작되고, yield 키워드를 만날 때까지 실행된다.
// 상태보존 : 실행을 중간에 멈추고 재개할 수 있기 때문에 상태를 보존할 수 있다.
// 메모리 효율성 : 필요할 때만 값을 계산하고 반환할 수 있기 때문에 메모리를 효율적으로 사용할 수 있다. 모든 결과를 메모리에 저장하지 않아도 된다.
// 비동기 프로그래밍 간소화 : 비동기 코드를 동기적으로 작성할 수 있다.
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();

console.log(gen.next()); // {value: 1, done: false}
console.log(gen.next()); // {value: 2, done: false}
console.log(gen.next()); // {value: 3, done: false}
console.log(gen.next()); // {value: undefined, done: true}

const friends = ["jetty", "cola", "duri"];

function* friendGenerator() {
  for (const friend of friends) {
    yield friend;
  }
}

const friendGen = friendGenerator();

console.log(friendGen.next()); // {value: "jetty", done: false}
console.log(friendGen.next()); // {value: "cola", done: false}
console.log(friendGen.next()); // {value: "duri", done: false}
console.log(friendGen.next()); // {value: undefined, done: true}
