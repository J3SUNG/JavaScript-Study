// Node에서 실행되는 파일은 모듈로 감싸져 있기 때문에 모듈 내부의 this는 빈 객체를 가리킨다.
// 최상위 스코프의 this는 global object를 가리킨다.
console.log(this); // {}

// Node에서의 this는 global object를 가리킨다.
function simpleFunc() {
  console.log(this); // global object
}
