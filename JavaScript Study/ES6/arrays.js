// Array.of 배열을 생성하는 메소드
const friends = Array.of("John", "Peter", "Tom");
console.log(friends);

// Array.from 유사배열을 배열로 변환하는 메소드
const buttons = document.querySelectorAll("button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    console.log("clicked");
  });
});

// Array.find 조건에 맞는 요소를 찾는 메소드
// 조건에 맞는 요소가 없으면 undefined를 반환
// 조건에 맞는 요소가 여러 개라면 첫 번째 요소를 반환
const users = [
  { name: "John", age: 20 },
  { name: "Peter", age: 30 },
  { name: "Tom", age: 25 },
];
const user = users.find((user) => user.age === 30);

// Array.findIndex 조건에 맞는 요소의 인덱스를 찾는 메소드
// 조건에 맞는 요소가 없으면 -1을 반환
const userIndex = users.findIndex((user) => user.age === 30);

// Array.fill 배열을 특정 값으로 채우는 메소드
const arr = ["jetty123", "user882", "cola220", "duri313"];
arr.fill("*".repeat(5));

console.log(arr);

// Array.includes 배열에 특정 요소가 포함되어 있는지 확인하는 메소드
const isUser = arr.includes("user882");
console.log(isUser);

// Array.flat 배열을 평탄화하는 메소드
// 인수로 깊이를 전달할 수 있다.
const arr1 = [1, 2, [3, 4]];
const arr2 = arr1.flat();
const arr3 = [[1, 2, [3, 4]], 5];

console.log(arr2); // [1, 2, 3, 4]
console.log(arr3.flat(2)); // [1, 2, 3, 4, 5]

// Array.sort 배열을 정렬하는 메소드
// 기본적으로는 문자열로 변환하여 정렬한다.
const names = ["Tom", "Peter", "John"];
names.sort();

console.log(names); // ["John", "Peter", "Tom"]

names.sort((a, b) => {
  return a.length - b.length;
});

console.log(names); // ["Tom", "John", "Peter"]

// 숫자를 정렬하려면 비교 함수를 전달해야 한다.
const numbers = [3, 2, 1, 5, 4];
numbers.sort((a, b) => a - b);

console.log(numbers); // [1, 2, 3, 4, 5]
