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

// ||= 연산자 (logical or assignment operator)
// 왼쪽 피연산자가 falsy일 때만 우측의 값을 할당한다.
let dog = "jetty";
// old way
if (!dog) {
  dog = "anonymous";
}

dog ||= "anonymous";

console.log(dog); // jetty

// &&= 연산자 (logical and assignment operator)
// 왼쪽 피연산자가 truthy일 때만 우측의 값을 할당한다.
// truthy 값: true, {}, [], 42, "0", "false", new Date(), -42, 12n, 3.14, -3.14, Infinity, -Infinity
let cat = "meow";
// old way
if (cat) {
  cat = "not anonymous";
}

cat &&= "not anonymous";

console.log(cat); // not anonymous

// ??= 연산자 (logical nullish assignment operator)
// 왼쪽 피연산자가 null 또는 undefined일 때만 우측의 값을 할당한다.
let bird = null;
// old way
if (bird === null || bird === undefined) {
  bird = "unknown";
}

bird ??= "unknown";

console.log(bird); // unknown
