const a = 5;
let b = 4;

console.log(a + b);
console.log(a * b);
console.log(a / b);

const type1 = true;
const type2 = false;
const type3 = null; // 비어있다
const type4 = undefined; // 정의되지 않았다

console.log(type1);
console.log(type2);
console.log(type3);
console.log(type4);

const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const nonsense = [1, true, null, undefined, "Hey", false];

console.log(daysOfWeek, nonsense);
console.log(daysOfWeek[3]);

nonsense.push("New");

console.log(nonsense);
