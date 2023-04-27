console.log("Hello, JS!");

console.log("run extension");
console.log(`ctrl + art + n`);

const str = new String("abcde");
const num = new Number(123.4567);
const bool = new Boolean(true);

console.log(str.valueOf());
console.log(num.valueOf());
console.log(bool.valueOf());

const arrLike = {
  0: "🍎",
  1: "🍌",
  2: "🥝",
  3: "🍒",
  4: "🫐",
  length: 5,
};

// 일반 for문으로 순회 가능
for (let i = 0; i < arrLike.length; i++) {
  console.log(arrLike[i]);
}
