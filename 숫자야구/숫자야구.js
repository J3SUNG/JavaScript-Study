var body = document.body;
var num = [];
var numArr = [];
var value;
var count;
var result = document.createElement("h1");
var form = document.createElement("form");
var input = document.createElement("input");
var button = document.createElement("button");

function init() {
  num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numArr = [];
}

function shuffle() {
  for (var i = 0; i < 4; ++i) {
    var get = num.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    numArr.push(get);
  }
  count = 5;
  value = numArr.join("");

  console.log(numArr);
}

init();
shuffle();

input.type = "number";
button.textContent = "입력";

body.append(result);
document.body.append(form);
form.append(input);
form.append(button);

form.addEventListener("submit", function funcCallback() {
  --count;
  event.preventDefault();

  if (input.value === value) {
    init();
    shuffle();
    input.value = "";
    input.focus();
    result.textContent = "Homerun";
  } else {
    var strike = 0;
    var ball = 0;
    if (count === 0) {
      result.textContent = `5번 시도 했습니다. 정답은 ${value}입니다.`;
      init();
      shuffle();
      input.value = "";
      input.focus();
      return;
    }
    for (var i = 0; i <= 3; ++i) {
      if (numArr[i] === Number(input.value[i])) {
        ++strike;
      } else if (numArr.indexOf(Number(input.value[i])) > -1) {
        ++ball;
      }
    }
    input.value = "";
    input.focus();
    result.textContent = `strike: ${strike}, ball: ${ball}`;
  }
});
