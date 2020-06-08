var table = document.getElementById("table");
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
  console.log(emptyArray);
  var randomCell = emptyArray[Math.floor(Math.random() * emptyArray.length)];
  data[randomCell[0]][randomCell[1]] = 2;
  draw();
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
randomCreate();
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
    clickFlag = false;
    dragFlag = false;
  }
});
