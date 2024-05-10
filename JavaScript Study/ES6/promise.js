// promise 객체 생성
const request = new Promise((resolve, reject) => {
  // setTimeout(resolve, 3000, "Good");
  setTimeout(reject, 3000, "Bad");
});

console.log(request);

// 3초 후에 resolve 함수 실행, Good 출력
// setInterval(console.log, 1000, request);

// 3초 후에 resolve 함수 실행, Good 출력
// 3초 후에 reject 함수 실행, Bad 출력
request.then((message) => console.log(message)).catch((error) => console.log(error));

// promise 객체 생성
const fetchNumber = new Promise((resolve, reject) => {
  resolve(2);
});

const timesTwo = (number) => number * 2;

// 여러 개의 then 메서드를 연결하여 실행
fetchNumber
  .then(timesTwo)
  .then(timesTwo)
  .then(timesTwo)
  .then(timesTwo)
  .then((lastNumber) => console.log(lastNumber));

const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "First");
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "Second");
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "Third");
});

// promise.all 메서드로 여러 promise 객체를 동시에 실행
const parentPromise = Promise.all([p1, p2, p3]);

// promise.all 메서드로 여러 promise 객체를 동시에 실행한 결과를 출력
// 모두 resolve되어야 출력
// 하나라도 reject되면 catch로 이동
parentPromise.then((values) => console.log(values)).catch((error) => console.log(error));

// promise.race 메서드로 여러 promise 객체 중 가장 빠른 것을 출력
// 하나라도 resolve되면 출력
// 모두 reject되면 catch로 이동
const parentPromise2 = Promise.race([p1, p2, p3]);

parentPromise2.then((value) => console.log(value)).catch((error) => console.log(error));

// promise finally 메서드로 성공, 실패 여부와 상관없이 마지막에 실행
const newPromise = new Promise((resolve, reject) => {
  resolve(1);
})
  .then((result) => console.log(result))
  .catch((error) => console.log(error))
  .finally(() => console.log("Done"));

fetch("https://google.com")
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

// fetch 메서드로 데이터를 가져옴
// HTTP 응답을 json으로 변환, 이 과정은 promise 객체를 반환
// then 메서드로 json 데이터를 출력
fetch("https://yts.am/api/v2/list_movies.json")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));
