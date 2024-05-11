// SET 객체는 자료형에 관계없이 원시 값과 객체 참조 모두 유일한 값을 저장할 수 있다.
// 중복을 허용하지 않는 데이터 집합
const set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);

console.log(set); // Set(5) {1, 2, 3, 4, 5}
set.has(1); // true
set.has(6); // false

set.delete(1);
console.log(set); // Set(4) {2, 3, 4, 5}

set.add(6);
console.log(set); // Set(5) {2, 3, 4, 5, 6}

set.size; // 5

set.keys(); // SetIterator {1, 2, 3, 4, 5}

set.forEach((value) => {
  console.log(value); // 2 3 4 5 6
});

set.clear();
console.log(set); // Set(0) {}

// WeakSet은 객체만 포함할 수 있다.
// 객체 참조를 약하게 유지한다.
// garbage collection의 대상이 된다. (메모리 누수 방지)
// WeakSet 객체에 추가된 객체가 다른 곳에서 참조되지 않으면 garbage collection의 대상이 된다.
const weekSet = new WeakSet();

const jetty = { name: "jetty" };
weekSet.add(jetty);

console.log(weekSet.has(jetty)); // true

weekSet.delete(jetty);
console.log(weekSet.has(jetty)); // false

// MAP 객체는 키-값 쌍을 저장한다.
// 중복을 허용하지 않는 데이터 집합
const map = new Map();

map.set("age", 18);
map.set("name", "jetty");

console.log(map); // Map(2) {"age" => 18, "name" => "jetty"}

map.entries(); // MapIterator {"age" => 18, "name" => "jetty"}

map.keys(); // MapIterator {"age", "name"}
map.values(); // MapIterator {18, "jetty"}

map.has("age"); // true
map.get("name"); // "jetty"

map.Set("nickname", "ZET");
map.delete("age");

console.log(map); // Map(2) {"name" => "jetty", "nickname" => "ZET"}

map.clear();

// WeakMap은 객체만 포함할 수 있다.
// 객체 참조를 약하게 유지한다.
// garbage collection의 대상이 된다. (메모리 누수 방지)
// WeakMap 객체에 추가된 객체가 다른 곳에서 참조되지 않으면 garbage collection의 대상이 된다.
const weekMap = new WeakMap();

const cola = { name: "cola" };

weekMap.set(cola, "cola");

console.log(weekMap.has(cola)); // true
console.log(weekMap.get(cola)); // "cola"
