// 변수
var name = 10;
var name = 20;

// 변수
let age = 10;
// let age = 20;
// SyntaxError: Identifier 'age' has already been declared

// 상수
const id = 10;
// const id = 20;
// SyntaxError: Identifier 'id' has already been declared

// 호이스팅: 변수 선언을 끌어올려서 처리하는 현상
console.log(grade); // undefined
var grade = 20;
console.log(grade); // 20

// Temporal Dead Zone: 변수가 선언되기 전에 접근하면 에러가 발생하는 현상
// TDZ 구간에 영향을 받는 구문 (let, const, class)
// TDZ 구간에 영향을 받지 않는 구문 (var, function, import)
// console.log(score); // ReferenceError: Cannot access 'score' before initialization
let score = 20;
console.log(score); // 20

// 블록 스코프 (let, const)
{
  let hobby = "coding";
}
// console.log(hobby); // ReferenceError: hobby is not defined

// 함수 스코프 (var)
{
  var addr = "Seoul";
}
console.log(addr); // Seoul

function test() {
  var city = "Busan";
}
// console.log(city); // ReferenceError: city is not defined
