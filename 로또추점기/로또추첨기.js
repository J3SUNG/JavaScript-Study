var number = Array(45)
  .fill()
  .map(function (element, index) {
    return index + 1;
  });

var shuffle = [];
while (number.length > 0) {
  var changeArray = number.splice(
    Math.floor(Math.random() * number.length),
    1
  )[0];
  shuffle.push(changeArray);
}

var bonus = shuffle[shuffle.length - 1];
var lotto = shuffle.slice(0, 6);
console.log(
  lotto.sort(function (p, c) {
    return p - c;
  }),
  bonus
);

var result = document.querySelector("#result");

function color(num, result) {
  var ball = document.createElement("div");
  ball.textContent = num;
  ball.style.display = "inline-block";
  ball.style.border = "1px solid black";
  ball.style.borderRadius = "10px";
  ball.style.width = "20px";
  ball.style.height = "20px";
  ball.style.textAlign = "center";
  ball.style.marginRight = "10px";
  ball.style.borderBottom = "10px";
  ball.style.fontSize = "12px";
  ball.className = "ballId" + num;
  var backgroundColor;
  if (num <= 10) {
    backgroundColor = "red";
  } else if (num <= 20) {
    backgroundColor = "orange";
  } else if (num <= 30) {
    backgroundColor = "yellow";
  } else if (num <= 40) {
    backgroundColor = "blue";
  } else {
    backgroundColor = "green";
  }
  ball.style.background = backgroundColor;
  result.appendChild(ball);
}
setTimeout(function funcCallback() {
  color(lotto[0], result);
}, 1000);
setTimeout(function funcCallback() {
  color(lotto[1], result);
}, 2000);
setTimeout(function funcCallback() {
  color(lotto[2], result);
}, 3000);
setTimeout(function funcCallback() {
  color(lotto[3], result);
}, 4000);
setTimeout(function funcCallback() {
  color(lotto[4], result);
}, 5000);
setTimeout(function funcCallback() {
  color(lotto[5], result);
}, 6000);
setTimeout(function funcCallback() {
  var bonusBall = document.querySelector(".bonus")[0];
  color(bonus, bonusBall);
}, 7000);

console.log(lotto);
