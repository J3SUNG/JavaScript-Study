const arr = [1, 2, 3, 4];

// 일반 함수
const pow2 = arr.map(function (n) {
  return n * n;
});

// 화살표 함수
const mul2 = arr.map((n) => {
  return n * 2;
});

// 화살표 함수 축약
const mul3 = arr.map((n) => n * 3);

// this 바인딩
const button = document.querySelector("button");

// 일반 함수
// this는 button을 가리킴
button.addEventListener("click", function () {
  this.style.backgroundColor = "red";
});

const jetty = {
  age: 3,
  grow: () => {
    console.log(this.age);
  },
};
jetty.grow(); // undefined

// 화살표 함수
// this는 상위 스코프인 window를 가리킴
button.addEventListener("click", () => {
  this.style.backgroundColor = "red"; // 에러 발생
});

const cola = {
  age: 2,
  grow: function () {
    console.log(this.age);
  },
};
cola.grow(); // 2
