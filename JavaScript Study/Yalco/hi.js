const orgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 4 ~ 6을 제외한 새 배열 만들기

// 💡 slice는 원본을 변경하지 않음
const arr1 = [...orgArr.slice(0, 3), ...orgArr.slice(6, 9)];
console.log(arr1);

// 참고: 또 다른 방법
const arr2 = orgArr.filter((_, i) => !(i >= 3 && i < 6));
console.log(arr2);

// 원본은 유지
console.log(orgArr);
