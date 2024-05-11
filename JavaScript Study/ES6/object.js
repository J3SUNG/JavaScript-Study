const person = {
  name: "jetty",
  age: 3,
};

// Object.values(obj) 객체의 프로퍼티 값들로 이루어진 배열을 반환한다.
console.log(Object.values(person)); // ["jetty", 3]

// Object.entries(obj) 객체의 프로퍼티 키-값 쌍으로 이루어진 배열을 반환한다.
console.log(Object.entries(person)); // [["name", "jetty"], ["age", 3]]

// Object.fromEntries(arr) 배열의 요소로 이루어진 배열을 객체로 반환한다.
const arr = [
  ["name", "jetty"],
  ["age", 3],
];
console.log(Object.fromEntries(arr)); // {name: "jetty", age: 3}
