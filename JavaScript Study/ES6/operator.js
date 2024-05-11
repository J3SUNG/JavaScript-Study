// ?? Operator (nullish coalescing operator)
// ES11(2020)에서 추가된 연산자로, null 또는 undefined일 때만 우측의 값을 반환한다.
let nickname = undefined;

console.log(nickname ?? "unknown"); // unknown

nickname = "jetty";

console.log(nickname ?? "unknown"); // jetty

// ?? 연산자는 || 연산자와 유사하지만, || 연산자는 왼쪽 피연산자가 falsy 값일 때 우측의 값을 반환한다.
// falsy 값: false, 0, "", null, undefined, NaN
console.log(null ?? "default"); // default
console.log(undefined ?? "default"); // default
console.log("" ?? "default"); // ""
console.log(0 ?? "default"); // 0
console.log(false ?? "default"); // false
console.log(NaN ?? "default"); // NaN

console.log(null || "default"); // default
console.log(undefined || "default"); // default
console.log("" || "default"); // default
console.log(0 || "default"); // default
console.log(false || "default"); // default
console.log(NaN || "default"); // default
