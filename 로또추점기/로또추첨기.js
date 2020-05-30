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

console.log(shuffle);
