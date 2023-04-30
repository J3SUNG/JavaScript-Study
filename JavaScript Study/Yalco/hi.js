const orgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const arr1 = [...orgArr.slice(0, 3), ...orgArr.slice(6, 9)];
console.log(arr1);

const arr2 = orgArr.filter((_, i) => !(i >= 3 && i < 6));
console.log(arr2);

console.log(orgArr);
