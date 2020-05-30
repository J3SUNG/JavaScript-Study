var body = document.body;
var result = document.createElement("div");
var table = document.createElement("table");
var arrLine = [];
var arrCell = [];
var clickLine;
var clickCell;
var count = 0;
var turn = "X";
var end = false;

function init() {
  end = false;
  count = 0;

  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 3; ++j) {
      arrCell[i][j].textContent = "";
    }
  }
  result.textContent = `${turn}의 차례!`;
}

function funcCalc() {
  if (
    arrCell[clickLine][0].textContent === turn &&
    arrCell[clickLine][1].textContent === turn &&
    arrCell[clickLine][2].textContent === turn
  ) {
    end = true;
  } else if (
    arrCell[0][clickCell].textContent === turn &&
    arrCell[1][clickCell].textContent === turn &&
    arrCell[2][clickCell].textContent === turn
  ) {
    end = true;
  } else if (clickCell === clickLine || Math.abs(clickCell - clickLine) === 2) {
    if (
      arrCell[0][0].textContent === turn &&
      arrCell[1][1].textContent === turn &&
      arrCell[2][2].textContent === turn
    ) {
      end = true;
    } else if (
      arrCell[0][2].textContent === turn &&
      arrCell[1][1].textContent === turn &&
      arrCell[2][0].textContent === turn
    ) {
      end = true;
    }
  }

  if (end === true) {
    result.textContent = `${turn} 승리! 계속하시려면 아무곳이나 누르세요.`;
    return 0;
  }
  return -1;
}

var funcCallback = function (event) {
  clickLine = arrLine.indexOf(event.target.parentNode);
  clickCell = arrCell[clickLine].indexOf(event.target);

  if (end === true) {
    init();
    return;
  }

  if (arrCell[clickLine][clickCell].textContent !== "") {
  } else {
    ++count;
    arrCell[clickLine][clickCell].textContent = turn;
    if (funcCalc() === 0) {
      return;
    } else if (count === 9) {
      result.textContent = `무승부!  계속하시려면 아무곳이나 누르세요.`;
      end = true;
      return;
    }
    if (turn == "X") {
      turn = "O";
    } else {
      turn = "X";
    }
    result.textContent = `${turn}의 차례!`;
  }
};

for (i = 0; i < 3; ++i) {
  var line = document.createElement("tr");
  arrLine.push(line);
  arrCell.push([]);
  for (var j = 0; j < 3; ++j) {
    var cell = document.createElement("td");
    cell.addEventListener("click", funcCallback);
    arrCell[i].push(cell);
    line.appendChild(cell);
  }
  table.appendChild(line);
}
body.appendChild(table);
body.append(result);
result.textContent = `${turn}의 차례!`;
