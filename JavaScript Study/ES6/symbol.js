// Symbol은 유일한 값을 만들어낸다.
// 객체의 프로퍼티 키로 사용될 수 있다.
// 객체의 프로퍼티 키로 사용될 때 다른 프로퍼티 키와 충돌할 일이 없다.
const obj = {
  [Symbol("user")]: {
    age: 3,
  },
  [Symbol("user")]: {
    age: 2,
  },
};

console.log(obj); // {Symbol(user): {…}, Symbol(user): {…}}
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(user), Symbol(user)]

// 프라이버시 보호
for (let key in obj) {
  console.log(key); // 아무것도 출력되지 않음
}

Object.keys(obj); // []

Object.getOwnPropertyNames(obj); // []

// Symbol.iterator

const arr = [1, 2, 3, 4];

const it = arr[Symbol.iterator]();

console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: 3, done: false}
console.log(it.next()); // {value: 4, done: false}
console.log(it.next()); // {value: undefined, done: true}
