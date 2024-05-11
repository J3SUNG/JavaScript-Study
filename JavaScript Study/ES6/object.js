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

// Object.assign(target, ...sources) 객체를 병합한다.
// 얕은 복사를 한다.
// 중첩 객체는 참조값을 복사한다.

const user = {
  name: "jetty",
  age: 3,
};

const info = {
  country: "Korea",
};

const info2 = {
  city: "Seoul",
};

const userWithInfo = Object.assign(user, info, info2);

console.log(userWithInfo); // {name: "jetty", age: 3, country: "Korea", city: "Seoul"}

// Object.hasOwnProperty(key) 객체가 특정 프로퍼티를 가지고 있는지 확인한다.
// Object.hasOwn(obj, key) 객체가 특정 프로퍼티를 가지고 있는지 확인한다.
// key in obj 객체가 특정 프로퍼티를 가지고 있는지 확인한다.
const obj = {
  name: "cola",
};

console.log(obj.hasOwnProperty("name"));
console.log(Object.hasOwn(obj, "name"));
console.log("name" in obj);
