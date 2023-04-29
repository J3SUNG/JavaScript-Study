console.log("Hello, JS!");

console.log("run extension");
console.log(`ctrl + art + n`);

const arrLike = {
  0: "🍎",
  1: "🍌",
  2: "🥝",
  3: "🍒",
  4: "🫐",
  length: 5,
};

for (let i = 0; i < arrLike.length; i++) {
  console.log(arrLike[i]);
}

for (const item of arrLike) {
  console.log(item);
}

for (const item of Array.from(arrLike)) {
  console.log(item);
}

const arr1 = [1, 2, 3];
const arr2 = Array.from(arr1);
arr2.push(4);

console.log(arr1, arr2);
