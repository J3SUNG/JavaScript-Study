// // Array.of 배열을 생성하는 메소드
// const friends = Array.of("John", "Peter", "Tom");
// console.log(friends);

// // Array.from 유사배열을 배열로 변환하는 메소드
// const buttons = document.querySelectorAll("button");
// Array.from(buttons).forEach((button) => {
//   button.addEventListener("click", () => {
//     console.log("clicked");
//   });
// });

// // Array.find 조건에 맞는 요소를 찾는 메소드
// // 조건에 맞는 요소가 없으면 undefined를 반환
// // 조건에 맞는 요소가 여러 개라면 첫 번째 요소를 반환
// const users = [
//   { name: "John", age: 20 },
//   { name: "Peter", age: 30 },
//   { name: "Tom", age: 25 },
// ];
// const user = users.find((user) => user.age === 30);

// // Array.findIndex 조건에 맞는 요소의 인덱스를 찾는 메소드
// // 조건에 맞는 요소가 없으면 -1을 반환
// const userIndex = users.findIndex((user) => user.age === 30);

// Array.fill 배열을 특정 값으로 채우는 메소드
const arr = ["jetty123", "user882", "cola220", "duri313"];
arr.fill("*".repeat(5));

console.log(arr);

// Array.includes 배열에 특정 요소가 포함되어 있는지 확인하는 메소드
const isUser = arr.includes("user882");
console.log(isUser);
