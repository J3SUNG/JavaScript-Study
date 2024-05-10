const arr = [1, 2, 3, 4];
const alp = ["a", "b", "c", "d"];

// spread operator 배열을 펼쳐서 전달
console.log(arr); // [1, 2, 3, 4]
console.log(...arr); // 1 2 3 4

// array
console.log(arr + alp); // 1,2,3,4a,b,c,d
console.log([arr, alp]); // [Array(4), Array(4)]
console.log([...arr, ...alp]); // [1, 2, 3, 4, "a", "b", "c", "d"]

// object
const obj1 = { key: "keys" };
const obj2 = { number: 123 };

console.log({ obj1, obj2 }); // {obj1: {…}, obj2: {…}}
console.log({ ...obj1, ...obj2 }); // {key: "keys", number: 123}
console.log({ ...obj1, number2: 456 }); // {key: "keys", number2: 456}

// rest
const rankingArgs = (first, ...rest) => {
  console.log(`first: ${first}`);
  console.log(`rest: ${rest}`);
};

infiniteArgs(71, 23, 41, 50, 61, 10); // first: 71, rest: [23, 41, 50, 61, 10]

const user = {
  name: "jetty",
  age: 20,
  password: 1234,
};

// rest 객체에서 특정 프로퍼티를 제외하고 전개
const killPassword = ({ password, ...rest }) => rest;

const cleanUser = killPassword(user);
console.log(cleanUser); // {name: "jetty", age: 20}

// rest 객체에서 특정 프로퍼티를 추가하고 전개
const setCountry = ({ country = "KR", ...rest }) => ({ country, ...rest });

console.log(setCountry(user)); // {country: "KR", name: "jetty", age: 20}

// rest 객체에서 특정 프로퍼티를 변경하고 전개
const rename = ({ name: nickname, ...rest }) => ({ nickname, ...rest });

console.log(rename(user)); // {nickname: "jetty", age: 20, password: 1234}
