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

for (var i = 0; i < lotto.length; ++i) {
  (function closer(j) {
    setTimeout(function () {
      color(lotto[j], result);
    }, (j + 1) * 1000);
  })(i);
}

setTimeout(function funcCallback() {
  var bonusBall = document.querySelector(".bonus");
  color(bonus, bonusBall);
}, 7000);

console.log(lotto);
