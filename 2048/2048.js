var table = document.getElementById("table");
var score = document.getElementById("score");
var data = [];
var setDirection = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3,
};

function init() {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function (column) {
    var columnData = [];
    data.push(columnData);
    var tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function (row) {
      columnData.push(0);
      var td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
}

function randomCreate() {
  var emptyArray = [];
  data.forEach(function (columnData, i) {
    columnData.forEach(function (rowData, j) {
      if (!rowData) {
        emptyArray.push([i, j]);
      }
    });
  });
  if (emptyArray.length === 0) {
    alert("게임오버 " + score.textContent);
  } else {
    var randomCell = emptyArray[Math.floor(Math.random() * emptyArray.length)];
    data[randomCell[0]][randomCell[1]] = 2;
    draw();
  }
}

function draw() {
  data.forEach(function (columnData, i) {
    columnData.forEach(function (rowData, j) {
      if (rowData > 0) {
        table.children[i].children[j].textContent = rowData;
      } else {
        table.children[i].children[j].textContent = "";
      }
    });
  });
}

init();
draw();

var clickFlag = false;
var dragFlag = false;
var startLocation;
var endLocation;
window.addEventListener("mousedown", function (event) {
  clickFlag = true;
  startLocation = [event.clientX, event.clientY];
});
window.addEventListener("mousemove", function (event) {
  if (clickFlag) {
    dragFlag = true;
  }
});
window.addEventListener("mouseup", function (event) {
  if (dragFlag) {
    endLocation = [event.clientX, event.clientY];
    var direction;
    var intervalX = endLocation[0] - startLocation[0];
    var intervalY = endLocation[1] - startLocation[1];
    if (Math.abs(intervalX) - Math.abs(intervalY) > 0) {
      if (intervalX > 0) {
        direction = setDirection.right;
      } else if (intervalX < 0) {
        direction = setDirection.left;
      } else {
        direction = setDirection.none;
      }
    } else {
      if (intervalY > 0) {
        direction = setDirection.bottom;
      } else if (intervalY < 0) {
        direction = setDirection.top;
      } else {
        direction = setDirection.none;
      }
    }
    console.log(direction);
  }

  clickFlag = false;
  dragFlag = false;

  switch (direction) {
    case 0:
      var newData = [[], [], [], []];
      data.forEach(function (columnData, i) {
        columnData.forEach(function (rowData, j) {
          if (rowData) {
            if (
              newData[j][newData[j].length - 1] &&
              newData[j][newData[j].length - 1] === rowData
            ) {
              newData[j][newData[j].length - 1] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent =
                currentScore + newData[j][newData[j].length - 1];
            } else {
              newData[j].push(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (columnData, j) {
          data[j][i] = newData[i][j] || 0;
        });
      });
      break;
    case 1:
      var newData = [[], [], [], []];
      data.forEach(function (columnData, i) {
        columnData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[i][0] && newData[i][0] === rowData) {
              newData[i][0] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent = currentScore + newData[i][0];
            } else {
              newData[i].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (columnData, j) {
          data[i][3 - j] = newData[i][j] || 0;
        });
      });
      break;
    case 2:
      var newData = [[], [], [], []];
      data.forEach(function (columnData, i) {
        columnData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[j][0] && newData[j][0] === rowData) {
              newData[j][0] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent = currentScore + newData[j][0];
            } else {
              newData[j].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (columnData, j) {
          data[3 - j][i] = newData[i][j] || 0;
        });
      });
      break;
    case 3:
      var newData = [[], [], [], []];
      data.forEach(function (columnData, i) {
        columnData.forEach(function (rowData, j) {
          if (rowData) {
            if (
              newData[i][newData[i].length - 1] &&
              newData[i][newData[i].length - 1] === rowData
            ) {
              newData[i][newData[i].length - 1] *= 2;
              var currentScore = parseInt(score.textContent, 10);
              score.textContent =
                currentScore + newData[i][newData[i].length - 1];
            } else {
              newData[i].push(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (columnData, i) {
        [1, 2, 3, 4].forEach(function (rowData, j) {
          data[i][j] = newData[i][j] || 0;
        });
      });
      break;
  }
  draw();
  randomCreate();
});
