// 순환 참조가 일어나는 경우 빈 객체로 처리된다.
const dep2 = require("./dep2");

console.log(dep2); // {}
